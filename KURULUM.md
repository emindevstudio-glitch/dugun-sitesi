# Düğün Sitesi — Kurulum Rehberi

Hiç web sitesi yayınlamamış biri için hazırlandı. İki adım var; toplam ~15 dakika sürer. Laptopunuza gerek yok — site ücretsiz bulut sunucularda çalışacak.

---

## Adım 1 — RSVP Yanıtları için Google E-Tablosu (≈10 dk)

Misafir yanıtları bir Google E-Tablosunda birikecek; telefonunuzdan bile bakabilirsiniz.

1. [sheets.google.com](https://sheets.google.com) adresine gidin, Google hesabınızla giriş yapın ve **boş bir tablo** oluşturun. Adını "Düğün RSVP" yapın.
2. Menüden **Uzantılar → Apps Script**'e tıklayın.
3. Açılan editördeki tüm kodu silin ve `google-apps-script.gs` dosyasındaki kodun tamamını yapıştırın. Kaydedin (disket simgesi).
4. Sağ üstte **Dağıt → Yeni dağıtım**'a tıklayın.
   - Dişli simgesinden tür olarak **Web uygulaması** seçin.
   - "Kimin adına çalışsın": **Ben**
   - "Kimler erişebilir": **Herkes** (bu şart — misafirler giriş yapmadan yanıt gönderebilmeli)
   - **Dağıt**'a basın ve Google'ın izin ekranlarını onaylayın. ("Doğrulanmamış uygulama" uyarısı çıkarsa: *Gelişmiş → devam et* — bu sizin kendi betiğiniz, güvenli.)
5. Size `https://script.google.com/macros/s/.../exec` ile biten bir **Web uygulaması URL'si** verilecek. Bunu kopyalayın.
6. `index.html` dosyasını bir metin düzenleyiciyle (Not Defteri / TextEdit) açın, `PASTE_YOUR_APPS_SCRIPT_URL_HERE` yazan yeri bu URL ile değiştirin ve kaydedin.

Artık her yanıt tabloya şu sütunlarla düşecek: Tarih, Ad Soyad, Kişi Sayısı, Katılım Durumu.

---

## Adım 2 — Siteyi Yayınlama: Netlify Drop (≈5 dk)

1. [app.netlify.com/drop](https://app.netlify.com/drop) adresine gidin (ücretsiz hesap oluşturmanız istenir — e-posta ile 1 dakika).
2. `dugun-sitesi` klasörünü (içinde `index.html` olan klasörü) tarayıcı penceresine **sürükleyip bırakın**.
3. Site anında yayında! Netlify rastgele bir isim verir (örn. `wonderful-cat-123.netlify.app`).
4. Güzel bir adres için: **Site settings → Change site name** → `senanur-mehmetemin` yazın.
   Adresiniz şu olur: **https://senanur-mehmetemin.netlify.app**

Bu adresi davetiyelere yazabilir veya adres için ayrı bir karekod bastırabilirsiniz.

---

## İçerik Güncelleme

Tüm metinler `index.html` dosyasının sonundaki `CONFIG` bölümünde toplandı:

isimler, tarih, saat, salon adı, şehir, adres, harita bağlantısı, RSVP son tarihi, notlar ve alt yazı.

Değiştirmek için: dosyayı metin düzenleyiciyle açın → `CONFIG` içindeki değeri değiştirin → kaydedin → klasörü Netlify'a yeniden sürükleyin (**Deploys → sürükle-bırak**). Karekod, adres değişirse otomatik olarak yeni konumu gösterir.

---

## Kontrol Listesi

- [ ] Google E-Tablosu oluşturuldu, Apps Script dağıtıldı
- [ ] Web uygulaması URL'si `index.html` içine yapıştırıldı
- [ ] Klasör Netlify Drop'a sürüklendi
- [ ] Site adı `senanur-mehmetemin` olarak değiştirildi
- [ ] Telefonunuzdan siteyi açıp deneme RSVP'si gönderin → tabloya düştüğünü doğrulayın
- [ ] Karekodu telefon kamerasıyla okutup haritanın doğru yeri açtığını kontrol edin

Sorun yaşarsanız en sık neden: Apps Script dağıtımında "Kimler erişebilir" ayarının **Herkes** olmaması.
