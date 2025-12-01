import React from 'react';

export interface FormData {
    organizationName: string;
    email: string;
    password: string;
    confirmPassword: string;
    ownerFullName: string;
    industry: string;
    description: string;
    domainUrl: string;
}

export interface CommonProps {
    t: any;
    language: string;
}

export interface Step1Props extends CommonProps {
    formData: FormData;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    handleNextStep: () => void;
}

export interface Step2Props extends CommonProps {
    formData: FormData;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    setStep: (step: number) => void;
    loading: boolean;
    darkMode: boolean;
}
