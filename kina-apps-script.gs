/**
 * Kına Gecesi RSVP Kayıt Sistemi — Google Apps Script
 * Kına sitesinden gönderilen yanıtları bağlı olduğu Google E-Tablosuna kaydeder.
 *
 * Kurulum (düğün RSVP'siyle aynı adımlar):
 * 1. sheets.google.com -> yeni boş tablo ("Kına RSVP")
 * 2. Uzantılar -> Apps Script -> bu kodu yapıştır -> kaydet
 * 3. Dağıt -> Yeni dağıtım -> Web uygulaması
 *    - Kimin adına: Ben | Kimler erişebilir: Herkes
 * 4. Verilen /exec URL'sini kina/index.html içindeki
 *    PASTE_KINA_APPS_SCRIPT_URL_HERE yerine yapıştır.
 */

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    // Bot koruması: gizli alan doluysa kaydetme
    if (data.web) {
      return jsonResponse({ ok: true });
    }

    var name = String(data.adSoyad || "").trim().substring(0, 100);
    var attend = String(data.katilim || "").trim();
    var message = String(data.mesaj || "").trim().substring(0, 500);

    if (name.length < 3 ||
        (attend !== "Katılıyorum" && attend !== "Katılamıyorum")) {
      return jsonResponse({ ok: false, error: "Geçersiz veri" });
    }

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Tarih", "Ad Soyad", "Katılım Durumu", "Mesaj"]);
      sheet.getRange(1, 1, 1, 4).setFontWeight("bold");
    }

    sheet.appendRow([
      Utilities.formatDate(new Date(), "Europe/Istanbul", "dd.MM.yyyy HH:mm"),
      name,
      attend,
      message
    ]);

    return jsonResponse({ ok: true });
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err) });
  }
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
