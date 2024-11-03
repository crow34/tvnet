import express from 'express';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import * as schema from '../db/schema';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const sqlite = new Database('sqlite.db');
const db = drizzle(sqlite, { schema });

const app = express();
app.use(express.json());

// Middleware to verify JWT token
const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Validation schemas
const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

// Auth endpoints
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name } = registerSchema.parse(req.body);
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await db.insert(schema.users).values({
      email,
      password: hashedPassword,
      name,
    }).returning();

    res.json(user);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors });
    } else {
      res.status(500).json({ error: 'Failed to create user' });
    }
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = loginSchema.parse(req.body);
    
    const user = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, email),
    });

    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET);
    const { password: _, ...userWithoutPassword } = user;
    
    res.json({
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors });
    } else {
      res.status(500).json({ error: 'Login failed' });
    }
  }
});

// Protected channel endpoints
app.post('/api/channels', authenticateToken, async (req, res) => {
  const { name, description, thumbnail } = req.body;
  try {
    const channel = await db.insert(schema.channels).values({
      name,
      description,
      thumbnail,
      userId: req.user.id,
    }).returning();
    res.json(channel);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create channel' });
  }
});

app.get('/api/channels/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const channel = await db.query.channels.findFirst({
      where: (channels, { eq }) => eq(channels.id, parseInt(id)),
      with: {
        playlists: true,
      },
    });
    res.json(channel);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch channel' });
  }
});

app.get('/api/channels', authenticateToken, async (req, res) => {
  try {
    const channels = await db.query.channels.findMany({
      where: (channels, { eq }) => eq(channels.userId, req.user.id),
      with: {
        playlists: true,
      },
    });
    res.json(channels);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch channels' });
  }
});

// Protected playlist endpoints
app.post('/api/playlists', authenticateToken, async (req, res) => {
  const { channelId, youtubePlaylistId, name, description, startTime, endTime } = req.body;
  
  // Verify channel ownership
  const channel = await db.query.channels.findFirst({
    where: (channels, { eq }) => eq(channels.id, channelId),
  });

  if (!channel || channel.userId !== req.user.id) {
    return res.status(403).json({ error: 'Not authorized to modify this channel' });
  }

  try {
    const playlist = await db.insert(schema.playlists).values({
      channelId,
      youtubePlaylistId,
      name,
      description,
      startTime,
      endTime,
    }).returning();
    res.json(playlist);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create playlist' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});