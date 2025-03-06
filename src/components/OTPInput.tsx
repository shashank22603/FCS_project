import React from 'react';
import ReactOTPInput from 'react-otp-input';

interface OTPInputProps {
  value: string;
  onChange: (value: string) => void;
  numInputs?: number;
}

export function OTPInput({ value, onChange, numInputs = 6 }: OTPInputProps) {
  return (
    <div className="flex justify-center">
      <ReactOTPInput
        value={value}
        onChange={onChange}
        numInputs={numInputs}
        renderInput={(props) => (
          <input
            {...props}
            className="w-12 h-12 mx-1 text-center border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
          />
        )}
      />
    </div>
  );
}