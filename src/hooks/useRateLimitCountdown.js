import { useState, useEffect, useRef } from 'react';

export const useRateLimitCountdown = (initialSeconds = 60) => {
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef(null);

  const startCountdown = (secs = initialSeconds) => {
    setSeconds(secs);
  };

  useEffect(() => {
    if (seconds > 0) {
      timerRef.current = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [seconds]);

  return { 
    seconds, 
    isRateLimited: seconds > 0,
    startCountdown 
  };
};
