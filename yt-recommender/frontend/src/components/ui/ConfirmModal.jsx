import React, { useEffect } from 'react';
import { X, AlertTriangle, Info, AlertCircle, ArrowRight } from 'lucide-react';

const ConfirmModal = ({
    isOpen,
    onClose,
    onConfirm,
    title = "Confirm Action",
    message = "Are you sure you want to proceed with this request?",
    confirmText = "Proceed",
    cancelText = "Dismiss",
    variant = "danger" // danger, warning, info
}) => {
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.addEventListener('keydown', handleEscape);
        }
        
        return () => {
            document.body.style.overflow = 'unset';
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const variantStyles = {
        danger: {
            icon: <AlertCircle size={20} />,
            accent: 'bg-red-50 text-red-600 border-red-100',
            button: 'bg-red-600 hover:bg-red-700 shadow-red-100',
            indicator: 'bg-red-600'
        },
        warning: {
            icon: <AlertTriangle size={20} />,
            accent: 'bg-amber-50 text-amber-600 border-amber-100',
            button: 'bg-amber-600 hover:bg-amber-700 shadow-amber-100',
            indicator: 'bg-amber-600'
        },
        info: {
            icon: <Info size={20} />,
            accent: 'bg-slate-50 text-slate-600 border-slate-100',
            button: 'bg-slate-900 hover:bg-slate-800 shadow-slate-100',
            indicator: 'bg-slate-900'
        }
    };

    const theme = variantStyles[variant] || variantStyles.danger;

    return (
        <div className="fixed bottom-0 inset-0 z-[100] flex items-center justify-center p-6 sm:p-4">
            {/* Backdrop with refined blur */}
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity animate-in fade-in duration-300"
                onClick={onClose}
            ></div>

            {/* Modal Container */}
            <div className="relative bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-200 max-w-md w-full overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
                <div className="p-8">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                        <div className={`p-3 rounded-xl border ${theme.accent} flex items-center justify-center`}>
                            {theme.icon}
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all"
                            aria-label="Close modal"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="space-y-3 mb-8">
                        <h3 className="text-xl font-bold text-slate-900 tracking-tight leading-tight">
                            {title}
                        </h3>
                        <p className="text-slate-500 text-sm leading-relaxed">
                            {message}
                        </p>
                    </div>

                    {/* Actions Area */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        <button
                            onClick={onClose}
                            className="flex-1 order-2 sm:order-1 px-5 py-3.5 bg-white border border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all"
                        >
                            {cancelText}
                        </button>
                        <button
                            onClick={() => {
                                onConfirm();
                                onClose();
                            }}
                            className={`flex-1 order-1 sm:order-2 px-5 py-3.5 ${theme.button} text-white text-xs font-bold uppercase tracking-widest rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 group`}
                        >
                            {confirmText}
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ConfirmModal;