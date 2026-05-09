import React from 'react';

interface InputFieldProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder: string;
  error?: string;
  autoComplete?: string;
}

export default function InputField({ name, value, onChange, type = "text", placeholder, error, autoComplete }: InputFieldProps) {
  return (
    <div className="w-full flex flex-col gap-1">
      <input
        name={name}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        className={`border rounded-md py-3 px-4 w-full focus:outline-none focus:ring-1 transition-colors ${
          error ? 'border-red-500 focus:border-red-500 focus:ring-red-500 bg-red-50/10' : 'border-gray-300 focus:border-black focus:ring-black bg-white'
        }`}
        type={type}
        placeholder={placeholder}
      />
      {error && <p className="text-red-500 text-xs font-medium ml-1 mt-1">{error}</p>}
    </div>
  );
}
