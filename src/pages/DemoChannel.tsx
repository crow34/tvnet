import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, AlertCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface DemoChannelData {
  name: string;
  description: string;
  youtubePlaylistId: string;
}

export default function DemoChannel() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<DemoChannelData>({
    name: '',
    description: '',
    youtubePlaylistId: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Extract playlist ID from URL if full URL is provided
      let playlistId = formData.youtubePlaylistId;
      if (playlistId.includes('list=')) {
        playlistId = playlistId.split('list=')[1].split('&')[0];
      }

      const demoChannel = {
        ...formData,
        youtubePlaylistId: playlistId,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        thumbnail: `https://source.unsplash.com/random/400x200?tv,${Math.random()}`,
      };

      const existingChannels = JSON.parse(localStorage.getItem('demoChannels') || '[]');
      localStorage.setItem('demoChannels', JSON.stringify([...existingChannels, demoChannel]));

      toast.success('Demo channel created successfully!');
      navigate(`/watch/${demoChannel.id}`);
    } catch (error) {
      toast.error('Failed to create demo channel');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Create Demo Channel</h1>
        <p className="text-gray-400">
          Try out our platform by creating a demo channel. No registration required!
        </p>
      </div>

      <div className="bg-gray-800 p-6 rounded-xl">
        <div className="mb-6 p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-purple-400 mt-0.5" />
          <div className="text-sm text-purple-200">
            <p className="font-semibold mb-1">Demo Channel Limitations:</p>
            <ul className="list-disc list-inside space-y-1 text-purple-300">
              <li>Available for 24 hours</li>
              <li>Limited to one YouTube playlist</li>
              <li>Basic features only</li>
            </ul>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Channel Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
              disabled={isLoading}
              placeholder="e.g., Retro Gaming Channel"
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
              disabled={isLoading}
              placeholder="Describe what viewers can expect from your channel..."
            />
          </div>

          <div>
            <label htmlFor="youtubePlaylistId" className="block text-sm font-medium mb-2">
              YouTube Playlist URL or ID
            </label>
            <input
              type="text"
              id="youtubePlaylistId"
              value={formData.youtubePlaylistId}
              onChange={(e) => setFormData({ ...formData, youtubePlaylistId: e.target.value })}
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="e.g., https://youtube.com/playlist?list=..."
              required
              disabled={isLoading}
            />
            <p className="mt-1 text-sm text-gray-400">
              Paste a YouTube playlist URL or just the playlist ID
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Channel Thumbnail
            </label>
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="thumbnail"
                disabled={isLoading}
              />
              <label
                htmlFor="thumbnail"
                className="flex flex-col items-center cursor-pointer"
              >
                <Upload className="h-12 w-12 text-gray-400 mb-2" />
                <span className="text-gray-400">Click to upload thumbnail</span>
                <span className="text-gray-500 text-sm">(Optional for demo)</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-purple-500 hover:bg-purple-600 disabled:bg-purple-500/50 text-white px-4 py-2 rounded-lg transition-colors"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Creating Demo Channel...
              </span>
            ) : (
              'Create Demo Channel'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}