import React from 'react';
import {useAuthUser} from '@hap/utility/AuthHooks';

const Analytics = () => {
  const {user} = useAuthUser();
  console.log(user);
  return (
    <div>
      <lord-icon
        className='avatar-xl'
        src='https://cdn.lordicon.com/spxnqpau.json'
        trigger='loop'
        colors='primary:#405189,secondary:#0ab39c'
        style={{width: '120px', height: '120px'}}
      ></lord-icon>
    </div>
  );
};

export default Analytics;
