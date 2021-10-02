import moment from 'moment';
import { reset } from 'numeral';
import React, { useEffect, useState } from 'react';
import { useIdleTimer } from 'react-idle-timer';
import { useDispatch } from 'react-redux';
import { getRefreshToken } from '../../actions/auth/auth';

const RefreshToken = () => {
  // const [elapsedTime, setElapsedTime] = useState(0);
  let elapsedTime = 0;

  // const dispatch = useDispatch();

  // const { start, reset, getRemainingTime, getLastActiveTime, getElapsedTime } = useIdleTimer({
  //   timeout: 1000 * 60 * 15,
  //   debounce: 500,
  //   crossTab: true
  // });

  // useEffect(() => {
  //   start();
  //   return () => reset();
  // }, []);

  useEffect(() => {
    setInterval(() => {
      elapsedTime += 1;
    }, 1000);
    // if (timer % 15 === 0) dispatch(getRefreshToken);
  }, [elapsedTime]);

  console.log(`timer`, elapsedTime, moment(elapsedTime).seconds());

  return <div>Testing</div>;
};

export default RefreshToken;
