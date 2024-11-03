import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email').notNull().unique(),
  name: text('name').notNull(),
  password: text('password').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(Date.now()),
});

export const channels = sqliteTable('channels', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').references(() => users.id).notNull(),
  name: text('name').notNull(),
  description: text('description'),
  thumbnail: text('thumbnail'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(Date.now()),
});

export const playlists = sqliteTable('playlists', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  channelId: integer('channel_id').references(() => channels.id).notNull(),
  youtubePlaylistId: text('youtube_playlist_id').notNull(),
  name: text('name').notNull(),
  description: text('description'),
  startTime: integer('start_time').notNull(),
  endTime: integer('end_time'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(Date.now()),
});