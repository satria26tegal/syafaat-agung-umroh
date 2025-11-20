-- Create enum for app roles
CREATE TYPE app_role AS ENUM ('admin', 'user');

-- Create user_roles table
CREATE TABLE user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Allow users to read their own roles
CREATE POLICY "Users can read own roles"
  ON user_roles FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Allow admins to manage all roles
CREATE POLICY "Admins can manage all roles"
  ON user_roles FOR ALL
  TO authenticated
  USING (has_role(auth.uid(), 'admin'));

-- Site settings table
CREATE TABLE site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hero_title TEXT NOT NULL DEFAULT 'Teman Perjalanan Menuju Tanah Suci',
  hero_subtitle TEXT,
  hero_background_url TEXT,
  whatsapp_number TEXT NOT NULL DEFAULT '62895341574293',
  instagram_url TEXT,
  facebook_url TEXT,
  tiktok_url TEXT,
  email TEXT,
  address TEXT DEFAULT 'Jl. Raya Dukuhwaru, Kec. Dukuhwaru, Kab. Tegal',
  office_hours TEXT DEFAULT 'Senin - Sabtu: 08:00 - 17:00',
  google_maps_embed TEXT,
  company_description TEXT,
  logo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on site_settings
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Everyone can read site settings
CREATE POLICY "Anyone can read site settings"
  ON site_settings FOR SELECT
  TO anon, authenticated
  USING (true);

-- Only admins can modify site settings
CREATE POLICY "Admins can modify site settings"
  ON site_settings FOR ALL
  TO authenticated
  USING (has_role(auth.uid(), 'admin'));

-- Insert default settings
INSERT INTO site_settings (hero_title, whatsapp_number, address)
VALUES ('Teman Perjalanan Menuju Tanah Suci', '62895341574293', 'Jl. Raya Dukuhwaru, Kec. Dukuhwaru, Kab. Tegal');

-- Umroh packages table
CREATE TABLE umroh_packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(12, 2),
  duration_days INTEGER NOT NULL,
  airline TEXT,
  hotel_makkah TEXT,
  hotel_madinah TEXT,
  departure_dates TEXT[],
  facilities TEXT[],
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on umroh_packages
ALTER TABLE umroh_packages ENABLE ROW LEVEL SECURITY;

-- Everyone can read active packages
CREATE POLICY "Anyone can read active packages"
  ON umroh_packages FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

-- Admins can manage all packages
CREATE POLICY "Admins can manage packages"
  ON umroh_packages FOR ALL
  TO authenticated
  USING (has_role(auth.uid(), 'admin'));

-- Documentation/gallery table
CREATE TABLE gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('photo', 'video')),
  url TEXT NOT NULL,
  category TEXT,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on gallery
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

-- Everyone can read gallery
CREATE POLICY "Anyone can read gallery"
  ON gallery FOR SELECT
  TO anon, authenticated
  USING (true);

-- Admins can manage gallery
CREATE POLICY "Admins can manage gallery"
  ON gallery FOR ALL
  TO authenticated
  USING (has_role(auth.uid(), 'admin'));

-- Company profile table
CREATE TABLE company_profile (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL DEFAULT 'Syafaat Agung Tour and Travel Umroh',
  description TEXT,
  vision TEXT,
  mission TEXT,
  values TEXT[],
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on company_profile
ALTER TABLE company_profile ENABLE ROW LEVEL SECURITY;

-- Everyone can read company profile
CREATE POLICY "Anyone can read company profile"
  ON company_profile FOR SELECT
  TO anon, authenticated
  USING (true);

-- Admins can modify company profile
CREATE POLICY "Admins can modify company profile"
  ON company_profile FOR ALL
  TO authenticated
  USING (has_role(auth.uid(), 'admin'));

-- Insert default company profile
INSERT INTO company_profile (name, description, values)
VALUES (
  'Syafaat Agung Tour and Travel Umroh',
  'Travel umroh terpercaya dengan pelayanan profesional, bimbingan ibadah, fasilitas nyaman, serta pendampingan ustadz berpengalaman.',
  ARRAY[
    'Legal dan berizin resmi',
    'Pembimbing berpengalaman',
    'Hotel dekat Masjidil Haram & Nabawi',
    'Jadwal fleksibel',
    'Layanan ramah dan amanah',
    'Dokumentasi lengkap perjalanan'
  ]
);

-- Contact inquiries table
CREATE TABLE contact_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on contact_inquiries
ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;

-- Anyone can create inquiries
CREATE POLICY "Anyone can create inquiries"
  ON contact_inquiries FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Admins can read and manage inquiries
CREATE POLICY "Admins can manage inquiries"
  ON contact_inquiries FOR ALL
  TO authenticated
  USING (has_role(auth.uid(), 'admin'));

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
CREATE TRIGGER update_site_settings_updated_at
  BEFORE UPDATE ON site_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_umroh_packages_updated_at
  BEFORE UPDATE ON umroh_packages
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_gallery_updated_at
  BEFORE UPDATE ON gallery
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_company_profile_updated_at
  BEFORE UPDATE ON company_profile
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();