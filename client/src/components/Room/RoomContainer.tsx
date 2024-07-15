import React from 'react';
import './RoomContainer.css';
import ControllBar from './ControllBar/ControllBar';

export function EmptyRoomContainer() {
  return (
    <div className='RoomContainer'>
    </div>
  )
}

export function RoomContainer() {
  return (
    <div className='RoomContainer'>
      <ControllBar/>
    </div>
  )
}