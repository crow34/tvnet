import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Plus, Clock, Youtube, Settings } from 'lucide-react';
import PlaylistForm, { PlaylistFormData } from '../components/PlaylistForm';
import ChannelForm, { ChannelFormData } from '../components/ChannelForm';
import { channels, playlists } from '../lib/api';

export default function Channel() {
  const { id } = useParams();
  const [showPlaylistForm, setShowPlaylistForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  const channelQuery = useQuery({
    queryKey: ['channel', id],
    queryFn: () => channels.get(Number(id)),
    enabled: !!id,
  });

  const updateChannel = useMutation({
    mutationFn: (data: ChannelFormData) => {
      if (!id) throw new Error('No channel ID');
      // TODO: Handle file upload for thumbnail
      return channels.update(Number(id), {
        name: data.name,
        description: data.description,
      });
    },
    onSuccess: () => {
      channelQuery.refetch();
      setShowEditForm(false);
    },
  });

  const createPlaylist = useMutation({
    mutationFn: (data: PlaylistFormData) => {
      if (!id) throw new Error('No channel ID');
      return playlists.create({
        channelId: Number(id),
        youtubePlaylistId: data.youtubePlaylistId,
        name: data.name,
        description: data.description,
        startTime: new Date(data.startTime).getTime(),
        endTime: data.endTime ? new Date(data.endTime).getTime() : 0,
      });
    },
    onSuccess: () => {
      channelQuery.refetch();
      setShowPlaylistForm(false);
    },
  });

  if (channelQuery.isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (channelQuery.isError) {
    return (
      <div className="bg-red-500/10 border border-red-500 rounded-lg p-4 text-red-500">
        Failed to load channel
      </div>
    );
  }

  const channel = channelQuery.data?.data;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center space-x-4">
            <h1 className="text-3xl font-bold">{channel.name}</h1>
            <button
              onClick={() => setShowEditForm(true)}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <Settings className="h-5 w-5" />
            </button>
          </div>
          <p className="text-gray-400">{channel.description}</p>
        </div>
        <button
          onClick={() => setShowPlaylistForm(true)}
          className="flex items-center space-x-2 bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Add Playlist</span>
        </button>
      </div>

      {showEditForm && (
        <div className="bg-gray-800 p-6 rounded-xl">
          <h2 className="text-xl font-bold mb-4">Edit Channel</h2>
          <ChannelForm
            initialData={{
              name: channel.name,
              description: channel.description || '',
            }}
            onSubmit={(data) => updateChannel.mutate(data)}
            isLoading={updateChannel.isPending}
          />
        </div>
      )}

      {showPlaylistForm && (
        <div className="bg-gray-800 p-6 rounded-xl">
          <h2 className="text-xl font-bold mb-4">Add New Playlist</h2>
          <PlaylistForm 
            onSubmit={(data) => createPlaylist.mutate(data)}
            isLoading={createPlaylist.isPending}
          />
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-6 rounded-xl">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <Youtube className="h-6 w-6 mr-2 text-purple-500" />
            Playlists
          </h2>
          <div className="space-y-4">
            {channel.playlists?.map((playlist) => (
              <div key={playlist.id} className="bg-gray-700 p-4 rounded-lg">
                <h3 className="font-semibold">{playlist.name}</h3>
                <p className="text-gray-400 text-sm">{playlist.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <Clock className="h-6 w-6 mr-2 text-purple-500" />
            Schedule
          </h2>
          <div className="space-y-4">
            {channel.playlists?.map((playlist) => (
              <div key={playlist.id} className="bg-gray-700 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{playlist.name}</span>
                  <span className="text-gray-400">
                    {new Date(playlist.startTime).toLocaleTimeString()} - 
                    {playlist.endTime ? new Date(playlist.endTime).toLocaleTimeString() : 'No end time'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}