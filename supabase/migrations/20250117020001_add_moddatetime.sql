-- Create the moddatetime extension if it doesn't exist
CREATE EXTENSION IF NOT EXISTS moddatetime;

-- Drop the existing trigger if it exists
DROP TRIGGER IF EXISTS set_updated_at ON pillar_6_data;

-- Create the trigger
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON pillar_6_data
  FOR EACH ROW
  EXECUTE FUNCTION moddatetime();
