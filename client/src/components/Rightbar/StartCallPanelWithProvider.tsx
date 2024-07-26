import React from 'react';
import { CallProvider } from '../../Context/CallContext';
import StartCallPanel from './StartCallPanel';

const StartCallPanelWithProvider = () => (
  <CallProvider>
    <StartCallPanel />
  </CallProvider>
);

export default StartCallPanelWithProvider;
