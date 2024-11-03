import React from 'react';
import { Check } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useSubscription } from '../contexts/SubscriptionContext';
import { toast } from 'react-hot-toast';

const plans = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    period: 'forever',
    features: [
      'Create up to 2 channels',
      '24/7 streaming',
      'Basic analytics',
      'YouTube playlist integration',
      'Live chat',
    ],
    buttonText: 'Get Started',
    highlighted: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$9.99',
    period: 'per month',
    features: [
      'Unlimited channels',
      'Advanced analytics',
      'Custom branding',
      'Priority support',
      'Multiple playlists per channel',
      'Scheduled programming',
      'Channel moderators',
    ],
    buttonText: 'Start Free Trial',
    highlighted: true,
  },
  {
    id: 'business',
    name: 'Business',
    price: '$29.99',
    period: 'per month',
    features: [
      'Everything in Pro',
      'White-label solution',
      'API access',
      'Multiple admins',
      'Dedicated support',
      'Custom integrations',
      'Usage reports',
    ],
    buttonText: 'Contact Sales',
    highlighted: false,
  },
];

export default function SubscriptionPlans() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { subscribe, isLoading } = useSubscription();

  const handleSubscribe = async (planId: string) => {
    if (!user) {
      navigate('/register', { state: { plan: planId } });
      return;
    }

    try {
      await subscribe(planId);
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to subscribe to plan');
    }
  };

  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Choose Your Plan</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Start with our free tier and upgrade as your audience grows. All plans include our core streaming features.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`bg-gray-800 rounded-xl p-8 ${
              plan.highlighted ? 'ring-2 ring-purple-500 scale-105' : ''
            }`}
          >
            {plan.highlighted && (
              <span className="bg-purple-500 text-white text-sm px-3 py-1 rounded-full inline-block mb-4">
                Most Popular
              </span>
            )}
            <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold">{plan.price}</span>
              <span className="text-gray-400">/{plan.period}</span>
            </div>
            <ul className="space-y-4 mb-8">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleSubscribe(plan.id)}
              disabled={isLoading || (user?.plan === plan.id && user?.subscriptionStatus === 'active')}
              className={`w-full py-2 px-4 rounded-lg transition-colors ${
                plan.highlighted
                  ? 'bg-purple-500 hover:bg-purple-600 text-white'
                  : 'bg-gray-700 hover:bg-gray-600 text-white'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {user?.plan === plan.id && user?.subscriptionStatus === 'active'
                ? 'Current Plan'
                : plan.buttonText}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}