import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useIdleTimer } from 'react-idle-timer';

const RefreshToken = () => {
  const [remaining, setRemaining] = useState(0);

  const { getRemainingTime, getLastActiveTime, getElapsedTime } = useIdleTimer({
    timeout: 1000 * 60 * 15,
    debounce: 500,
    crossTab: true
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(remaining + 1);
    });
    return () => clearInterval(interval);
  }, []);

  const timer = getElapsedTime();
  console.log(`timer`, moment(remaining).seconds());

  return <div>Testing</div>;
};

export default RefreshToken;
