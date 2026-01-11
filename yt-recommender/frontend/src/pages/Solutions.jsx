import { Sparkles, FileText, TrendingUp, Globe, Shield, Copyright, Lock, Crown, Check } from 'lucide-react';
import FadeIn from '../components/ui/FadeIn';
import { Link } from 'react-router-dom';

const Solutions = () => {
  const freeSolutions = [
    {
      title: "Semantic Title Engine",
      icon: Sparkles,
      desc: "AI-powered title optimization with CTR predictions and channel analysis to improve your video performance."
    },
    {
      title: "Predictive CTR Analysis",
      icon: TrendingUp,
      desc: "Get data-driven predictions on how your titles and thumbnails will perform before publishing."
    },
    {
      title: "Multi-Platform Mastery",
      icon: Globe,
      desc: "Optimize your content strategy across YouTube, TikTok, Instagram, and other platforms."
    },
    {
      title: "Copyright Protection",
      icon: Copyright,
      desc: "Detect potential copyright issues and ensure your content is safe from claims."
    },
    {
      title: "Fair Use Analysis",
      icon: Shield,
      desc: "Comprehensive fair use evaluation to protect your creative work and minimize legal risks."
    },
    {
      title: "Trend Intelligence",
      icon: FileText,
      desc: "Stay ahead with real-time trend analysis and content recommendations based on current market dynamics."
    }
  ];

  const premiumSolutions = [
    {
      title: "Advanced Analytics Dashboard",
      icon: TrendingUp,
      desc: "Deep-dive analytics with custom reports, audience segmentation, and performance tracking across all metrics.",
      badge: "Coming Soon"
    },
    {
      title: "Competitor Intelligence",
      icon: Crown,
      desc: "Track competitor strategies, benchmark your performance, and discover untapped opportunities in your niche.",
      badge: "Coming Soon"
    },
    {
      title: "Revenue Optimization",
      icon: TrendingUp,
      desc: "Maximize monetization with AI-driven ad placement recommendations and sponsorship opportunity detection.",
      badge: "Coming Soon"
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] pt-20 sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-6">
      {/* Subtle Mesh Gradient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <FadeIn>
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm mb-6">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Our Solutions</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-4 sm:mb-6 px-4">
              Engineered for <br />
              <span className="text-slate-500 font-medium">Every Creator Stage.</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed px-4">
              Whether you're just starting out or scaling globally, our AI-powered solutions adapt to your growth trajectory.
            </p>
          </div>
        </FadeIn>

        {/* Free Solutions Section */}
        <FadeIn delay={100}>
          <div className="mb-12 sm:mb-16 lg:mb-20">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-emerald-500 rounded-lg">
                <Check className="text-white" size={20} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Free Solutions</h2>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full">Available Now</span>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {freeSolutions.map((solution, i) => {
                const Icon = solution.icon;
                return (
                  <FadeIn key={i} delay={150 + i * 50}>
                    <div className="group h-full bg-white rounded-xl border border-slate-200 p-6 hover:shadow-xl hover:shadow-emerald-100 hover:border-emerald-300 hover:scale-[1.02] transition-all duration-300 cursor-pointer">
                      <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-emerald-500 group-hover:scale-110 transition-all duration-300">
                        <Icon className="text-emerald-600 group-hover:text-white transition-all duration-300" size={24} />
                      </div>
                      <h3 className="font-bold text-slate-900 mb-2 text-lg group-hover:text-emerald-600 transition-colors duration-300">{solution.title}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors duration-300">{solution.desc}</p>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </FadeIn>

        {/* Premium Solutions Section */}
        <FadeIn delay={400}>
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-slate-900 rounded-lg">
                <Crown className="text-white" size={20} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Premium Solutions</h2>
              <span className="px-3 py-1 bg-amber-50 text-amber-700 text-xs font-bold rounded-full">Pro Plan</span>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {premiumSolutions.map((solution, i) => {
                const Icon = solution.icon;
                return (
                  <FadeIn key={i} delay={450 + i * 50}>
                    <div className="group relative h-full bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl border border-slate-700 p-6 text-white overflow-hidden hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-500/10 hover:scale-[1.02] transition-all duration-300 cursor-pointer">
                      {/* Lock Overlay */}
                      <div className="absolute top-4 right-4">
                        <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm group-hover:bg-amber-500/20 group-hover:scale-110 transition-all duration-300">
                          <Lock className="text-white/60 group-hover:text-amber-300 transition-colors duration-300" size={16} />
                        </div>
                      </div>

                      <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300">
                        <Icon className="text-white group-hover:text-amber-300 transition-colors duration-300" size={24} />
                      </div>
                      <h3 className="font-bold text-white mb-2 text-lg group-hover:text-amber-50 transition-colors duration-300">{solution.title}</h3>
                      <p className="text-sm text-slate-300 leading-relaxed mb-4 group-hover:text-slate-200 transition-colors duration-300">{solution.desc}</p>

                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 text-amber-300 text-xs font-bold rounded-full border border-amber-500/30 group-hover:bg-amber-500/30 group-hover:border-amber-400/50 transition-all duration-300">
                        {solution.badge}
                      </div>
                    </div>
                  </FadeIn>
                );
              })}
            </div>

            {/* CTA Card */}
            <FadeIn delay={600}>
              <div className="bg-white rounded-2xl border border-slate-200 p-8 md:p-12 text-center shadow-sm">
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Ready to Unlock Premium?</h3>
                <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
                  Upgrade to Pro for $19/month and get access to advanced analytics, competitor intelligence,
                  and revenue optimization tools when they launch.
                </p>
                <Link
                  to="/pricing"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all shadow-lg"
                >
                  <Crown size={18} />
                  <span className="uppercase tracking-widest text-xs">View Pricing</span>
                </Link>
              </div>
            </FadeIn>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

export default Solutions;
