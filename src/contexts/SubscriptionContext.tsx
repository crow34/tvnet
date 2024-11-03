import React, { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';
import { subscriptions, SubscriptionPlan } from '../lib/api';
import { toast } from 'react-hot-toast';

interface SubscriptionContextType {
  plans: SubscriptionPlan[];
  currentPlan: string | null;
  isLoading: boolean;
  subscribe: (planId: string) => Promise<void>;
  cancel: () => Promise<void>;
  resume: () => Promise<void>;
}

const SubscriptionContext = createContext<SubscriptionContextType | null>(null);

// Define plans statically to avoid API calls in demo
const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    period: 'month'
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 9.99,
    period: 'month'
  },
  {
    id: 'business',
    name: 'Business',
    price: 29.99,
    period: 'month'
  }
];

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const subscribe = async (planId: string) => {
    setIsLoading(true);
    try {
      await subscriptions.subscribe(planId);
      toast.success('Successfully subscribed!');
      // Store subscription info in localStorage
      const updatedUser = { ...user, plan: planId, subscriptionStatus: 'active' };
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (error) {
      toast.error('Failed to subscribe');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const cancel = async () => {
    setIsLoading(true);
    try {
      await subscriptions.cancel();
      toast.success('Subscription cancelled');
      // Update subscription status in localStorage
      const updatedUser = { ...user, subscriptionStatus: 'canceled' };
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (error) {
      toast.error('Failed to cancel subscription');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const resume = async () => {
    setIsLoading(true);
    try {
      await subscriptions.resume();
      toast.success('Subscription resumed');
      // Update subscription status in localStorage
      const updatedUser = { ...user, subscriptionStatus: 'active' };
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (error) {
      toast.error('Failed to resume subscription');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SubscriptionContext.Provider
      value={{
        plans: SUBSCRIPTION_PLANS,
        currentPlan: user?.plan || 'free',
        isLoading,
        subscribe,
        cancel,
        resume,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
}