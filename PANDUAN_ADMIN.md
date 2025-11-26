# 📚 PANDUAN LENGKAP ADMIN PANEL - SYAFAAT AGUNG TOUR & TRAVEL

## 🔐 1. AKSES ADMIN PANEL

### Cara Login ke Admin Panel:

**Desktop:**
1. Buka website Anda
2. Klik tombol "Admin Login" di pojok kanan atas navbar
3. Atau langsung akses: `your-website.com/admin/login`
4. Masukkan email dan password admin yang sudah didaftarkan
5. Klik "Login"

**Mobile:**
1. Buka website di browser mobile
2. Tap menu hamburger (☰) di pojok kanan atas
3. Tap "Admin Login"
4. Masukkan kredensial login Anda

### Setup Admin Pertama Kali:

**PENTING:** Untuk setup admin pertama kali, Anda perlu:

1. **Buka Cloud Tool** (di Lovable)
   - **Desktop**: Klik tombol "Cloud" di navigation bar atas preview
   - **Mobile**: Tap icon widgets di pojok kanan bawah (mode Chat)

2. **Buat User di Authentication:**
   - Masuk ke tab "Users"
   - Klik "Add User"
   - Masukkan email dan password untuk admin
   - Simpan user ID yang tergenerate

3. **Berikan Role Admin:**
   - Masuk ke tab "Database" → Tabel "user_roles"
   - Klik "Insert" atau "Add Row"
   - Isi:
     - `user_id`: Paste user ID dari step 2
     - `role`: Pilih "admin"
   - Klik "Save"

4. **Login ke Admin Panel:**
   - Sekarang Anda bisa login dengan email dan password yang dibuat

---

## 📋 2. FITUR-FITUR ADMIN PANEL

Setelah login, Anda akan melihat sidebar dengan menu berikut:

### A. 📊 Dashboard
- **Fungsi**: Melihat overview website dan statistik
- **Cara Akses**: Klik "Dashboard" di sidebar
- **Isi**: 
  - Total paket umroh
  - Total pesan masuk
  - Total foto di galeri
  - Preview paket terbaru

### B. 🏢 Company Profile
**Fungsi**: Mengelola informasi perusahaan yang tampil di halaman "Profil"

**Cara Edit:**
1. Klik "Company" di sidebar
2. Edit field berikut:
   - **Nama Perusahaan**: Nama resmi perusahaan
   - **Deskripsi**: Cerita singkat tentang perusahaan
   - **Visi**: Visi perusahaan
   - **Misi**: Misi perusahaan (pisahkan per baris)
   - **Values**: Nilai-nilai perusahaan (pisahkan per baris)
   - **Image URL**: Link foto kantor/tim (opsional)
3. Klik "Simpan Perubahan"

**Tips**: Untuk upload gambar, gunakan layanan seperti Imgur atau upload ke Cloud Storage, lalu paste URL-nya.

### C. 📦 Paket Umroh
**Fungsi**: Mengelola semua paket umroh yang ditampilkan di website

**Cara Tambah Paket Baru:**
1. Klik "Paket" di sidebar
2. Klik tombol "+ Tambah Paket" (pojok kanan atas)
3. Isi form dengan lengkap:

   **Informasi Dasar:**
   - **Nama Paket**: Contoh: "Paket Umroh 10 Hari"
   - **Tagline**: Contoh: "Melayani dengan segenap hati layaknya keluarga"
   - **Deskripsi**: Penjelasan detail tentang paket

   **Jadwal & Tipe:**
   - **Tipe Season**: Contoh: "HIGH-SEASON" atau "LOW-SEASON"
   - **Bulan Keberangkatan**: Contoh: "Januari 2026"
   - **Durasi (hari)**: Contoh: 10

   **Harga per Tipe Kamar:**
   - **Harga Quads**: Harga untuk 4 orang 1 kamar
   - **Harga Triple**: Harga untuk 3 orang 1 kamar
   - **Harga Double**: Harga untuk 2 orang 1 kamar
   
   **Akomodasi:**
   - **Maskapai**: Contoh: "Garuda Indonesia"
   - **Hotel Makkah**: Nama hotel + bintang
   - **Hotel Madinah**: Nama hotel + bintang

   **Fasilitas:**
   - Ketik fasilitas, satu per baris
   - Contoh:
     ```
     Tiket pesawat PP
     Visa umroh
     Hotel bintang 3
     Makan 3x sehari
     Air Zam-Zam
     ```

   **Sudah Termasuk:**
   - Item yang sudah included, satu per baris
   - Contoh:
     ```
     Tiket pesawat PP Pesawat Saudia atau setaraf
     Visa
     Hotel Mekkah & Madinah ⭐⭐ 3
     Air Zam-Zam
     ```

   **Belum Termasuk:**
   - Item yang belum included, satu per baris
   - Contoh:
     ```
     Paspor
     Suntik meningitis & polio
     Handling & perlengkapan
     ```

4. Klik "Simpan"

**Cara Edit Paket:**
1. Klik icon "Edit" (✏️) pada paket yang ingin diubah
2. Edit field yang diperlukan
3. Klik "Simpan"

**Cara Hapus Paket:**
1. Klik icon "Trash" (🗑️) pada paket yang ingin dihapus
2. Konfirmasi penghapusan
3. Paket akan dihapus permanent

**Cara Nonaktifkan Paket (tanpa hapus):**
1. Edit paket
2. Ubah status "is_active" menjadi false
3. Paket tidak akan tampil di website tapi data tetap tersimpan

### D. 📸 Gallery (Dokumentasi)
**Fungsi**: Mengelola foto dan video dokumentasi yang tampil di halaman "Dokumentasi"

**Cara Tambah Media Baru:**
1. Klik "Gallery" di sidebar
2. Klik "+ Tambah Media"
3. Isi form:
   - **Title**: Judul media
   - **Description**: Deskripsi (opsional)
   - **Type**: Pilih "image" atau "video"
   - **Category**: Pilih kategori:
     - Dokumentasi 2023
     - Dokumentasi 2024
     - Ka'bah
     - Nabawi
     - Raudhah
     - City Tour
   - **URL**: Link ke file (upload ke hosting atau cloud storage dulu)
4. Klik "Simpan"

**Tips Upload Media:**
- Untuk gambar: Upload ke Imgur.com atau Google Drive (set public), copy link
- Untuk video: Upload ke YouTube, copy link embed

**Cara Edit/Hapus Media:**
- Sama seperti mengelola paket umroh

### E. 📧 Inquiries (Pesan Masuk)
**Fungsi**: Melihat dan mengelola pesan dari form kontak

**Cara Melihat Pesan:**
1. Klik "Inquiries" di sidebar
2. Anda akan melihat list semua pesan yang masuk
3. Pesan baru ditandai dengan badge "Unread"

**Cara Tandai Sudah Dibaca:**
1. Klik tombol "Mark as Read" pada pesan
2. Status akan berubah menjadi "Read"

**Cara Hapus Pesan:**
1. Klik icon "Trash" pada pesan
2. Konfirmasi penghapusan

**Informasi yang Tersimpan:**
- Nama pengirim
- Email
- No. WhatsApp
- Isi pesan
- Tanggal kirim

### F. ⚙️ Settings (Pengaturan Website)
**Fungsi**: Mengelola pengaturan umum website

**Cara Edit Settings:**
1. Klik "Settings" di sidebar
2. Edit field berikut:

   **Hero Section (Landing Page):**
   - **Hero Title**: Judul utama di homepage
   - **Hero Subtitle**: Subjudul di homepage
   - **Hero Background URL**: Link gambar background hero

   **Kontak & Sosial Media:**
   - **WhatsApp Number**: Format: 62895341574293 (tanpa +, -, spasi)
   - **Email**: Email perusahaan
   - **Instagram URL**: Link profil Instagram lengkap
   - **Facebook URL**: Link halaman Facebook lengkap
   - **TikTok URL**: Link profil TikTok lengkap

   **Alamat Kantor:**
   - **Address**: Alamat lengkap kantor
   - **Office Hours**: Jam operasional, contoh: "Senin - Sabtu: 08:00 - 17:00"
   - **Google Maps Embed**: Kode embed dari Google Maps

   **Deskripsi Perusahaan:**
   - **Company Description**: Deskripsi singkat yang muncul di footer
   - **Logo URL**: Link logo perusahaan

3. Klik "Simpan Pengaturan"

**Cara Dapat Kode Embed Google Maps:**
1. Buka Google Maps
2. Cari lokasi kantor Anda
3. Klik "Share" / "Bagikan"
4. Pilih tab "Embed a map"
5. Copy kode HTML yang muncul
6. Paste ke field "Google Maps Embed"

---

## 💡 3. TIPS PENGGUNAAN ADMIN PANEL

### ✅ Best Practices:

1. **Backup Data Berkala:**
   - Export data penting secara berkala
   - Simpan screenshot pengaturan penting

2. **Upload Gambar:**
   - Ukuran optimal: 1200x800px untuk gambar paket
   - Format: JPG atau PNG
   - Kompres gambar sebelum upload untuk loading cepat
   - Gunakan hosting gratis: Imgur, Google Drive, atau Cloud Storage

3. **Format Nomor WhatsApp:**
   - ✅ Benar: 62895341574293
   - ❌ Salah: +62-895-341-574-293
   - ❌ Salah: 0895341574293

4. **Menulis Deskripsi:**
   - Gunakan bahasa yang mudah dipahami
   - Hindari jargon yang terlalu teknis
   - Fokus pada benefit untuk jamaah

5. **Update Berkala:**
   - Update harga paket sesuai kondisi terkini
   - Hapus paket yang sudah tidak tersedia
   - Update dokumentasi dengan foto terbaru

### ⚠️ Yang Harus Dihindari:

1. **Jangan Share Password:**
   - Simpan password dengan aman
   - Jangan share ke orang yang tidak berwenang

2. **Jangan Hapus Sembarangan:**
   - Paket yang sudah punya booking sebaiknya di-nonaktifkan saja, jangan dihapus
   - Data lama bisa berguna untuk referensi

3. **Jangan Lupa Save:**
   - Selalu klik tombol "Simpan" setelah edit
   - Cek preview website untuk memastikan perubahan sudah apply

### 🔧 Troubleshooting:

**Masalah: Tidak bisa login**
- Cek email dan password
- Pastikan akun sudah punya role "admin" di database
- Clear browser cache dan coba lagi

**Masalah: Gambar tidak muncul**
- Pastikan URL gambar valid dan publik
- Cek format URL (harus dimulai dengan https://)
- Test URL dengan buka di browser

**Masalah: Perubahan tidak tersimpan**
- Pastikan koneksi internet stabil
- Cek apakah ada pesan error
- Refresh halaman dan coba lagi

**Masalah: WhatsApp button tidak berfungsi**
- Cek format nomor WhatsApp (harus 62xxx tanpa simbol)
- Pastikan nomor aktif di WhatsApp

---

## 📱 4. AKSES DI BERBAGAI DEVICE

### Desktop (Recommended):
- Fitur lengkap dan nyaman untuk edit
- Semua menu dapat diakses dengan mudah
- Upload gambar lebih praktis

### Tablet:
- Fitur lengkap dengan layout responsif
- Cocok untuk monitoring dan edit cepat

### Mobile:
- Fitur terbatas tapi bisa akses basic functions
- Cocok untuk emergency update
- Monitoring pesan masuk bisa dilakukan

---

## 🎯 5. WORKFLOW HARIAN YANG DISARANKAN

### Pagi (09:00):
1. Login ke admin panel
2. Cek pesan masuk baru
3. Balas urgent inquiries

### Siang (13:00):
1. Update paket jika ada perubahan
2. Upload dokumentasi baru (jika ada)

### Sore (17:00):
1. Review statistik dashboard
2. Mark semua pesan yang sudah dibalas sebagai "read"
3. Planning untuk besok

### Mingguan:
1. Update harga paket (jika ada perubahan)
2. Tambah dokumentasi terbaru
3. Review dan hapus spam inquiries

### Bulanan:
1. Audit semua paket aktif
2. Update company profile jika ada perubahan
3. Backup data penting

---

## 📞 BUTUH BANTUAN?

Jika ada kesulitan dalam menggunakan admin panel:

1. **Developer Support**: 
   - Kontak developer website
   - Jelaskan masalah dengan detail + screenshot

2. **Documentation**: 
   - Baca dokumentasi ini dengan teliti
   - Ikuti step by step sesuai panduan

3. **Training**:
   - Minta training langsung dari developer
   - Record screen saat training untuk referensi

---

## ✨ KESIMPULAN

Admin panel ini dirancang untuk memudahkan Anda mengelola website tanpa perlu coding. 

**Yang bisa Anda kelola:**
- ✅ Informasi perusahaan
- ✅ Paket umroh (harga, jadwal, fasilitas)
- ✅ Gallery dokumentasi
- ✅ Pesan dari calon jamaah
- ✅ Pengaturan kontak dan sosial media
- ✅ Konten hero section

**Semua perubahan akan langsung tampil di website setelah disimpan!**

Selamat mengelola website Syafaat Agung Tour & Travel! 🕋✨
