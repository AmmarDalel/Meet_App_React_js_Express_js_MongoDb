import React from 'react';
import './Sidebar.css';
import TabHeader from './TabHeader';
import Form from './Form';
import './Form.css' ;

function RightSidebar() {
  return (
    <div className='sidebarcontainer'>
      <TabHeader/>
      <div className='titlecontainer'>
            <svg width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.6176 0.246615C5.52021 0.249454 5.42775 0.290081 5.35979 0.359897L0.484791 5.2349C0.414492 5.30522 0.375 5.40059 0.375 5.50003C0.375 5.59947 0.414492 5.69484 0.484791 5.76517L5.35979 10.6402C5.39435 10.6762 5.43573 10.7049 5.48153 10.7247C5.52733 10.7445 5.57662 10.7549 5.62651 10.7554C5.6764 10.7559 5.72589 10.7465 5.77208 10.7276C5.81827 10.7088 5.86023 10.6809 5.89551 10.6456C5.93079 10.6103 5.95867 10.5684 5.97753 10.5222C5.99639 10.476 6.00584 10.4265 6.00534 10.3766C6.00483 10.3267 5.99437 10.2774 5.97458 10.2316C5.95479 10.1858 5.92605 10.1444 5.89006 10.1099L1.2802 5.50003L5.89006 0.89017C5.94416 0.837481 5.9811 0.769688 5.99603 0.695661C6.01097 0.621635 6.0032 0.544824 5.97376 0.475282C5.94432 0.40574 5.89457 0.346706 5.83102 0.305907C5.76747 0.265107 5.69309 0.244441 5.6176 0.246615Z" fill="#6B7280"/>
            </svg>
            <p>Registration Form</p>
        </div>
        <header className='formheader'>
                <h2>Building your immersive portfolio using virtual words</h2>
                <h4>​In this interactive event, we will talk about how virtual worlds can be the next medium to deliver immersive portfolio for designers, photographer, & story tellers.</h4>
           </header>
      <Form/>
    </div>
  )
}

export default RightSidebar