import React from 'react';
import { Play, Tv2, Users, Plus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import SubscriptionPlans from '../components/SubscriptionPlans';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="space-y-16">
      <section className="text-center space-y-6">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
          Launch Your Own TV Network
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Create and manage your own TV channels using YouTube playlists. Stream content 24/7 and build your audience.
        </p>
        <div className="flex justify-center gap-4">
          <button 
            onClick={() => navigate('/demo/create')}
            className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
          >
            <Plus className="h-5 w-5" />
            Create Demo Channel
          </button>
          <Link
            to="/register"
            className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Get Started
          </Link>
        </div>
      </section>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-gray-800 p-6 rounded-xl">
          <Tv2 className="h-12 w-12 text-purple-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Create Channels</h3>
          <p className="text-gray-400">
            Build custom channels with your favorite YouTube content and schedule them your way.
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-xl">
          <Play className="h-12 w-12 text-purple-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">24/7 Streaming</h3>
          <p className="text-gray-400">
            Your channels run non-stop, providing continuous entertainment for your viewers.
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-xl">
          <Users className="h-12 w-12 text-purple-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Grow Community</h3>
          <p className="text-gray-400">
            Build an engaged audience around your curated content and interact with viewers.
          </p>
        </div>
      </div>

      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-bold">Featured Channels</h2>
            <Link 
              to="/demo/featured"
              className="text-purple-400 hover:text-purple-300 text-sm"
            >
              View all
            </Link>
          </div>
          <div className="space-y-4">
            <div className="bg-gray-800 p-4 rounded-lg flex items-center space-x-4 hover:bg-gray-700 transition-colors cursor-pointer">
              <img
                src="https://source.unsplash.com/random/150x150?retro,tv"
                alt="Channel thumbnail"
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div>
                <h4 className="font-semibold">Retro Gaming Classics</h4>
                <p className="text-gray-400 text-sm">24/7 Classic Gaming Streams</p>
                <p className="text-purple-400 text-sm">1.2k viewers</p>
              </div>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg flex items-center space-x-4 hover:bg-gray-700 transition-colors cursor-pointer">
              <img
                src="https://source.unsplash.com/random/150x150?anime"
                alt="Channel thumbnail"
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div>
                <h4 className="font-semibold">Anime Marathon</h4>
                <p className="text-gray-400 text-sm">Non-stop Anime Favorites</p>
                <p className="text-purple-400 text-sm">856 viewers</p>
              </div>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg flex items-center space-x-4 hover:bg-gray-700 transition-colors cursor-pointer">
              <img
                src="https://source.unsplash.com/random/150x150?music,concert"
                alt="Channel thumbnail"
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div>
                <h4 className="font-semibold">Music Festival TV</h4>
                <p className="text-gray-400 text-sm">Live Concerts & Music Videos</p>
                <p className="text-purple-400 text-sm">2.1k viewers</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 p-8 rounded-xl">
          <h2 className="text-2xl font-bold mb-6">Why Choose StreamHub?</h2>
          <ul className="space-y-4">
            <li className="flex items-center space-x-3">
              <div className="h-2 w-2 bg-purple-500 rounded-full" />
              <span>Easy to use channel management</span>
            </li>
            <li className="flex items-center space-x-3">
              <div className="h-2 w-2 bg-purple-500 rounded-full" />
              <span>YouTube playlist integration</span>
            </li>
            <li className="flex items-center space-x-3">
              <div className="h-2 w-2 bg-purple-500 rounded-full" />
              <span>Customizable scheduling</span>
            </li>
            <li className="flex items-center space-x-3">
              <div className="h-2 w-2 bg-purple-500 rounded-full" />
              <span>Real-time analytics</span>
            </li>
          </ul>
        </div>
      </section>

      <SubscriptionPlans />
    </div>
  );
}