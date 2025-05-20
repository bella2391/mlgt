import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs/promises';
import config from '../config';
import { isUrl } from '../utils/urls';

const router: express.Router = express.Router();

const avatarsDir: string = path.join(__dirname, '..', config.client.icon.path);

router.get('/avatar', async (req: Request, res: Response): Promise<void> => {
  if (req.isAuthenticated()) {
    const user = req.user as any;
    if (user.custom_avatar) {
      res.redirect(user.custom_avatar);
      return;
    } else if (user.avatar) {
      if (isUrl(user.avatar)) {
        res.redirect(user.avatar);
        return;
      } else if (user.discordId) {
        const discordAvatarUrl = `https://cdn.discordapp.com/avatars/${user.discordId}/${user.avatar}.${user.avatar.startsWith('a_') ? 'gif' : 'png'}`;
        res.redirect(discordAvatarUrl);
        return;
      }
    }
  }

  try {
    const files = await fs.readdir(avatarsDir);
    if (files.length === 0) {
      res.status(404).send('No avatar files found');
      return;
    }

    const randomIndex = Math.floor(Math.random() * files.length);
    const randomFileName = files[randomIndex];
    const imagePath = path.join(avatarsDir, randomFileName);

    const imageBuffer = await fs.readFile(imagePath);
    const mimeType = getMimeType(randomFileName);

    res.writeHead(200, {
      'Content-Type': mimeType,
      'Cache-Control': 'public, max-age=31536000'
    });
    res.end(imageBuffer);
    return;

  } catch (error) {
    console.error('Error serving avatar:', error);
    res.status(500).send('Error serving avatar');
    return;
  }
});

const getMimeType = (filename: string): string => {
  const ext = path.extname(filename).toLowerCase();
  switch (ext) {
    case '.png':
      return 'image/png';
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.gif':
      return 'image/gif';
    default:
      return 'application/octet-stream';
  }
};

export default router;
