/**
 * RSVP Kayıt Sistemi — Google Apps Script
 * Bu betik, düğün sitesinden gönderilen RSVP yanıtlarını
 * bağlı olduğu Google E-Tablosuna kaydeder.
 *
 * Kurulum adımları KURULUM.md dosyasında anlatılmıştır.
 */

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    // Bot koruması: gizli alan doluysa kaydetme
    if (data.web) {
      return jsonResponse({ ok: true });
    }

    // Basit doğrulama
    var name = String(data.adSoyad || "").trim().substring(0, 100);
    var count = parseInt(data.kisiSayisi, 10);
    var attend = String(data.katilim || "").trim();

    if (name.length < 3 || isNaN(count) || count < 1 || count > 20 ||
        (attend !== "Katılacağım" && attend !== "Katılamayacağım")) {
      return jsonResponse({ ok: false, error: "Geçersiz veri" });
    }

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

    // İlk satıra başlık ekle (yalnızca bir kez)
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Tarih", "Ad Soyad", "Kişi Sayısı", "Katılım Durumu"]);
      sheet.getRange(1, 1, 1, 4).setFontWeight("bold");
    }

    sheet.appendRow([
      Utilities.formatDate(new Date(), "Europe/Istanbul", "dd.MM.yyyy HH:mm"),
      name,
      count,
      attend
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
