import { useRef } from 'react';
import './OtpInput.css';

export default function OtpInput({ value = '', onChange, disabled = false, label }) {
  const inputRefs = useRef([]);
  const cleanValue = String(value).replace(/\D/g, '').slice(0, 6);
  const digits = Array.from({ length: 6 }, (_, index) => cleanValue[index] || '');

  const updateDigits = (nextDigits) => {
    onChange(nextDigits.join('').replace(/\D/g, '').slice(0, 6));
  };

  const handleChange = (index, rawValue) => {
    const cleaned = rawValue.replace(/\D/g, '');

    if (cleaned.length > 1) {
      const nextDigits = [...digits];
      cleaned
        .slice(0, 6 - index)
        .split('')
        .forEach((char, offset) => {
          nextDigits[index + offset] = char;
        });
      updateDigits(nextDigits);
      const nextFocus = Math.min(index + cleaned.length, 5);
      inputRefs.current[nextFocus]?.focus();
      return;
    }

    const digit = cleaned.slice(-1);
    const nextDigits = [...digits];
    nextDigits[index] = digit;
    updateDigits(nextDigits);

    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === 'Backspace' && !digits[index] && index > 0) {
      event.preventDefault();
      const nextDigits = [...digits];
      nextDigits[index - 1] = '';
      updateDigits(nextDigits);
      inputRefs.current[index - 1]?.focus();
    }

    if (event.key === 'ArrowLeft' && index > 0) {
      event.preventDefault();
      inputRefs.current[index - 1]?.focus();
    }

    if (event.key === 'ArrowRight' && index < 5) {
      event.preventDefault();
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const pastedDigits = event.clipboardData
      .getData('text')
      .replace(/\D/g, '')
      .slice(0, 6);

    if (!pastedDigits) return;

    onChange(pastedDigits);
    const focusIndex = Math.min(pastedDigits.length, 5);
    inputRefs.current[focusIndex]?.focus();
  };

  return (
    <div className="otp-inputs" role="group" aria-label={label || '6-digit verification code'}>
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(element) => {
            inputRefs.current[index] = element;
          }}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          autoComplete={index === 0 ? 'one-time-code' : 'off'}
          maxLength={6}
          value={digit}
          disabled={disabled}
          aria-label={`Digit ${index + 1} of 6`}
          onChange={(event) => handleChange(index, event.target.value)}
          onKeyDown={(event) => handleKeyDown(index, event)}
          onPaste={handlePaste}
          onFocus={(event) => event.target.select()}
        />
      ))}
    </div>
  );
}
