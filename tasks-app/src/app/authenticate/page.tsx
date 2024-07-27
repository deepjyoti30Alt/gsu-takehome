'use client'
import React, { useState } from 'react';

export default function Home() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    const [showNameFields, setShowNameFields] = useState(true);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    const toggleNameFields = () => {
        setShowNameFields(prev => !prev);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <form onSubmit={handleSubmit} className="w-full max-w-md">
                <div className="input--container">
                    <h1 className="heading text-2xl font-medium mb-8 text-center">{showNameFields ? 'Welcome to tasks. Create your account to get started' : 'Welcome back to tasks. Login to access your data'}</h1>
                    <div className="input--content text-sm font-medium text-neutral-700">
                        {showNameFields && (
                            <>
                                <div className="mb-4">
                                    <label htmlFor="firstName">First Name</label>
                                    <input
                                        id="firstName"
                                        name="firstName"
                                        className="mt-1 w-full border rounded-lg focus:border-blue-600 px-4 py-2 outline-none"
                                        type="text"
                                        placeholder="John"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="lastName">Last Name</label>
                                    <input
                                        id="lastName"
                                        name="lastName"
                                        className="mt-1 w-full border rounded-lg focus:border-blue-600 px-4 py-2 outline-none"
                                        type="text"
                                        placeholder="Doe"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </>
                        )}
                        <div className="mb-4">
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                name="email"
                                className="mt-1 w-full border rounded-lg focus:border-blue-600 px-4 py-2 outline-none"
                                type="email"
                                placeholder="johndoe@somewebsite.com"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                name="password"
                                className="mt-1 w-full border rounded-lg focus:border-blue-600 px-4 py-2 outline-none"
                                type="password"
                                placeholder="aStr0ngpw"
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col">
                    <button
                        type="button"
                        onClick={toggleNameFields}
                        className="text-gray-800 px-4 py-2 rounded-lg transition-colors"
                    >
                        {showNameFields ? 'Already have an account? Log In instead' : 'New here? Create an account'}
                    </button>
                    <button
                        type="submit"
                        className="mt-4 bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        {showNameFields ? 'Create Account' : 'Login'}
                    </button>
                </div>
            </form>
        </div>
    );
}
