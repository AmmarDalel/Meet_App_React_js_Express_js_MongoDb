import React from 'react';
import './Sidebar.css';
import TabHeader from './TabHeader';
import Form from './Form';

function RightSidebar() {
  return (
    <div className='sidebarcontainer'>
      <TabHeader/>
      <Form/>
    </div>
  )
}

export default RightSidebar