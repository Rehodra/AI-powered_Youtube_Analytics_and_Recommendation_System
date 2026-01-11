import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReports } from '../context/ReportsContext';
import {
    FileText,
    Trash2,
    Eye,
    Calendar,
    Mail,
    Sparkles,
    BarChart3,
    Search
} from 'lucide-react';
import FadeIn from '../components/ui/FadeIn';
import ConfirmModal from '../components/ui/ConfirmModal';

const Reports = () => {
    const { reports, deleteReport, clearAllReports } = useReports();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [confirmModal, setConfirmModal] = useState({ isOpen: false, type: null, reportId: null, channelName: '' });

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const getServiceCount = (report) => {
        if (!report.aiReport || !report.aiReport.services) return 0;
        return Object.keys(report.aiReport.services).length;
    };

    const filteredReports = reports.filter(report =>
        report.channelName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-16 px-6 lg:px-12">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <FadeIn delay={0}>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900 tracking-tight mb-1">
                                Analysis Reports
                            </h1>
                            <p className="text-sm text-slate-500">
                                Manage and view your channel intelligence reports.
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => navigate('/audit')}
                                className="bg-slate-900 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-slate-800 transition-all shadow-sm flex items-center gap-2"
                            >
                                <BarChart3 size={16} />
                                New Audit
                            </button>
                        </div>
                    </div>

                    {/* Stats Bar */}
                    {reports.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Total Reports</div>
                                <div className="text-2xl font-bold text-slate-900">{reports.length}</div>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Services Analyzed</div>
                                <div className="text-2xl font-bold text-sky-600">
                                    {reports.reduce((acc, r) => acc + getServiceCount(r), 0)}
                                </div>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Success Rate</div>
                                <div className="text-2xl font-bold text-emerald-600">
                                    {reports.length > 0 ? Math.round((reports.filter(r => r.status === 'completed').length / reports.length) * 100) : 0}%
                                </div>
                            </div>
                        </div>
                    )}
                </FadeIn>

                {/* Filters */}
                {reports.length > 0 && (
                    <div className="mb-6 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input
                            type="text"
                            placeholder="Filter reports by channel or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 transition-all shadow-sm"
                        />
                    </div>
                )}

                {/* Reports List */}
                {reports.length === 0 ? (
                    <FadeIn delay={100}>
                        <div className="bg-white rounded-xl border border-slate-200 p-10 text-center shadow-sm">
                            <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <FileText className="text-slate-300" size={24} />
                            </div>
                            <h3 className="text-base font-bold text-slate-900 mb-2">Initialize History</h3>
                            <p className="text-xs text-slate-500 mb-6 max-w-xs mx-auto leading-relaxed">
                                No intelligence data detected. Run your first channel audit to populate this dashboard.
                            </p>
                            <button
                                onClick={() => navigate('/audit')}
                                className="text-xs font-bold text-sky-600 hover:text-sky-700 uppercase tracking-widest"
                            >
                                Start New Audit
                            </button>
                        </div>
                    </FadeIn>
                ) : (
                    <div className="space-y-3">
                        {filteredReports.map((report, index) => (
                            <FadeIn key={report.id} delay={index * 30}>
                                <div
                                    onClick={() => navigate(`/reports/${report.id}`)}
                                    className="group bg-white rounded-lg border border-slate-200 p-4 hover:border-sky-300 hover:shadow-sm transition-all cursor-pointer flex flex-col md:flex-row items-start md:items-center gap-4"
                                >
                                    {/* Icon */}
                                    <div className="hidden md:flex flex-shrink-0 w-10 h-10 bg-slate-50 rounded-lg items-center justify-center border border-slate-100 group-hover:bg-sky-50 group-hover:border-sky-100 transition-colors">
                                        <FileText className="text-slate-400 group-hover:text-sky-600 transition-colors" size={20} />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-3 mb-1">
                                            <h3 className="text-sm font-bold text-slate-900 truncate">
                                                {report.channelName || 'Channel Analysis'}
                                            </h3>
                                            <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wide border ${report.status === 'completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                                report.status === 'failed' ? 'bg-red-50 text-red-700 border-red-100' :
                                                    'bg-amber-50 text-amber-700 border-amber-100'
                                                }`}>
                                                {report.status}
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400 font-medium">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar size={12} />
                                                <span>{formatDate(report.timestamp)}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Mail size={12} />
                                                <span className="truncate max-w-[120px]">{report.email}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Sparkles size={12} />
                                                <span>{getServiceCount(report)} Services</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-2 self-end md:self-center opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                navigate(`/reports/${report.id}`);
                                            }}
                                            className="p-1.5 text-slate-400 hover:text-sky-600 hover:bg-sky-50 rounded-md transition-colors"
                                        >
                                            <Eye size={16} />
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setConfirmModal({
                                                    isOpen: true,
                                                    type: 'single',
                                                    reportId: report.id,
                                                    channelName: report.channelName || 'Channel Analysis'
                                                });
                                            }}
                                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                )}

                {reports.length > 0 && (
                    <div className="mt-8 text-center border-t border-slate-100 pt-6">
                        <button
                            onClick={() => setConfirmModal({ isOpen: true, type: 'all', reportId: null })}
                            className="px-4 py-2 bg-red-500/10 text-red-600 hover:bg-red-500/20 border border-red-200 rounded-lg text-[10px] font-bold transition-all uppercase tracking-[0.2em]"
                        >
                            Clear Report History
                        </button>
                    </div>
                )}

                {/* Confirm Modal */}
                <ConfirmModal
                    isOpen={confirmModal.isOpen}
                    onClose={() => setConfirmModal({ isOpen: false, type: null, reportId: null, channelName: '' })}
                    onConfirm={() => {
                        if (confirmModal.type === 'single') {
                            deleteReport(confirmModal.reportId);
                        } else if (confirmModal.type === 'all') {
                            clearAllReports();
                        }
                    }}
                    title={confirmModal.type === 'all' ? 'Clear All Reports?' : 'Delete Report?'}
                    message={confirmModal.type === 'all'
                        ? 'This will permanently delete all your analysis reports. This action cannot be undone.'
                        : `This will permanently delete the report for "${confirmModal.channelName}". This action cannot be undone.`
                    }
                    confirmText="Delete"
                    cancelText="Cancel"
                    variant="danger"
                />
            </div>
        </div>
    );
};

export default Reports;
