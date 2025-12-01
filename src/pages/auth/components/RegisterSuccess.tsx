import React from 'react';
import { Mail } from "lucide-react";

interface RegisterSuccessProps {
    t: any;
    onRegisterSuccess: () => void;
}

const RegisterSuccess: React.FC<RegisterSuccessProps> = ({ t, onRegisterSuccess }) => {
    return (
        <div
            className="min-h-screen flex items-center justify-center p-4"
            style={{ backgroundColor: "var(--bg-main)", color: "var(--text-main)" }}
        >
            <div
                className="max-w-md w-full rounded-lg shadow-lg p-6 sm:p-8 text-center"
                style={{ backgroundColor: "var(--card-bg)", color: "var(--card-text)" }}
            >
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Mail className="w-8 h-8 sm:w-10 sm:h-10 text-success" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold mb-4">{t.registrationSuccess}</h2>
                <p className="text-sm sm:text-base mb-6">
                    {t.registrationSuccessDesc}
                </p>
                <button
                    onClick={onRegisterSuccess}
                    className="inline-block bg-primary text-white px-6 py-2.5 sm:py-3 rounded-lg hover:bg-primary-dark transition-colors font-semibold text-sm sm:text-base"
                >
                    {t.goToLogin}
                </button>
            </div>
        </div>
    );
};

export default RegisterSuccess;
