import React, { useState } from 'react';
import { Github, Linkedin, Mail, Send, CheckCircle2, Sparkles, Target, Shield, Globe, ArrowRight } from 'lucide-react';
import FadeIn from '../components/ui/FadeIn';

const About = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Message sent:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  const socialLinks = [
    {
      name: 'GitHub',
      icon: <Github size={18} />,
      href: 'https://github.com/rehodra',
      label: 'rehodra'
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin size={18} />,
      href: 'https://linkedin.com/in/mounasuvra',
      label: 'mounasuvra'
    },
    {
      name: 'Email',
      icon: <Mail size={18} />,
      href: 'mailto:rehodra14@gmail.com',
      label: 'Contact via Email'
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 selection:bg-slate-900 selection:text-white font-sans">
      {/* Subtle Mesh Gradient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] -z-10" />

      <div className="max-w-6xl mx-auto px-6 pt-32 pb-24">
        {/* Modern Header Section */}
        <FadeIn>
          <div className="text-center mb-24">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">System V2.0 Live</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6">
              Empowering the <br />
              <span className="text-slate-500 font-medium">Modern Creator Economy.</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              TubeIntelligence bridges the gap between raw data and creative execution through
              proprietary machine learning and institutional-grade analytics.
            </p>
          </div>
        </FadeIn>

        {/* Core Sections */}
        <div className="grid lg:grid-cols-12 gap-8 mb-24 items-stretch">
          {/* Mission Card */}
          <div className="lg:col-span-8">
            <FadeIn delay={100}>
              <div className="h-full bg-white rounded-2xl border border-slate-200 p-8 md:p-10 shadow-sm">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 bg-slate-900 rounded-lg">
                    <Target className="text-white" size={20} />
                  </div>
                  <h2 className="text-sm font-bold uppercase tracking-widest text-slate-900">Our Core Mission</h2>
                </div>

                <p className="text-xl md:text-2xl text-slate-800 leading-snug font-normal mb-10">
                  TubeIntelligence is an AI-powered analytics platform that helps YouTube creators make smarter content decisions.
                  We analyze your videos and provide actionable insights on titles, thumbnails, CTR predictions, copyright protection,
                  and multi-platform strategies to grow your channel.
                </p>

                <div className="grid sm:grid-cols-2 gap-8 pt-8 border-t border-slate-100">
                  <div className="group">
                    <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                      <Sparkles size={16} className="text-sky-500" />
                      Predictive Analysis
                    </h4>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      Optimize titles and thumbnails pre-publish to maximize the critical 24-hour CTR velocity.
                    </p>
                  </div>
                  <div className="group">
                    <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                      <Shield size={16} className="text-emerald-500" />
                      Asset Protection
                    </h4>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      Advanced copyright detection and policy alignment to secure your digital presence.
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Identity Card */}
          <div className="lg:col-span-4">
            <FadeIn delay={200}>
              <div className="h-full bg-slate-900 rounded-2xl p-8 text-white flex flex-col shadow-xl">
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-8">Developer & Network</h3>
                <div className="space-y-3 mt-auto">
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white hover:text-slate-900 transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        {link.icon}
                        <span className="text-xs font-bold uppercase tracking-tight">{link.name}</span>
                      </div>
                      <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                    </a>
                  ))}
                </div>
                <div className="mt-8 pt-8 border-t border-white/10">
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest leading-relaxed">
                    Built for creators, <br /> by creators.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Contact Module */}
        <FadeIn delay={300}>
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="grid md:grid-cols-2">
              {/* Context Side */}
              <div className="p-10 md:p-14 bg-slate-50 border-r border-slate-200">
                <div className="max-w-xs">
                  <h3 className="text-3xl font-bold text-slate-900 mb-6">Contact Us</h3>
                  <p className="text-slate-600 mb-8 leading-relaxed">
                    Have inquiries regarding enterprise access, partnerships, or technical support?
                    Our team responds to all verified requests within 24 hours.
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-sm font-medium text-slate-500">
                      <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                        <Globe size={14} />
                      </div>
                      Based in Kolkata, India
                    </div>
                    <div className="flex items-center gap-3 text-sm font-medium text-slate-500">
                      <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                        <Mail size={14} />
                      </div>
                      tubeintelligence@gmail.com
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Side */}
              <div className="p-10 md:p-14">
                {submitted ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-10">
                    <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-6 border border-emerald-100">
                      <CheckCircle2 size={32} />
                    </div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Message Sent Successfully</h4>
                    <p className="text-slate-500 text-sm">Your inquiry has been logged in our system. Thank you.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-slate-900/5 focus:border-slate-900 outline-none transition-all text-slate-900 placeholder-slate-400 text-sm"
                          placeholder="e.g. Alex"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-slate-900/5 focus:border-slate-900 outline-none transition-all text-slate-900 placeholder-slate-400 text-sm"
                          placeholder="email@example.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Inquiry Details</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="4"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-slate-900/5 focus:border-slate-900 outline-none transition-all text-slate-900 placeholder-slate-400 text-sm resize-none"
                        placeholder="Please describe your request..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="group relative flex items-center justify-center w-full bg-slate-900 text-white font-bold py-4 px-8 rounded-xl hover:bg-slate-800 hover:translate-y-[-2px] active:translate-y-[0px] transition-all shadow-lg shadow-slate-200 overflow-hidden"
                    >
                      <span className="flex items-center gap-2 uppercase tracking-widest text-[10px]">
                        <Send size={14} />
                        Transmit Message
                      </span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

export default About;
