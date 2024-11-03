import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import ChannelForm, { ChannelFormData } from '../components/ChannelForm';
import { channels } from '../lib/api';

export default function CreateChannel() {
  const navigate = useNavigate();

  const createChannel = useMutation({
    mutationFn: (data: ChannelFormData) => {
      // TODO: Handle file upload for thumbnail
      return channels.create({
        name: data.name,
        description: data.description,
        thumbnail: '', // Will be implemented with file upload
        userId: 1, // TODO: Get from auth context
      });
    },
    onSuccess: (data) => {
      navigate(`/channel/${data.data.id}`);
    },
  });

  const handleSubmit = (data: ChannelFormData) => {
    createChannel.mutate(data);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Create New Channel</h1>
      <div className="bg-gray-800 p-6 rounded-xl">
        {createChannel.isError && (
          <div className="mb-4 p-4 bg-red-500/10 border border-red-500 rounded-lg text-red-500">
            Failed to create channel. Please try again.
          </div>
        )}
        <ChannelForm 
          onSubmit={handleSubmit} 
          isLoading={createChannel.isPending}
        />
      </div>
    </div>
  );
}