import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { Users, ThumbsUp, Share2, MessageCircle, AlertCircle, BarChart2, Shield, Settings2, Ban } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useSubscription } from '../contexts/SubscriptionContext';
import { toast } from 'react-hot-toast';

interface VideoData {
  title: string;
  url: string;
}

interface ChatMessage {
  id: number;
  user: string;
  message: string;
  avatar: string;
  isBlocked?: boolean;
}

interface DemoChannel {
  id: number;
  name: string;
  description: string;
  youtubePlaylistId: string;
  thumbnail: string;
  createdAt: string;
}

interface Analytics {
  viewersPeak: number;
  averageViewDuration: string;
  chatMessages: number;
  likes: number;
}

export default function Watch() {
  const { channelId } = useParams();
  const { user } = useAuth();
  const { currentPlan } = useSubscription();
  const [channel, setChannel] = useState<DemoChannel | null>(null);
  const [currentVideo, setCurrentVideo] = useState<VideoData | null>(null);
  const [viewers, setViewers] = useState(245);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isExpired, setIsExpired] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showModTools, setShowModTools] = useState(false);
  const [blockedUsers, setBlockedUsers] = useState<string[]>([]);
  const [analytics, setAnalytics] = useState<Analytics>({
    viewersPeak: 312,
    averageViewDuration: '15m 23s',
    chatMessages: 1458,
    likes: 287,
  });

  const isPro = currentPlan === 'pro' || currentPlan === 'business';

  useEffect(() => {
    // Load demo channel from localStorage
    const demoChannels = JSON.parse(localStorage.getItem('demoChannels') || '[]');
    const foundChannel = demoChannels.find((ch: DemoChannel) => ch.id.toString() === channelId);
    
    if (foundChannel) {
      setChannel(foundChannel);
      
      // Check if channel is expired (24 hours)
      const createdAt = new Date(foundChannel.createdAt).getTime();
      const now = new Date().getTime();
      const hoursSinceCreation = (now - createdAt) / (1000 * 60 * 60);
      
      if (hoursSinceCreation > 24) {
        setIsExpired(true);
      } else {
        setCurrentVideo({
          title: foundChannel.name,
          url: `https://www.youtube.com/watch?v=videoseries&list=${foundChannel.youtubePlaylistId}`,
        });
      }
    }
  }, [channelId]);

  useEffect(() => {
    if (!channel || isExpired) return;

    // Simulate real-time viewer updates
    const viewerInterval = setInterval(() => {
      setViewers(prev => prev + Math.floor(Math.random() * 3) - 1);
    }, 5000);

    // Simulate incoming chat messages
    const chatInterval = setInterval(() => {
      const randomMessage: ChatMessage = {
        id: Date.now(),
        user: `User${Math.floor(Math.random() * 100)}`,
        message: ['Amazing stream! 🎉', 'Great content!', 'Love this channel!'][Math.floor(Math.random() * 3)],
        avatar: `https://source.unsplash.com/random/32x32?face,${Math.random()}`,
      };
      setChatMessages(prev => [...prev.slice(-49), randomMessage]);
    }, 8000);

    return () => {
      clearInterval(viewerInterval);
      clearInterval(chatInterval);
    };
  }, [channel, isExpired]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: ChatMessage = {
      id: Date.now(),
      user: user?.name || 'Guest',
      message: newMessage,
      avatar: `https://source.unsplash.com/random/32x32?face,me`,
    };
    setChatMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const handleBlockUser = (username: string) => {
    if (!isPro) {
      toast.error('Moderator tools are only available with Pro plan');
      return;
    }
    setBlockedUsers(prev => [...prev, username]);
    toast.success(`Blocked user: ${username}`);
  };

  const handleUnblockUser = (username: string) => {
    if (!isPro) return;
    setBlockedUsers(prev => prev.filter(user => user !== username));
    toast.success(`Unblocked user: ${username}`);
  };

  if (!channel) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Channel Not Found</h2>
          <p className="text-gray-400 mb-4">This channel doesn't exist or has been removed.</p>
          <Link to="/" className="text-purple-400 hover:text-purple-300">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  if (isExpired) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-gray-800 p-8 rounded-xl">
          <AlertCircle className="h-16 w-16 text-purple-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Demo Channel Expired</h2>
          <p className="text-gray-400 mb-6">
            This demo channel has expired. Demo channels are available for 24 hours after creation.
          </p>
          <div className="space-x-4">
            <Link
              to="/demo/create"
              className="inline-block bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Create New Demo
            </Link>
            <Link
              to="/register"
              className="inline-block bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-4">
        <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg">
          {currentVideo && (
            <ReactPlayer
              url={currentVideo.url}
              width="100%"
              height="100%"
              playing
              controls
              config={{
                youtube: {
                  playerVars: { 
                    showinfo: 1,
                    list: channel.youtubePlaylistId,
                    listType: 'playlist'
                  }
                }
              }}
            />
          )}
        </div>
        
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl font-bold mb-2">{channel.name}</h1>
              <p className="text-gray-400">{channel.description}</p>
            </div>
            {isPro && (
              <button
                onClick={() => setShowAnalytics(!showAnalytics)}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                title="View Analytics"
              >
                <BarChart2 className="h-5 w-5" />
              </button>
            )}
          </div>

          {showAnalytics && isPro && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 p-4 bg-gray-700/50 rounded-lg">
              <div>
                <div className="text-sm text-gray-400">Peak Viewers</div>
                <div className="text-xl font-bold">{analytics.viewersPeak}</div>
              </div>
              <div>
                <div className="text-sm text-gray-400">Avg. View Time</div>
                <div className="text-xl font-bold">{analytics.averageViewDuration}</div>
              </div>
              <div>
                <div className="text-sm text-gray-400">Chat Messages</div>
                <div className="text-xl font-bold">{analytics.chatMessages}</div>
              </div>
              <div>
                <div className="text-sm text-gray-400">Likes</div>
                <div className="text-xl font-bold">{analytics.likes}</div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between border-t border-gray-700 pt-4">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-purple-400" />
                <span className="text-purple-400 font-medium">{viewers} watching</span>
              </div>
              <button className="flex items-center space-x-2 hover:text-purple-400 transition-colors">
                <ThumbsUp className="h-5 w-5" />
                <span>Like</span>
              </button>
              <button className="flex items-center space-x-2 hover:text-purple-400 transition-colors">
                <Share2 className="h-5 w-5" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl shadow-lg">
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MessageCircle className="h-5 w-5 text-purple-400" />
            <h2 className="text-lg font-semibold">Live Chat</h2>
          </div>
          {isPro && (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowModTools(!showModTools)}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                title="Moderator Tools"
              >
                <Shield className="h-5 w-5" />
              </button>
              {showModTools && (
                <button
                  onClick={() => setShowModTools(false)}
                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <Settings2 className="h-5 w-5" />
                </button>
              )}
            </div>
          )}
        </div>
        <div className="h-[500px] flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chatMessages
              .filter(msg => !blockedUsers.includes(msg.user))
              .map((msg) => (
                <div key={msg.id} className="flex items-start space-x-3">
                  <img
                    src={msg.avatar}
                    alt={msg.user}
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm text-purple-400">{msg.user}</span>
                      {isPro && showModTools && !blockedUsers.includes(msg.user) && (
                        <button
                          onClick={() => handleBlockUser(msg.user)}
                          className="p-1 hover:bg-gray-700 rounded transition-colors"
                          title="Block User"
                        >
                          <Ban className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                    <p className="text-sm text-gray-300">{msg.message}</p>
                  </div>
                </div>
              ))}
          </div>
          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-700">
            <div className="relative">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Send a message..."
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-purple-400 hover:text-purple-300"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}