const express = require('express');
const cors = require('cors');
const ytdlp = require('yt-dlp-exec');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());

app.get('/download', async (req, res) => {
  const videoUrl = req.query.url;
  if (!videoUrl) {
    return res.status(400).send('Missing url parameter');
  }

  const tempFile = path.join(__dirname, 'video.mp4');
  try {
    await ytdlp(videoUrl, {
      output: tempFile,
      format: 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/mp4'
    });

    res.download(tempFile, 'video.mp4', (err) => {
      fs.unlink(tempFile, () => {});
    });
  } catch (err) {
    res.status(500).send('Download failed');
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});