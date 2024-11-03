import React, { useState } from 'react';
import { Upload } from 'lucide-react';

interface ChannelFormProps {
  onSubmit: (data: ChannelFormData) => void;
  initialData?: ChannelFormData;
  isLoading?: boolean;
}

export interface ChannelFormData {
  name: string;
  description: string;
  thumbnail?: File;
}

export default function ChannelForm({ onSubmit, initialData, isLoading }: ChannelFormProps) {
  const [formData, setFormData] = useState<ChannelFormData>({
    name: initialData?.name || '',
    description: initialData?.description || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
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
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Channel Thumbnail
        </label>
        <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFormData({ ...formData, thumbnail: e.target.files?.[0] })}
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
            {initialData ? 'Updating...' : 'Creating...'}
          </span>
        ) : (
          initialData ? 'Update Channel' : 'Create Channel'
        )}
      </button>
    </form>
  );
}