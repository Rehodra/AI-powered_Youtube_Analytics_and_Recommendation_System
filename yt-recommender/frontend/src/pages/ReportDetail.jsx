import { useParams, useNavigate, Link } from 'react-router-dom';
import { useReports } from '../context/ReportsContext';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

import {
    ArrowLeft,
    Calendar,
    Mail,
    ExternalLink,
    CheckCircle2,
    AlertTriangle,
    Target,
    BarChart3,
    Globe,
    Shield,
    Scale,
    TrendingUp,
    Download,
    Loader2,
    Printer,
    Lock,
    Zap
} from 'lucide-react';
import FadeIn from '../components/ui/FadeIn';

// Parse text with **bold** formatting
const parseFormattedText = (text) => {
    if (!text || typeof text !== 'string') return text;

    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            const boldText = part.slice(2, -2);
            return <strong key={index} className="font-bold text-slate-900">{boldText}</strong>;
        }
        return part;
    });
};

const ReportDetail = () => {
    const { id } = useParams();
    const { getReport } = useReports();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [generatingPDF, setGeneratingPDF] = useState(false);

    const report = getReport(id);

    // Check if user is premium
    const isPremiumUser = user?.plan && user.plan.toLowerCase() !== 'free';

    // Define dummy premium services for upsell
    const dummyPremiumServices = [
        {
            key: 'advanced_analytics',
            name: 'Advanced Analytics Dashboard',
            icon: BarChart3,
            color: 'violet',
            description: 'Deep-dive metrics, audience retention analysis, and performance forecasting'
        },
        {
            key: 'competitor_intelligence',
            name: 'Competitor Intelligence',
            icon: Target,
            color: 'cyan',
            description: 'Track competitors, benchmark performance, and identify content gaps'
        },
        {
            key: 'revenue_optimization',
            name: 'Revenue Optimization',
            icon: TrendingUp,
            color: 'emerald',
            description: 'Monetization strategies, sponsorship opportunities, and revenue projections'
        }
    ];

    const handleSavePDF = () => {
        setGeneratingPDF(true);
        // Add temporary print styles to hide UI elements
        const style = document.createElement('style');
        style.id = 'print-styles';
        style.textContent = `
        @media print {
            body * { visibility: hidden; }
            #report-content, #report-content * { visibility: visible; }
            button, .no-print { display: none !important; }
        }
    `;
        document.head.appendChild(style);
        // Trigger the browser print dialog (user can choose "Save as PDF")
        setTimeout(() => {
            window.print();
            // Cleanup after print dialog closes
            setTimeout(() => {
                document.getElementById('print-styles')?.remove();
                setGeneratingPDF(false);
            }, 500);
        }, 100);
    };

    if (!report) {
        return (
            <div className="min-h-screen bg-slate-50 pt-32 px-6">
                <div className="max-w-md mx-auto text-center bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
                    <h2 className="text-xl font-bold text-slate-900 mb-4">Report Not Found</h2>
                    <button
                        onClick={() => navigate('/reports')}
                        className="bg-slate-900 text-white font-bold py-2.5 px-6 rounded-lg text-xs uppercase tracking-widest hover:bg-slate-800 transition-all"
                    >
                        Back to Reports History
                    </button>
                </div>
            </div>
        );
    }

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const allServiceDetails = report.aiReport?.services || {};

    const serviceNames = {
        semantic_title_engine: { name: 'Semantic Title Engine', icon: Target, color: 'sky' },
        predictive_ctr_analysis: { name: 'Predictive CTR Analysis', icon: BarChart3, color: 'purple' },
        multi_platform_mastery: { name: 'Multi-Platform Mastery', icon: Globe, color: 'indigo' },
        copyright_protection: { name: 'Copyright Protection', icon: Shield, color: 'emerald' },
        fair_use_analysis: { name: 'Fair Use Analysis', icon: Scale, color: 'amber' },
        trend_intelligence: { name: 'Trend Intelligence', icon: TrendingUp, color: 'rose' }
    };

    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-16 px-4 md:px-6">
            <div className="max-w-4xl mx-auto" id="report-content">
                {/* Header */}
                <FadeIn delay={0}>
                    <button
                        onClick={() => navigate('/reports')}
                        className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-900 mb-6 text-[10px] font-bold uppercase tracking-[0.2em] transition-colors"
                    >
                        <ArrowLeft size={14} />
                        <span>Return to Dashboard</span>
                    </button>

                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mb-6">
                        <div className="flex flex-col gap-4">
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${report.status === 'completed'
                                        ? 'bg-emerald-100 text-emerald-800'
                                        : 'bg-amber-100 text-amber-800'
                                        }`}>
                                        {report.status}
                                    </span>
                                </div>
                                <h1 className="text-2xl font-bold text-slate-900 mb-2 tracking-tight">
                                    {report.channelName || 'Channel Analysis'}
                                </h1>
                                <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-400 font-medium">
                                    <div className="flex items-center gap-2">
                                        <Calendar size={14} />
                                        <span>{formatDate(report.timestamp)}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Mail size={14} />
                                        <span>{report.email}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {report.channelId && (
                            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                                <a
                                    href={`https://youtube.com/channel/${report.channelId}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 text-sky-600 hover:underline font-bold text-[10px] uppercase tracking-widest transition-colors"
                                >
                                    Visit YouTube Channel
                                    <ExternalLink size={12} />
                                </a>
                                <button
                                    onClick={handleSavePDF}
                                    disabled={generatingPDF}
                                    className="inline-flex items-center gap-2 px-4 py-2 mr-2 bg-slate-900 text-white text-[11px] font-bold uppercase tracking-widest rounded-lg hover:bg-slate-800 disabled:opacity-50 transition-all shadow-md"
                                >
                                    {generatingPDF ? (
                                        <>
                                            <Loader2 className="animate-spin" size={14} />
                                            Generating...
                                        </>
                                    ) : (
                                        <>
                                            <Printer size={20} />
                                            Print
                                        </>
                                    )}
                                </button>
                            </div>
                        )}
                    </div>
                </FadeIn>

                {/* AI Analysis Results */}
                {Object.keys(allServiceDetails).length === 0 ? (
                    <FadeIn delay={100}>
                        <div className="bg-white rounded-xl border border-slate-200 p-10 text-center shadow-sm">
                            <div className="inline-flex items-center justify-center p-3 bg-amber-50 rounded-full mb-4">
                                <AlertTriangle className="text-amber-600" size={24} />
                            </div>
                            <h3 className="text-sm font-bold text-slate-900 mb-2 uppercase tracking-tight">No Insights Generated</h3>
                            <p className="text-xs text-slate-500 leading-relaxed">The system failed to generate intelligence data for this request.</p>
                        </div>
                    </FadeIn>
                ) : (
                    <div className="space-y-4">
                        {/* All Real AI Services - Show to everyone */}
                        {Object.entries(allServiceDetails).map(([serviceKey, serviceData], index) => {
                            const meta = serviceNames[serviceKey] || { name: serviceKey, icon: Target, color: 'slate' };
                            const IconComponent = meta.icon;

                            return (
                                <FadeIn key={serviceKey} delay={index * 50}>
                                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                                        <div className="p-4 border-b border-slate-100 flex items-center gap-3">
                                            <div className={`p-1.5 rounded-lg bg-${meta.color}-50 text-${meta.color}-600`}>
                                                <IconComponent size={18} />
                                            </div>
                                            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">{meta.name}</h2>
                                        </div>

                                        <div className="p-5 md:p-6">
                                            {/* Render service-specific content */}
                                            {serviceData ? renderServiceContent(serviceKey, serviceData) : (
                                                <p className="text-xs text-slate-500">No data available for this service.</p>
                                            )}
                                        </div>
                                    </div>
                                </FadeIn>
                            );
                        })}

                        {/* Dummy Premium Services - Show only for Free Users */}
                        {!isPremiumUser && (
                            <FadeIn delay={Object.keys(allServiceDetails).length * 50}>
                                <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl border border-slate-700 shadow-lg overflow-hidden">
                                    <div className="p-6 md:p-8 text-center">
                                        <div className="inline-flex items-center justify-center p-3 bg-sky-500/20 rounded-full mb-4">
                                            <Lock className="text-sky-400" size={28} />
                                        </div>
                                        <h3 className="text-lg font-bold text-white mb-2">Premium Intelligence Locked</h3>
                                        <p className="text-sm text-slate-300 mb-6 max-w-md mx-auto leading-relaxed">
                                            Unlock {dummyPremiumServices.length} advanced AI services including analytics dashboards, competitor tracking, and revenue optimization.
                                        </p>

                                        {/* Locked Premium Services Grid */}
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6 max-w-2xl mx-auto">
                                            {dummyPremiumServices.map((service) => {
                                                const IconComponent = service.icon;
                                                return (
                                                    <div key={service.key} className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50 text-left">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <IconComponent size={16} className="text-slate-400" />
                                                            <Lock size={12} className="text-slate-500" />
                                                        </div>
                                                        <p className="text-xs font-bold text-slate-200 mb-1">{service.name}</p>
                                                        <p className="text-[10px] text-slate-400 leading-relaxed">{service.description}</p>
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        <Link
                                            to="/pricing"
                                            className="inline-flex items-center gap-2 bg-gradient-to-r from-sky-500 to-sky-600 text-white font-bold py-3 px-8 rounded-lg text-sm uppercase tracking-widest hover:from-sky-600 hover:to-sky-700 transition-all shadow-lg shadow-sky-500/20"
                                        >
                                            <Zap size={16} />
                                            Upgrade to Pro
                                        </Link>
                                        <p className="text-xs text-slate-400 mt-4">
                                            Starting at <span className="font-bold text-white">$19/month</span> • Unlimited analyses
                                        </p>
                                    </div>
                                </div>
                            </FadeIn>
                        )}
                    </div>
                )}
            </div>
        </div >
    );
};

// Helper function to render service-specific content
const renderServiceContent = (serviceKey, data) => {
    // Debug logging to see exact data structure
    console.log(`=== Rendering ${serviceKey} ===`);
    console.log('Full data object:', data);

    if (serviceKey === 'semantic_title_engine') {
        console.log('channel_analysis:', data.channel_analysis);
        console.log('suggestions:', data.suggestions);
        console.log('growth_tips:', data.growth_tips);
    }

    if (serviceKey === 'predictive_ctr_analysis') {
        console.log('estimated_overall_channel_ctr:', data.estimated_overall_channel_ctr);
        console.log('what_is_working_or_missing:', data.what_is_working_or_missing);
        console.log('working type:', typeof data.what_is_working_or_missing?.working);
        console.log('working is array?:', Array.isArray(data.what_is_working_or_missing?.working));
    }

    switch (serviceKey) {
        case 'semantic_title_engine':
            return (
                <div className="space-y-6">
                    {/* Channel Analysis */}
                    {data.channel_analysis?.overall_assessment && (
                        <div>
                            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-3">Channel Analysis</h3>
                            <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                                <p className="text-slate-700 text-xs leading-relaxed">{data.channel_analysis.overall_assessment}</p>
                            </div>
                        </div>
                    )}

                    {/* Video Title Optimization */}
                    {data.suggestions && data.suggestions.length > 0 && (
                        <div>
                            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Title Optimization</h3>
                            <div className="grid gap-4">
                                {data.suggestions.map((video, idx) => (
                                    <div key={idx} className="border border-slate-100 rounded-lg p-4 bg-white hover:border-sky-100 transition-colors">
                                        <div className="flex items-start gap-3 mb-3">
                                            <div className="flex-shrink-0 w-6 h-6 rounded bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600">
                                                {idx + 1}
                                            </div>
                                            <h4 className="text-xs font-bold text-slate-900 leading-tight">
                                                {video.original_title}
                                            </h4>
                                        </div>

                                        <div className="pl-9 space-y-4">
                                            {/* Current Issues */}
                                            {video.current_issues && video.current_issues.length > 0 && (
                                                <div>
                                                    <p className="text-[9px] font-bold text-rose-600 uppercase tracking-widest mb-1.5 ml-1">Friction Points</p>
                                                    <ul className="space-y-1">
                                                        {video.current_issues.map((issue, i) => (
                                                            <li key={i} className="text-[11px] text-slate-600 flex items-start gap-2">
                                                                <span className="w-1 h-1 rounded-full bg-rose-400 mt-1.5 flex-shrink-0"></span>
                                                                {issue}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}

                                            {/* Alternative Titles */}
                                            {video.alternative_titles && video.alternative_titles.length > 0 && (
                                                <div>
                                                    <p className="text-[9px] font-bold text-sky-600 uppercase tracking-widest mb-2 ml-1">Recommended Variants</p>
                                                    <div className="grid gap-2">
                                                        {video.alternative_titles.map((alt, i) => (
                                                            <div key={i} className="bg-sky-50/30 rounded-lg p-3 border border-sky-100/50">
                                                                <div className="font-bold text-slate-900 text-xs mb-1.5">
                                                                    "{alt.new_suggested_title}"
                                                                </div>
                                                                <div className="flex flex-col gap-1.5 text-[11px]">
                                                                    {alt.ctr_potential_rating && (
                                                                        <span className="inline-flex items-center gap-1 text-sky-700 font-bold uppercase tracking-tight">
                                                                            <BarChart3 size={10} />
                                                                            CTR Index: {alt.ctr_potential_rating}/10
                                                                        </span>
                                                                    )}
                                                                    {alt.why_it_s_effective && (
                                                                        <span className="text-slate-600 leading-relaxed">
                                                                            <span className="font-semibold text-slate-700">Why it works:</span> {alt.why_it_s_effective}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Growth Tips */}
                    {data.growth_tips && data.growth_tips.length > 0 && (
                        <div>
                            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-3">Growth Tips</h3>
                            <div className="bg-gradient-to-br from-sky-50 to-indigo-50 rounded-lg p-4 border border-sky-100">
                                <ul className="space-y-2">
                                    {data.growth_tips.map((tip, i) => (
                                        <li key={i} className="text-xs text-slate-700 flex items-start gap-2">
                                            <span className="text-sky-600 font-bold flex-shrink-0">•</span>
                                            <span className="leading-relaxed">{parseFormattedText(tip)}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            );

        case 'predictive_ctr_analysis':
            return (
                <div className="space-y-6">
                    {/* CTR Score Display */}
                    {data.score !== undefined && (
                        <div className="bg-purple-50 rounded-lg p-5 border border-purple-100">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h4 className="text-[10px] font-bold text-purple-900/60 uppercase tracking-widest mb-2">Current CTR Score</h4>
                                    <div className="text-3xl font-bold text-purple-600">{data.score}<span className="text-lg text-purple-400">/10</span></div>
                                </div>
                                {data.potential_increase && (
                                    <div className="text-right">
                                        <p className="text-[9px] font-bold text-purple-900/60 uppercase tracking-widest mb-1">Potential Increase</p>
                                        <div className="text-xl font-bold text-emerald-600">+{data.potential_increase}</div>
                                    </div>
                                )}
                            </div>
                            {data.reasoning && (
                                <p className="text-xs text-slate-700 leading-relaxed mb-3">{data.reasoning}</p>
                            )}
                            {data.comparison_to_industry_average && (
                                <div className="mt-3 pt-3 border-t border-purple-200">
                                    <p className="text-[9px] font-bold text-purple-900/60 uppercase tracking-widest mb-1.5">Industry Comparison</p>
                                    <p className="text-xs text-slate-600 leading-relaxed">{data.comparison_to_industry_average}</p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* What's Working / Missing */}
                    {data.what_is_working_or_missing && (
                        <div className="grid md:grid-cols-2 gap-4">
                            {data.what_is_working_or_missing.working && (
                                <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
                                    <p className="text-[9px] font-bold text-emerald-800 uppercase tracking-widest mb-3">What's Working</p>
                                    <div className="flex gap-2 text-xs text-emerald-900 leading-relaxed">
                                        <CheckCircle2 size={14} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                                        <span>{data.what_is_working_or_missing.working}</span>
                                    </div>
                                </div>
                            )}
                            {data.what_is_working_or_missing.missing && (
                                <div className="bg-rose-50 rounded-lg p-4 border border-rose-100">
                                    <p className="text-[9px] font-bold text-rose-800 uppercase tracking-widest mb-3">What's Missing</p>
                                    <div className="flex gap-2 text-xs text-rose-900 leading-relaxed">
                                        <AlertTriangle size={14} className="text-rose-600 flex-shrink-0 mt-0.5" />
                                        <span>{data.what_is_working_or_missing.missing}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Recommendations */}
                    {data.recommendations && data.recommendations.length > 0 && (
                        <div>
                            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-3">Optimization Recommendations</h3>
                            <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                                <ul className="divide-y divide-slate-100">
                                    {data.recommendations.map((rec, i) => (
                                        <li key={i} className="p-4 hover:bg-slate-50 transition-colors">
                                            <div className="flex gap-3">
                                                <CheckCircle2 size={16} className="text-purple-600 flex-shrink-0 mt-0.5" />
                                                <p className="text-slate-900 text-xs leading-relaxed">{parseFormattedText(rec)}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}

                    {/* Psychological Triggers */}
                    {data.psychological_triggers_to_boost_engagement && data.psychological_triggers_to_boost_engagement.length > 0 && (
                        <div>
                            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-3">Psychological Triggers</h3>
                            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg p-4 border border-purple-100">
                                <ul className="space-y-2">
                                    {data.psychological_triggers_to_boost_engagement.map((trigger, i) => (
                                        <li key={i} className="text-xs text-slate-700 flex items-start gap-2">
                                            <span className="text-purple-600 font-bold flex-shrink-0">•</span>
                                            <span className="leading-relaxed">{parseFormattedText(trigger)}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            );

        case 'multi_platform_mastery':
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {data.platforms && Object.entries(data.platforms).map(([platform, platformData]) => (
                        <div key={platform} className="bg-white border border-slate-200 rounded-lg p-4 hover:border-indigo-200 transition-colors">
                            <div className="flex items-center justify-between mb-3">
                                <h4 className="font-bold text-slate-900 capitalize text-sm">
                                    {platform.replace('_', ' ').replace('x twitter', 'X (Twitter)')}
                                </h4>
                                {platformData.score && (
                                    <span className="px-1.5 py-0.5 bg-indigo-50 text-indigo-700 text-[10px] font-bold rounded border border-indigo-100">
                                        SCORE: {platformData.score}/10
                                    </span>
                                )}
                            </div>

                            <div className="space-y-3">
                                {platformData.reasoning && (
                                    <div>
                                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Analysis</p>
                                        <p className="text-[11px] text-slate-600 leading-relaxed">{platformData.reasoning}</p>
                                    </div>
                                )}
                                {platformData.strategy && (
                                    <div>
                                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Ecosystem Strategy</p>
                                        <p className="text-[11px] text-slate-600 leading-relaxed">{platformData.strategy}</p>
                                    </div>
                                )}
                                {platformData.optimization_tips && platformData.optimization_tips.length > 0 && (
                                    <div>
                                        <p className="text-[9px] font-bold text-indigo-600 uppercase tracking-widest mb-2">Optimization Tips</p>
                                        <ul className="space-y-1.5">
                                            {platformData.optimization_tips.map((tip, i) => (
                                                <li key={i} className="text-[11px] text-slate-600 flex items-start gap-2">
                                                    <span className="w-1 h-1 rounded-full bg-indigo-400 mt-1.5 flex-shrink-0"></span>
                                                    {tip}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            );

        case 'copyright_protection':
            return (
                <div className="space-y-4">
                    <div className={`rounded-xl p-4 border ${data.risk_level?.toLowerCase() === 'low' ? 'bg-emerald-50 border-emerald-100' :
                        data.risk_level?.toLowerCase() === 'medium' ? 'bg-amber-50 border-amber-100' :
                            'bg-rose-50 border-rose-100'
                        }`}>
                        <div className="flex items-center gap-3 mb-3">
                            <Shield size={20} className={
                                data.risk_level?.toLowerCase() === 'low' ? 'text-emerald-600' :
                                    data.risk_level?.toLowerCase() === 'medium' ? 'text-amber-600' : 'text-rose-600'
                            } />
                            <div>
                                <h4 className={`text-xs font-bold uppercase ${data.risk_level?.toLowerCase() === 'low' ? 'text-emerald-800' :
                                    data.risk_level?.toLowerCase() === 'medium' ? 'text-amber-800' : 'text-rose-800'
                                    }`}>Assessment: {data.risk_level} Risk</h4>
                            </div>
                        </div>
                        {data.reasoning && (
                            <p className="text-xs text-slate-700 leading-relaxed">{data.reasoning}</p>
                        )}
                    </div>

                    {data.flags && data.flags.length > 0 && (
                        <div className="bg-amber-50 rounded-xl border border-amber-100 p-4">
                            <p className="text-[9px] font-bold text-amber-800 uppercase tracking-widest mb-3">Detected Flags</p>
                            <ul className="space-y-2">
                                {data.flags.map((flag, i) => (
                                    <li key={i} className="flex gap-2 text-[11px] text-amber-900">
                                        <AlertTriangle size={14} className="text-amber-600 flex-shrink-0" />
                                        <span>{flag}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {data.assessment && (
                        <div className="bg-slate-50 rounded-xl border border-slate-200 p-4">
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">Detailed Assessment</p>
                            <p className="text-xs text-slate-700 leading-relaxed">{data.assessment}</p>
                        </div>
                    )}

                    {data.recommendations && Array.isArray(data.recommendations) && data.recommendations.length > 0 && (
                        <div className="bg-white rounded-xl border border-slate-200 p-4">
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-3">Compliance Measures</p>
                            <ul className="space-y-2">
                                {data.recommendations.map((rec, i) => (
                                    <li key={i} className="flex gap-2 text-[11px] text-slate-600">
                                        <CheckCircle2 size={14} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                                        <span>{rec}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            );

        case 'fair_use_analysis':
            return (
                <div className="space-y-6">
                    {data.transformativeness_score !== undefined && (
                        <div className="bg-amber-50/50 rounded-xl p-4 border border-amber-100 flex items-center justify-between">
                            <div className="flex-1">
                                <h4 className="text-[10px] font-bold text-amber-900/60 uppercase tracking-widest mb-2">Fair Use Score</h4>
                                {data.reasoning && (
                                    <p className="text-xs text-amber-800 font-medium leading-relaxed">{data.reasoning}</p>
                                )}
                            </div>
                            <div className="flex flex-col items-center justify-center p-3 bg-white rounded-xl border border-amber-100 shadow-sm min-w-[80px]">
                                <span className="text-2xl font-bold text-amber-600">{data.transformativeness_score}</span>
                                <span className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">/ 100</span>
                            </div>
                        </div>
                    )}

                    {data.assessment && (
                        <div className="bg-white rounded-xl border border-slate-200 p-4">
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">Assessment</p>
                            <p className="text-xs text-slate-700 leading-relaxed">{data.assessment}</p>
                        </div>
                    )}

                    {data.fair_use_factors && (
                        <div>
                            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Factor Attribution</h3>
                            <div className="grid gap-3">
                                {Object.entries(data.fair_use_factors).map(([factor, factorData]) => (
                                    <div key={factor} className="bg-white border border-slate-200 rounded-xl p-4 hover:border-amber-100 transition-colors">
                                        <div className="flex items-start justify-between mb-2">
                                            <h4 className="text-[11px] font-bold text-slate-900 capitalize tracking-tight leading-tight">
                                                {factor.replace(/_/g, ' ')}
                                            </h4>
                                            {factorData.score !== undefined && (
                                                <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-100">
                                                    {factorData.score}/25
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-[11px] text-slate-500 leading-relaxed italic">
                                            {parseFormattedText(factorData.description || factorData.reasoning)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {data.recommendation_for_legal_safety && (
                        <div className="bg-emerald-50 rounded-xl border border-emerald-100 p-4">
                            <p className="text-[9px] font-bold text-emerald-800 uppercase tracking-widest mb-3">Legal Safety Recommendations</p>
                            <div className="flex gap-2 text-xs text-emerald-900 leading-relaxed">
                                <CheckCircle2 size={14} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                                <span>{data.recommendation_for_legal_safety}</span>
                            </div>
                        </div>
                    )}
                </div>
            );

        case 'trend_intelligence':
            return (
                <div className="space-y-6">
                    {data.trending_topics && data.trending_topics.length > 0 && (
                        <div>
                            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Market Velocity Index</h3>
                            <div className="grid gap-4">
                                {data.trending_topics.map((topic, i) => (
                                    <div key={i} className="bg-white border border-slate-200 rounded-xl p-5 hover:border-rose-100 transition-all hover:shadow-sm">
                                        <div className="flex items-start justify-between mb-3 gap-4">
                                            <h4 className="text-sm font-bold text-slate-900 leading-snug">
                                                {topic.name}
                                            </h4>
                                            <div className="flex gap-2 flex-shrink-0">
                                                {topic.growth_percentage && (
                                                    <span className="flex items-center gap-1 px-2 py-1 bg-rose-50 text-rose-600 text-[10px] font-bold rounded-lg border border-rose-100">
                                                        <TrendingUp size={12} />
                                                        {topic.growth_percentage}
                                                    </span>
                                                )}
                                                {topic.relevance_rating && (
                                                    <span className="px-2 py-1 bg-slate-900 text-white text-[10px] font-bold rounded-lg uppercase tracking-tight">
                                                        REL: {topic.relevance_rating}/10
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <p className="text-[11px] text-slate-500 leading-relaxed">
                                            {parseFormattedText(topic.reasoning)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {data.predictions && data.predictions.length > 0 && (
                        <div>
                            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Predictive Insights</h3>
                            <div className="bg-indigo-50/50 rounded-xl border border-indigo-100 p-4">
                                <ul className="space-y-2">
                                    {data.predictions.map((prediction, i) => (
                                        <li key={i} className="flex gap-2 text-[11px] text-indigo-900">
                                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 flex-shrink-0"></span>
                                            <span className="leading-relaxed">{prediction}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}

                    {data.actionable_content_ideas && data.actionable_content_ideas.length > 0 && (
                        <div>
                            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Actionable Content Ideas</h3>
                            <div className="grid gap-3">
                                {data.actionable_content_ideas.map((idea, i) => (
                                    <div key={i} className="bg-white border border-slate-200 rounded-lg p-4 hover:border-rose-100 transition-colors">
                                        <div className="flex gap-3">
                                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-rose-100 flex items-center justify-center text-[10px] font-bold text-rose-600">
                                                {i + 1}
                                            </div>
                                            <p className="text-xs text-slate-700 leading-relaxed">{parseFormattedText(idea)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            );

        default:
            return (
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-100 font-mono text-[10px] text-slate-500 overflow-auto max-h-64">
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                </div>
            );
    }
};

export default ReportDetail;
