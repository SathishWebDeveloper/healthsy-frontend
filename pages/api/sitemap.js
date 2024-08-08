import fs from 'fs';
import path from 'path';

export default (req, res) => {
  try {
    const { fileContent = '' } = req.body
    const filePath = path.join(process.cwd(), 'public', 'sitemap.xml');
    fs.writeFile(filePath, fileContent, (err) => {
      if (err) {
        res.status(500).send('Error writing robots.txt file');
      } else {
        res.send('Sitemap.txt file created successfully');
      }
    });
  } catch (err) {
    console.log('sitemap.js err', err);
  }
};