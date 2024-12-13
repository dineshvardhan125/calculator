import React, { useState } from 'react';
import { Equal, Delete, Plus, Minus, X, Divide, RefreshCw } from 'lucide-react';

type Operation = '+' | '-' | '*' | '/' | null;

export function Calculator() {
  const [display, setDisplay] = useState('0');
  const [firstNumber, setFirstNumber] = useState<number | null>(null);
  const [operation, setOperation] = useState<Operation>(null);
  const [newNumber, setNewNumber] = useState(true);

  const handleNumber = (num: string) => {
    if (newNumber) {
      setDisplay(num);
      setNewNumber(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOperation = (op: Operation) => {
    setOperation(op);
    setFirstNumber(parseFloat(display));
    setNewNumber(true);
  };

  const calculate = () => {
    if (firstNumber === null || operation === null) return;
    
    const secondNumber = parseFloat(display);
    let result: number;

    switch (operation) {
      case '+':
        result = firstNumber + secondNumber;
        break;
      case '-':
        result = firstNumber - secondNumber;
        break;
      case '*':
        result = firstNumber * secondNumber;
        break;
      case '/':
        result = firstNumber / secondNumber;
        break;
      default:
        return;
    }

    setDisplay(result.toString());
    setFirstNumber(null);
    setOperation(null);
    setNewNumber(true);
  };

  const clear = () => {
    setDisplay('0');
    setFirstNumber(null);
    setOperation(null);
    setNewNumber(true);
  };

  const buttonClass = "h-14 transition-all duration-150 rounded-lg flex items-center justify-center text-xl font-medium hover:bg-opacity-80 active:scale-95";

  return (
    <div className="w-full max-w-sm mx-auto p-6 bg-white rounded-2xl shadow-xl">
      <div className="mb-6 p-4 bg-gray-100 rounded-xl">
        <div className="text-right text-4xl font-light text-gray-800 tracking-wider">
          {display}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        <button onClick={clear} className={`${buttonClass} bg-red-500 text-white col-span-2`}>
          <RefreshCw size={20} className="mr-2" /> Clear
        </button>
        <button onClick={() => setDisplay(display.slice(0, -1) || '0')} className={`${buttonClass} bg-orange-500 text-white col-span-2`}>
          <Delete size={20} className="mr-2" /> Delete
        </button>

        {['7', '8', '9'].map((num) => (
          <button key={num} onClick={() => handleNumber(num)} className={`${buttonClass} bg-gray-200`}>
            {num}
          </button>
        ))}
        <button onClick={() => handleOperation('/')} className={`${buttonClass} bg-indigo-500 text-white`}>
          <Divide size={20} />
        </button>

        {['4', '5', '6'].map((num) => (
          <button key={num} onClick={() => handleNumber(num)} className={`${buttonClass} bg-gray-200`}>
            {num}
          </button>
        ))}
        <button onClick={() => handleOperation('*')} className={`${buttonClass} bg-indigo-500 text-white`}>
          <X size={20} />
        </button>

        {['1', '2', '3'].map((num) => (
          <button key={num} onClick={() => handleNumber(num)} className={`${buttonClass} bg-gray-200`}>
            {num}
          </button>
        ))}
        <button onClick={() => handleOperation('-')} className={`${buttonClass} bg-indigo-500 text-white`}>
          <Minus size={20} />
        </button>

        <button onClick={() => handleNumber('0')} className={`${buttonClass} bg-gray-200`}>
          0
        </button>
        <button onClick={() => handleNumber('.')} className={`${buttonClass} bg-gray-200`}>
          .
        </button>
        <button onClick={calculate} className={`${buttonClass} bg-green-500 text-white`}>
          <Equal size={20} />
        </button>
        <button onClick={() => handleOperation('+')} className={`${buttonClass} bg-indigo-500 text-white`}>
          <Plus size={20} />
        </button>
      </div>
    </div>
  );
}