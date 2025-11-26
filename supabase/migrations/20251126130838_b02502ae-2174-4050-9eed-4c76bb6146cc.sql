-- Add new fields to umroh_packages table for the new design
ALTER TABLE umroh_packages 
ADD COLUMN IF NOT EXISTS price_quads numeric,
ADD COLUMN IF NOT EXISTS price_triple numeric,
ADD COLUMN IF NOT EXISTS price_double numeric,
ADD COLUMN IF NOT EXISTS included_items text[],
ADD COLUMN IF NOT EXISTS not_included_items text[],
ADD COLUMN IF NOT EXISTS season_type text,
ADD COLUMN IF NOT EXISTS tagline text,
ADD COLUMN IF NOT EXISTS departure_month text;

-- Add comment to explain the pricing structure
COMMENT ON COLUMN umroh_packages.price_quads IS 'Price for quad occupancy room';
COMMENT ON COLUMN umroh_packages.price_triple IS 'Price for triple occupancy room';
COMMENT ON COLUMN umroh_packages.price_double IS 'Price for double occupancy room';
COMMENT ON COLUMN umroh_packages.included_items IS 'List of items/services included in the package';
COMMENT ON COLUMN umroh_packages.not_included_items IS 'List of items/services not included in the package';
COMMENT ON COLUMN umroh_packages.season_type IS 'Season type like HIGH-SEASON, LOW-SEASON, etc';
COMMENT ON COLUMN umroh_packages.tagline IS 'Package tagline or motto';
COMMENT ON COLUMN umroh_packages.departure_month IS 'Departure month like "Januari 2026"';