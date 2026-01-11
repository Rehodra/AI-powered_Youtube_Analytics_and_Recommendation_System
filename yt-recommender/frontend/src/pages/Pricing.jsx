import { Check, Sparkles, Zap, Crown, Loader2, Lock } from 'lucide-react';
import FadeIn from '../components/ui/FadeIn';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authApi } from '../services/api';
import { useState } from 'react';

const Pricing = () => {
  const { isLoggedIn, user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handlePlanSelection = async (planName) => {
    // Premium plans show payment gateway message
    if (planName === 'pro' || planName === 'team') {
      return; // Do nothing, tooltip will show
    }

    if (!isLoggedIn) {
      // Not logged in, redirect to register
      navigate('/register');
      return;
    }

    // Already on free plan
    if (user?.plan?.toLowerCase() === 'free') {
      navigate('/audit');
      return;
    }

    setLoading(true);
    setSelectedPlan(planName);

    try {
      const updatedUser = await authApi.updatePlan(planName);
      updateUser(updatedUser);

      // Redirect to audit after successful plan selection
      setTimeout(() => {
        navigate('/audit');
      }, 500);
    } catch (error) {
      console.error('Failed to update plan:', error);
      alert('Failed to update plan. Please try again.');
      setLoading(false);
    }
  };

  const plans = [
    {
      name: "Free",
      price: "0",
      description: "Perfect for trying out",
      icon: Sparkles,
      color: "slate",
      features: [
        "1 analysis per month",
        "Title suggestions",
        "Copyright scan",
        "Email delivery"
      ],
      ctaLoggedOut: "Get Started Free",
      ctaLoggedIn: "Select Free Plan",
      popular: false
    },
    {
      name: "Pro",
      price: "19",
      description: "For serious creators",
      icon: Zap,
      color: "sky",
      features: [
        "Unlimited analyses",
        "All 6 intel services",
        "Multi-platform strategy",
        "Trend predictions",
        "Priority support"
      ],
      ctaLoggedOut: "Start Pro Trial",
      ctaLoggedIn: "Select Pro Plan",
      popular: true
    },
    {
      name: "Team",
      price: "99",
      description: "For agencies & teams",
      icon: Crown,
      color: "purple",
      features: [
        "Everything in Pro",
        "Up to 10 members",
        "Shared dashboard",
        "API access",
        "Priority 24/7"
      ],
      ctaLoggedOut: "Contact Sales",
      ctaLoggedIn: "Select Team Plan",
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-16 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <FadeIn delay={0}>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-sky-100 text-sky-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-6">
              <Sparkles size={12} />
              Simple Pricing
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
              Choose Your Plan
            </h1>
            <p className="text-slate-500 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
              Start free, upgrade when you're ready. All plans include core AI analysis features.
            </p>
          </div>
        </FadeIn>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, index) => {
            const IconComponent = plan.icon;

            return (
              <FadeIn key={plan.name} delay={index * 100}>
                <div className={`relative bg-white rounded-2xl border-2 p-6 transition-all hover:shadow-lg ${plan.popular
                  ? 'border-sky-500 shadow-sm shadow-sky-500/10'
                  : 'border-slate-200 hover:border-slate-300'
                  }`}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-slate-900 text-white px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest shadow-lg">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <div className={`inline-flex p-2 rounded-xl bg-${plan.color}-50 mb-3`}>
                      <IconComponent className={`text-${plan.color}-600`} size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">{plan.name}</h3>
                    <p className="text-xs text-slate-500 mb-4 leading-relaxed">{plan.description}</p>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-3xl font-bold text-slate-900">${plan.price}</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">/mo</span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <Check className={`text-${plan.color}-600 flex-shrink-0 mt-0.5`} size={14} />
                        <span className="text-xs text-slate-600">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Premium Plan - Coming Soon */}
                  {(plan.name === 'Pro' || plan.name === 'Team') ? (
                    <div className="relative group">
                      <button
                        disabled
                        className="block w-full text-center py-3 rounded-lg font-bold text-[10px] uppercase tracking-widest transition-all bg-slate-200 text-slate-500 cursor-not-allowed"
                      >
                        <span className="inline-flex items-center gap-2">
                          <Lock size={14} />
                          Coming Soon
                        </span>
                      </button>
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-4 py-2 bg-slate-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg">
                        Payment Gateway will be activated soon
                        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-900"></div>
                      </div>
                    </div>
                  ) : (
                    /* Free Plan - Active */
                    <button
                      onClick={() => handlePlanSelection(plan.name.toLowerCase())}
                      disabled={loading && selectedPlan === plan.name.toLowerCase()}
                      className={`block w-full text-center py-3 rounded-lg font-bold text-[10px] uppercase tracking-widest transition-all disabled:opacity-50 disabled:cursor-not-allowed ${plan.popular
                        ? 'bg-slate-900 text-white shadow-lg shadow-slate-200 hover:bg-slate-800'
                        : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
                        } ${user?.plan?.toLowerCase() === plan.name.toLowerCase() ? 'ring-2 ring-sky-500' : ''}`}
                    >
                      {loading && selectedPlan === plan.name.toLowerCase() ? (
                        <span className="inline-flex items-center gap-2">
                          <Loader2 className="animate-spin" size={14} />
                          Updating...
                        </span>
                      ) : user?.plan?.toLowerCase() === plan.name.toLowerCase() ? (
                        'Current Plan'
                      ) : (
                        isLoggedIn ? plan.ctaLoggedIn : plan.ctaLoggedOut
                      )}
                    </button>
                  )}
                </div>
              </FadeIn>
            );
          })}
        </div>

        {/* FAQ or Additional Info */}
        <FadeIn delay={400}>
          <div className="mt-12 text-center">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
              GDPR Compliant & Secure
            </p>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

export default Pricing;