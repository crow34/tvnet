import React, { useState } from 'react';
import { Youtube } from 'lucide-react';

interface PlaylistFormProps {
  onSubmit: (data: PlaylistFormData) => void;
}

export interface PlaylistFormData {
  youtubePlaylistId: string;
  name: string;
  description: string;
  startTime: string;
  endTime: string;
}

export default function PlaylistForm({ onSubmit }: PlaylistFormProps) {
  const [formData, setFormData] = useState<PlaylistFormData>({
    youtubePlaylistId: '',
    name: '',
    description: '',
    startTime: '',
    endTime: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="youtubePlaylistId" className="block text-sm font-medium mb-2">
          YouTube Playlist URL or ID
        </label>
        <div className="relative">
          <Youtube className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <input
            type="text"
            id="youtubePlaylistId"
            value={formData.youtubePlaylistId}
            onChange={(e) => setFormData({ ...formData, youtubePlaylistId: e.target.value })}
            className="w-full bg-gray-700 text-white pl-12 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter playlist URL or ID"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="startTime" className="block text-sm font-medium mb-2">
            Start Time
          </label>
          <input
            type="time"
            id="startTime"
            value={formData.startTime}
            onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
            className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>
        <div>
          <label htmlFor="endTime" className="block text-sm font-medium mb-2">
            End Time
          </label>
          <input
            type="time"
            id="endTime"
            value={formData.endTime}
            onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
            className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Playlist Name
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-2">
          Description
        </label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 h-32"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors"
      >
        Add Playlist
      </button>
    </form>
  );
}