/*
  # Create download history table

  1. New Tables
    - `download_history`
      - `id` (uuid, primary key)
      - `url` (text, the video URL submitted)
      - `platform` (text, detected platform: youtube, instagram, pinterest)
      - `video_title` (text, title of the video)
      - `video_thumbnail` (text, thumbnail URL)
      - `created_at` (timestamp, when the download was recorded)

  2. Security
    - Enable RLS on `download_history` table
    - Allow all users (authenticated and public) to insert records
    - Allow all users to read all records in the table (public history view)
    - Disable delete/update to prevent tampering

  3. Indexes
    - Index on `created_at` for efficient sorting of recent downloads
    - Index on `platform` for filtering by platform
*/

CREATE TABLE IF NOT EXISTS download_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url text NOT NULL,
  platform text NOT NULL CHECK (platform IN ('youtube', 'instagram', 'pinterest')),
  video_title text NOT NULL,
  video_thumbnail text,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_download_history_created_at ON download_history(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_download_history_platform ON download_history(platform);

ALTER TABLE download_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert download history"
  ON download_history
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can view all download history"
  ON download_history
  FOR SELECT
  USING (true);