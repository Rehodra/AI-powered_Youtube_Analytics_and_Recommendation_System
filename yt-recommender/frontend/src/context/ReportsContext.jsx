import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const ReportsContext = createContext();

export const useReports = () => {
    const context = useContext(ReportsContext);
    if (!context) {
        throw new Error('useReports must be used within ReportsProvider');
    }
    return context;
};

export const ReportsProvider = ({ children }) => {
    const { user } = useAuth();
    const [reports, setReports] = useState([]);

    // Load reports for current user with migration from old storage
    useEffect(() => {
        if (user?.user_id) {
            const storageKey = `reports_${user.user_id}`;
            console.log('[ReportsContext] Loading reports for user:', user.user_id);
            const savedReports = localStorage.getItem(storageKey);

            if (savedReports) {
                try {
                    const parsed = JSON.parse(savedReports);
                    console.log('[ReportsContext] Loaded reports:', parsed.length);
                    setReports(parsed);
                } catch (error) {
                    console.error('Failed to parse reports:', error);
                    setReports([]);
                }
            } else {
                // Migration: Check for old reports without user_id prefix
                const oldReports = localStorage.getItem('reports');
                if (oldReports) {
                    try {
                        const parsedOldReports = JSON.parse(oldReports);
                        console.log('[ReportsContext] Migrating old reports:', parsedOldReports.length);
                        setReports(parsedOldReports);
                        // Save to new user-specific key
                        localStorage.setItem(storageKey, oldReports);
                        // Remove old key
                        localStorage.removeItem('reports');
                        console.log('Migrated old reports to user-specific storage');
                    } catch (error) {
                        console.error('Failed to migrate old reports:', error);
                        setReports([]);
                    }
                } else {
                    console.log('[ReportsContext] No reports found for user');
                    setReports([]);
                }
            }
        } else {
            console.log('[ReportsContext] No user logged in, clearing reports');
            setReports([]);
        }
    }, [user?.user_id]);

    // Save reports to localStorage whenever they change
    useEffect(() => {
        if (user?.user_id && reports.length >= 0) {
            const storageKey = `reports_${user.user_id}`;
            console.log('[ReportsContext] Saving reports:', reports.length, 'for user:', user.user_id);
            localStorage.setItem(storageKey, JSON.stringify(reports));
        }
    }, [reports, user?.user_id]);

    const addReport = (report) => {
        setReports((prev) => [report, ...prev]);
    };

    const getReport = (id) => {
        // Primary lookup in current state
        const found = reports.find((report) => report.id === id);
        if (found) return found;
        // Fallback: try to read from localStorage (user‑specific key)
        if (user?.user_id) {
            try {
                const storageKey = `reports_${user.user_id}`;
                const saved = localStorage.getItem(storageKey);
                if (saved) {
                    const parsed = JSON.parse(saved);
                    return parsed.find((r) => r.id === id);
                }
            } catch (e) {
                console.error('Error reading reports from storage for fallback', e);
            }
        }
        return undefined;
    };

    const deleteReport = (id) => {
        setReports((prev) => prev.filter((report) => report.id !== id));
    };

    const clearReports = () => {
        setReports([]);
        if (user?.user_id) {
            const storageKey = `reports_${user.user_id}`;
            localStorage.removeItem(storageKey);
        }
    };

    const value = {
        reports,
        addReport,
        getReport,
        deleteReport,
        clearReports,
    };

    return <ReportsContext.Provider value={value}>{children}</ReportsContext.Provider>;
};
