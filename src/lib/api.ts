import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

// Add token to all requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface User {
  id: number;
  email: string;
  name: string;
  plan: 'free' | 'pro' | 'business';
  subscriptionStatus: 'active' | 'canceled' | 'expired';
  subscriptionEndsAt?: string;
}

export interface Channel {
  id: number;
  userId: number;
  name: string;
  description: string;
  thumbnail: string;
}

export interface Playlist {
  id: number;
  channelId: number;
  youtubePlaylistId: string;
  name: string;
  description: string;
  startTime: number;
  endTime: number;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  period: 'month' | 'year';
}

export const auth = {
  register: (data: { email: string; password: string; name: string; plan?: string }) =>
    api.post<User>('/auth/register', data),
  login: (data: { email: string; password: string }) =>
    api.post<{ user: User; token: string }>('/auth/login', data),
};

export const channels = {
  create: (data: Omit<Channel, 'id' | 'userId'>) =>
    api.post<Channel>('/channels', data),
  get: (id: number) =>
    api.get<Channel & { playlists: Playlist[] }>(`/channels/${id}`),
  list: () =>
    api.get<Channel[]>('/channels'),
  update: (id: number, data: Partial<Omit<Channel, 'id' | 'userId'>>) =>
    api.patch<Channel>(`/channels/${id}`, data),
};

export const playlists = {
  create: (data: Omit<Playlist, 'id'>) =>
    api.post<Playlist>('/playlists', data),
  update: (id: number, data: Partial<Playlist>) =>
    api.patch<Playlist>(`/playlists/${id}`, data),
};

export const subscriptions = {
  getPlans: () => api.get<SubscriptionPlan[]>('/subscriptions/plans'),
  subscribe: (planId: string) => api.post('/subscriptions/subscribe', { planId }),
  cancel: () => api.post('/subscriptions/cancel'),
  resume: () => api.post('/subscriptions/resume'),
};