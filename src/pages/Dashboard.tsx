import React from 'react';
import { PlusCircle, Settings, BarChart } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Channels</h1>
        <button className="flex items-center space-x-2 bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-lg transition-colors">
          <PlusCircle className="h-5 w-5" />
          <span>Create Channel</span>
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-gray-800 rounded-xl overflow-hidden">
            <img
              src={`https://source.unsplash.com/random/400x200?tv,${i}`}
              alt="Channel thumbnail"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold">My Channel {i}</h3>
                  <p className="text-gray-400 text-sm">Created 2 days ago</p>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                    <Settings className="h-5 w-5" />
                  </button>
                  <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                    <BarChart className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Playlists</span>
                  <span>5</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Total Duration</span>
                  <span>12h 30m</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Current Viewers</span>
                  <span>245</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}