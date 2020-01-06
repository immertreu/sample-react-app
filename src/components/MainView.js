import React, { useState, useEffect } from 'react';
import { filter, map } from 'lodash';
import * as devicesData from '../ListItems.json';

import css from './MainView.module.scss';

export const MainView = () => {
  const [ data, setData ] = useState([]);
  const [ balance, setBalance ] = useState(25.0);

  useEffect(() => {
    setData(devicesData.devices);
  }, []);

  const addDevice = () => {
    // Is not actually a valid method for generating a unique id (will break if items deleted from mid list,
    // but that's out of scope for this project.
    const deviceNumber = data.length + 1;
    setData([...data, {
      id: deviceNumber,
      label: `Washer ${deviceNumber}`,
      status: 'Busy',
    }])
  };

  const deleteDevice = id => {
    setData(filter(data, item => item.id !== id));
  };

  const renderDevice = (device, idx) => {
    return (
      <div key={idx} className={css.deviceWrapper}>
        <span className={css.deviceId}>{device.id}</span>
        <div className={css.deviceLabelWrapper}>
            <h3>{device.label}</h3>
            <p>{device.status}</p>
        </div>
        <div className={css.deviceDeleteButton} onClick={() => deleteDevice(device.id)}>
          &ndash;
        </div>
      </div>
    )
  };

  const addBalance = () => setBalance(balance + 5);

  const getBalanceString = () => balance.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <div>
      <header className={css.header}>
        <div />
        <h2>Select a Machine</h2>
        <div className={css.headerAddButton} onClick={addDevice}>+</div>
      </header>
      <div className={css.page}>
        {map(data, (device, idx) => renderDevice(device, idx))}
      </div>
      <footer className={css.footer}><p>Balance {getBalanceString()}</p><div className={css.footerAddButton} onClick={addBalance}>+</div></footer>
    </div>
  );
};
