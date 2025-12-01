-- =============================================
-- EXPORT DATA SYAFAAT AGUNG UMROH
-- Dari Supabase PostgreSQL ke MySQL
-- =============================================

-- Buat Database
CREATE DATABASE IF NOT EXISTS syafaat_agung_umroh CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE syafaat_agung_umroh;

-- =============================================
-- 1. TABEL SITE_SETTINGS
-- =============================================
DROP TABLE IF EXISTS site_settings;
CREATE TABLE site_settings (
    id CHAR(36) PRIMARY KEY,
    hero_title VARCHAR(255) NOT NULL DEFAULT 'Teman Perjalanan Menuju Tanah Suci',
    hero_subtitle TEXT,
    hero_background_url TEXT,
    logo_url TEXT,
    company_description TEXT,
    whatsapp_number VARCHAR(20) NOT NULL DEFAULT '62895341574293',
    email VARCHAR(100),
    address TEXT,
    office_hours VARCHAR(100) DEFAULT 'Senin - Sabtu: 08:00 - 17:00',
    google_maps_embed TEXT,
    instagram_url VARCHAR(255),
    facebook_url VARCHAR(255),
    tiktok_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert Data Site Settings
INSERT INTO site_settings (
    id,
    hero_title,
    hero_subtitle,
    hero_background_url,
    logo_url,
    company_description,
    whatsapp_number,
    email,
    address,
    office_hours,
    google_maps_embed,
    instagram_url,
    facebook_url,
    tiktok_url,
    created_at,
    updated_at
) VALUES (
    '650a90db-2616-46ea-85b7-afe791dd5281',
    'Teman Perjalanan Menuju Tanah Suci',
    'Travel Umroh Terpercaya dengan Pelayanan Profesional dan Amanah',
    NULL,
    NULL,
    NULL,
    '62895341574293',
    'info@syafaatagung.com',
    'Jl. Raya Dukuhwaru, Kec. Dukuhwaru, Kab. Tegal',
    'Senin - Sabtu: 08:00 - 17:00',
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.5789!2d109.1234!3d-6.8765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNTInMzUuNCJTIDEwOcKwMDcnMjQuMiJF!5e0!3m2!1sen!2sid!4v1234567890123!5m2!1sen!2sid',
    'https://instagram.com/syafaatagung',
    'https://facebook.com/syafaatagung',
    NULL,
    '2025-11-20 17:38:27',
    '2025-11-21 01:47:33'
);

-- =============================================
-- 2. TABEL COMPANY_PROFILE
-- =============================================
DROP TABLE IF EXISTS company_profile;
CREATE TABLE company_profile (
    id CHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL DEFAULT 'Syafaat Agung Tour and Travel Umroh',
    description TEXT,
    image_url TEXT,
    vision TEXT,
    mission TEXT,
    values JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert Data Company Profile
INSERT INTO company_profile (
    id,
    name,
    description,
    image_url,
    vision,
    mission,
    values,
    created_at,
    updated_at
) VALUES (
    '6f180ee8-905b-4913-87df-0b72e7b60fc7',
    'Syafaat Agung Tour and Travel Umroh',
    'Travel umroh terpercaya dengan pelayanan profesional, bimbingan ibadah, fasilitas nyaman, serta pendampingan ustadz berpengalaman.',
    NULL,
    NULL,
    NULL,
    JSON_ARRAY(
        'Legal dan berizin resmi',
        'Pembimbing berpengalaman',
        'Hotel dekat Masjidil Haram & Nabawi',
        'Jadwal fleksibel',
        'Layanan ramah dan amanah',
        'Dokumentasi lengkap perjalanan'
    ),
    '2025-11-20 17:38:27',
    '2025-11-20 17:38:27'
);

-- =============================================
-- 3. TABEL UMROH_PACKAGES
-- =============================================
DROP TABLE IF EXISTS umroh_packages;
CREATE TABLE umroh_packages (
    id CHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    tagline VARCHAR(255),
    description TEXT,
    duration_days INT NOT NULL,
    season_type VARCHAR(50),
    departure_month VARCHAR(50),
    departure_dates JSON,
    price DECIMAL(15,2),
    price_quads DECIMAL(15,2),
    price_triple DECIMAL(15,2),
    price_double DECIMAL(15,2),
    airline VARCHAR(100),
    hotel_makkah VARCHAR(255),
    hotel_madinah VARCHAR(255),
    facilities JSON,
    included_items JSON,
    not_included_items JSON,
    image_url TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_is_active (is_active),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert Data Umroh Packages
INSERT INTO umroh_packages (
    id,
    name,
    tagline,
    description,
    duration_days,
    season_type,
    departure_month,
    departure_dates,
    price,
    price_quads,
    price_triple,
    price_double,
    airline,
    hotel_makkah,
    hotel_madinah,
    facilities,
    included_items,
    not_included_items,
    image_url,
    is_active,
    created_at,
    updated_at
) VALUES 
(
    'd7c4f0cb-5649-4d03-af54-4b93c42fa57b',
    'Paket Reguler 9 Hari',
    NULL,
    'Paket umroh ekonomis dengan fasilitas lengkap dan nyaman untuk ibadah Anda',
    9,
    NULL,
    NULL,
    NULL,
    25000000.00,
    NULL,
    NULL,
    NULL,
    'Saudia Airlines / Garuda Indonesia',
    'Hotel Bintang 3 (jarak 500m dari Masjidil Haram)',
    'Hotel Bintang 3 (jarak 300m dari Masjid Nabawi)',
    JSON_ARRAY(
        'Tiket pesawat PP Jakarta - Jeddah',
        'Visa umroh',
        'Hotel Makkah & Madinah',
        'Transportasi AC selama di Arab Saudi',
        'Makan 3x sehari',
        'Perlengkapan umroh',
        'Bimbingan ibadah oleh ustadz berpengalaman',
        'Ziarah ke tempat bersejarah',
        'Air zam-zam 5 liter',
        'Asuransi perjalanan'
    ),
    NULL,
    NULL,
    NULL,
    TRUE,
    '2025-11-21 01:44:43',
    '2025-11-21 01:44:43'
),
(
    '53f1a5b6-256c-4648-bdbd-33c3f2816e89',
    'Paket VIP 12 Hari',
    NULL,
    'Paket umroh premium dengan hotel bintang 5 dekat Masjidil Haram dan Masjid Nabawi',
    12,
    NULL,
    NULL,
    NULL,
    45000000.00,
    NULL,
    NULL,
    NULL,
    'Saudia Airlines',
    'Hotel Bintang 5 (jarak 100m dari Masjidil Haram)',
    'Hotel Bintang 5 (jarak 50m dari Masjid Nabawi)',
    JSON_ARRAY(
        'Tiket pesawat Business Class PP',
        'Visa umroh',
        'Hotel Bintang 5 view Ka\'bah',
        'Transportasi VIP AC',
        'Makan 4x sehari (prasmanan)',
        'Perlengkapan umroh premium',
        'Bimbingan ustadz senior',
        'Ziarah lengkap',
        'City tour Jeddah',
        'Air zam-zam 10 liter',
        'Asuransi perjalanan premium',
        'Laundry gratis'
    ),
    NULL,
    NULL,
    NULL,
    TRUE,
    '2025-11-21 01:44:43',
    '2025-11-21 01:44:43'
),
(
    '281748ba-e3e2-4a64-82d2-cd35eabd3240',
    'Paket Plus Turkey 16 Hari',
    NULL,
    'Paket umroh + tour Istanbul Turkey dengan pengalaman wisata religi yang berkesan',
    16,
    NULL,
    NULL,
    NULL,
    38000000.00,
    NULL,
    NULL,
    NULL,
    'Turkish Airlines',
    'Hotel Bintang 4 (jarak 300m dari Masjidil Haram)',
    'Hotel Bintang 4 (jarak 200m dari Masjid Nabawi)',
    JSON_ARRAY(
        'Tiket pesawat PP via Istanbul',
        'Visa umroh & Turkey',
        'Hotel Makkah, Madinah & Istanbul',
        'Transportasi AC',
        'Makan 3x sehari',
        'Tour Istanbul 3 hari (Blue Mosque, Hagia Sophia, Bosphorus)',
        'Perlengkapan umroh',
        'Bimbingan ustadz',
        'Ziarah lengkap',
        'Air zam-zam 5 liter',
        'Asuransi perjalanan'
    ),
    NULL,
    NULL,
    NULL,
    TRUE,
    '2025-11-21 01:44:43',
    '2025-11-21 01:44:43'
);

-- =============================================
-- 4. TABEL GALLERY
-- =============================================
DROP TABLE IF EXISTS gallery;
CREATE TABLE gallery (
    id CHAR(36) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    url TEXT NOT NULL,
    type VARCHAR(20) NOT NULL,
    category VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_type (type),
    INDEX idx_category (category),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert Data Gallery
INSERT INTO gallery (
    id,
    title,
    description,
    url,
    type,
    category,
    created_at,
    updated_at
) VALUES 
(
    'dfdadda3-72a5-434a-a201-06f027e21957',
    'Ka\'bah saat Tawaf',
    'Pemandangan Ka\'bah saat jamaah melakukan tawaf',
    'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800',
    'photo',
    'Ka\'bah',
    '2025-11-21 01:45:24',
    '2025-11-21 01:45:24'
),
(
    '6e902545-a5a4-46d8-9a2e-e4f1a7a55b72',
    'Masjid Nabawi di Malam Hari',
    'Keindahan Masjid Nabawi dengan kubah hijau yang megah',
    'https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800',
    'photo',
    'Masjid Nabawi',
    '2025-11-21 01:45:24',
    '2025-11-21 01:45:24'
),
(
    '6d628ef2-5b67-4550-ab8d-ac050856d719',
    'Jamaah Umroh 2024',
    'Dokumentasi jamaah umroh Syafaat Agung 2024',
    'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800',
    'photo',
    '2024',
    '2025-11-21 01:45:24',
    '2025-11-21 01:45:24'
),
(
    'c80b6923-28bf-4c7e-9eb4-94f6b5888ac6',
    'Raudhah Masjid Nabawi',
    'Suasana khusyuk di Raudhah',
    'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=800',
    'photo',
    'Masjid Nabawi',
    '2025-11-21 01:45:24',
    '2025-11-21 01:45:24'
),
(
    '050bf6f2-e975-47b8-8239-8ea869ec54d8',
    'Masjidil Haram dari Atas',
    'View dari atas Masjidil Haram',
    'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800',
    'photo',
    'Ka\'bah',
    '2025-11-21 01:45:24',
    '2025-11-21 01:45:24'
),
(
    'e3281112-d766-443c-b41a-bcd3b6b467ec',
    'City Tour Jeddah',
    'Wisata ke kota Jeddah',
    'https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?w=800',
    'photo',
    'City Tour',
    '2025-11-21 01:45:24',
    '2025-11-21 01:45:24'
),
(
    '50a4df18-f213-4a2e-b502-6dddb5a28599',
    'Dokumentasi Perjalanan 2023',
    'Kenangan umroh bersama Syafaat Agung 2023',
    'https://images.unsplash.com/photo-1590073844006-33379778ae09?w=800',
    'photo',
    '2023',
    '2025-11-21 01:45:24',
    '2025-11-21 01:45:24'
),
(
    '6493d6f6-22e4-4182-b976-0897f1def17b',
    'Shalat Berjamaah',
    'Shalat berjamaah di Masjidil Haram',
    'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=800',
    'photo',
    '2024',
    '2025-11-21 01:45:24',
    '2025-11-21 01:45:24'
);

-- =============================================
-- 5. TABEL CONTACT_INQUIRIES
-- =============================================
DROP TABLE IF EXISTS contact_inquiries;
CREATE TABLE contact_inquiries (
    id CHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(100),
    phone VARCHAR(20),
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_is_read (is_read),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tidak ada data contact inquiries saat ini

-- =============================================
-- 6. TABEL USERS (untuk authentication)
-- =============================================
DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id CHAR(36) PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL,
    is_active BOOLEAN DEFAULT TRUE,
    INDEX idx_email (email),
    INDEX idx_is_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert admin user (password harus di-hash di aplikasi)
-- Password perlu di-hash menggunakan bcrypt atau algoritma lain
INSERT INTO users (
    id,
    email,
    password_hash,
    full_name,
    is_active,
    created_at
) VALUES (
    'f00434e6-a0ea-4b56-9f01-729901c61c39',
    'admin@syafaatagung.com',
    '$2y$10$PLACEHOLDER_HASH',  -- Ganti dengan hash password yang sebenarnya
    'Administrator',
    TRUE,
    '2025-02-17 10:25:00'
);

-- =============================================
-- 7. TABEL USER_ROLES
-- =============================================
DROP TABLE IF EXISTS user_roles;
CREATE TABLE user_roles (
    id CHAR(36) PRIMARY KEY,
    user_id CHAR(36) NOT NULL,
    role ENUM('admin', 'moderator', 'user') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_role (user_id, role),
    INDEX idx_user_id (user_id),
    INDEX idx_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert admin role
INSERT INTO user_roles (
    id,
    user_id,
    role,
    created_at
) VALUES (
    'f00434e6-a0ea-4b56-9f01-729901c61c39',
    'f00434e6-a0ea-4b56-9f01-729901c61c39',
    'admin',
    '2025-02-17 10:25:00'
);

-- =============================================
-- SELESAI
-- =============================================
-- Total Tables: 7
-- - site_settings (1 row)
-- - company_profile (1 row)
-- - umroh_packages (3 rows)
-- - gallery (8 rows)
-- - contact_inquiries (0 rows)
-- - users (1 row)
-- - user_roles (1 row)
-- =============================================
