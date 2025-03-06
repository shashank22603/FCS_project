import React, { useState } from 'react';

interface VirtualKeyboardProps {
  onKeyPress: (key: string) => void;
  onSubmit: () => void;
}

export function VirtualKeyboard({ onKeyPress, onSubmit }: VirtualKeyboardProps) {
  const [keys] = useState(() => {
    const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    return [...numbers].sort(() => Math.random() - 0.5);
  });

  return (
    <div className="grid grid-cols-3 gap-2 p-4 bg-gray-100 rounded-lg">
      {keys.map((key) => (
        <button
          key={key}
          onClick={() => onKeyPress(key)}
          className="p-4 bg-white rounded-lg shadow hover:bg-gray-50 active:bg-gray-100 transition-colors"
        >
          {key}
        </button>
      ))}
      <button
        onClick={onSubmit}
        className="col-span-3 p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors"
      >
        Submit
      </button>
    </div>
  );
}