import React from 'react'
import './TabHeader.css'

function TabHeader() {
  return (
    <div className='tabheadercontainer'>
        <Component/>
    </div>
  )
}

function Component(){
  return (
    <div className='componentbuttoncontainer'>

      <Button icon={<UserIcon/>} title='Participants' color='transparant' textcolor='#9ca3af'/>
      <Button icon={<AppsIcon/>} title='Apps' color='#2d8cff' textcolor='white'/>

    </div>
  )
}

interface ButtonProps {
  icon: React.ReactNode;
  title: string;
  color:string;
  textcolor:string;
}
function Button({icon , title , color , textcolor}:ButtonProps){
  return(
    <div className='buttonheader' style={{backgroundColor:`${color}` }} >
      <div>{icon}</div>
      <p style={{color:`${textcolor}`}}>{title}</p>
      {title === 'Apps' && (
        <div className='redpoint'></div>
      )}
    </div>
  )
}

const UserIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
    <path d="M12 2C9.24746 2 7 4.24746 7 7C7 9.75254 9.24746 12 12 12C14.7525 12 17 9.75254 17 7C17 4.24746 14.7525 2 12 2ZM12 3.5C13.9419 3.5 15.5 5.05812 15.5 7C15.5 8.94188 13.9419 10.5 12 10.5C10.0581 10.5 8.5 8.94188 8.5 7C8.5 5.05812 10.0581 3.5 12 3.5ZM6.25 14C5.01625 14 4 15.0162 4 16.25V16.8496C4 18.32 4.93236 19.639 6.35449 20.5459C7.77663 21.4528 9.72242 22 12 22C14.2776 22 16.2234 21.4528 17.6455 20.5459C19.0676 19.639 20 18.32 20 16.8496V16.25C20 15.0162 18.9838 14 17.75 14H6.25ZM6.25 15.5H17.75C18.1732 15.5 18.5 15.8268 18.5 16.25V16.8496C18.5 17.6822 17.9637 18.5639 16.8389 19.2812C15.714 19.9986 14.0344 20.5 12 20.5C9.96558 20.5 8.286 19.9986 7.16113 19.2812C6.03627 18.5639 5.5 17.6822 5.5 16.8496V16.25C5.5 15.8268 5.82675 15.5 6.25 15.5Z" fill="#9CA3AF"/>
  </svg>
  
);

const AppsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M6.75 2.49998H2.25C1.285 2.49998 0.5 3.28498 0.5 4.24998V8.74998C0.5 9.71498 1.285 10.5 2.25 10.5H6.75C7.715 10.5 8.5 9.71498 8.5 8.74998V4.24998C8.5 3.28498 7.715 2.49998 6.75 2.49998ZM6.75 11.5H2.25C1.285 11.5 0.5 12.285 0.5 13.25V17.75C0.5 18.715 1.285 19.5 2.25 19.5H6.75C7.715 19.5 8.5 18.715 8.5 17.75V13.25C8.5 12.285 7.715 11.5 6.75 11.5ZM15.75 11.5H11.25C10.285 11.5 9.5 12.285 9.5 13.25V17.75C9.5 18.715 10.285 19.5 11.25 19.5H15.75C16.715 19.5 17.5 18.715 17.5 17.75V13.25C17.5 12.285 16.715 11.5 15.75 11.5ZM18.9195 4.26248L15.7375 1.08048C15.055 0.397979 13.9455 0.397979 13.263 1.08048L10.081 4.26248C9.399 4.94448 9.399 6.05498 10.081 6.73698L13.2635 9.91948C13.6045 10.26 14.052 10.43 14.5005 10.43C14.9485 10.43 15.3965 10.2595 15.738 9.91898L18.92 6.73698C19.6015 6.05498 19.6015 4.94498 18.9195 4.26248Z" fill="white"/>
  </svg>
  
);








export default TabHeader ;