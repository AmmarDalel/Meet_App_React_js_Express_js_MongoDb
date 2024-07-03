import React, { useState } from 'react'
import './Form.css'
function Form() {
    
    const [email, setEmail] = useState('');
    const [fullname, setFullname] = useState('');
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [confirmationCode, setConfirmationCode] = useState('');
    const [correctcode, setCorrectcode] = useState(false);
    const [incorrectfullname, setIncorrectFullname] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [remplirChamp, setRemplirChamp] = useState('');


    // Valider l'email
    const validateEmail = (email: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setEmailError('Email should be example@gmail.com');
      } else {
        setEmailError('');
      }
    };

    // Envoyer email et fullname au serveur
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(fullname && email){
          setRemplirChamp('') ;
          try{
            const response= await fetch('http://localhost:5000/api/users/authent/authenticate',{
               method:'post',
               headers: {'Content-Type':'application/json' , 'access-control-allow-origin':'*'},
     
               body: JSON.stringify({
                 "fullName": fullname ,
                 "email": email ,
                })         
             })
             const data = await response.json();
             console.log(data.message)
             if(data.message=='Incorrect  Full name !'){
               setIncorrectFullname(true) ;
             }
             if (response.ok) {
                 setIncorrectFullname(false);
                 setIsCodeSent(true);
                 } else {
                   // Gérer les erreurs d'authentification
                   console.error('Erreur d\'authentification');
                 }
     
            }catch(error){
               console.log(error)
            }
        }
        else{
          setRemplirChamp('All fields must be filled !') ;
        }
      
      };

      // Envoyer le code de confirmation au serveur
      const handleCodeSubmit = async (e:any) => {
        e.preventDefault();
        try{
          // Envoyer email et fullname au serveur
         const response= await fetch('http://localhost:5000/api/users/verifycode/confirmationcode',{
            method:'post',
            headers: {'Content-Type':'application/json' , 'access-control-allow-origin':'*'},
  
            body: JSON.stringify({
              "fullName": fullname ,
              "email": email ,
              "confirmationCode": confirmationCode ,

             }) 
          })
          if (response.ok) {
            setCorrectcode(true) ;
            console.log('code correct') ;
              } else {
                // Gérer les erreurs d'authentification
                setCorrectcode(false) ;
                
                console.error('Erreur d\'authentification');
              }
  
         }catch(error){
            console.log(error)
         }
        
      
      };


  return (
    <div className='formcontainer'>
        <div className='titlecontainer'>
            <svg width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.6176 0.246615C5.52021 0.249454 5.42775 0.290081 5.35979 0.359897L0.484791 5.2349C0.414492 5.30522 0.375 5.40059 0.375 5.50003C0.375 5.59947 0.414492 5.69484 0.484791 5.76517L5.35979 10.6402C5.39435 10.6762 5.43573 10.7049 5.48153 10.7247C5.52733 10.7445 5.57662 10.7549 5.62651 10.7554C5.6764 10.7559 5.72589 10.7465 5.77208 10.7276C5.81827 10.7088 5.86023 10.6809 5.89551 10.6456C5.93079 10.6103 5.95867 10.5684 5.97753 10.5222C5.99639 10.476 6.00584 10.4265 6.00534 10.3766C6.00483 10.3267 5.99437 10.2774 5.97458 10.2316C5.95479 10.1858 5.92605 10.1444 5.89006 10.1099L1.2802 5.50003L5.89006 0.89017C5.94416 0.837481 5.9811 0.769688 5.99603 0.695661C6.01097 0.621635 6.0032 0.544824 5.97376 0.475282C5.94432 0.40574 5.89457 0.346706 5.83102 0.305907C5.76747 0.265107 5.69309 0.244441 5.6176 0.246615Z" fill="#6B7280"/>
            </svg>
            <p>Registration Form</p>
        </div>
        <header>
                <h2>Building your immersive portfolio using virtual words</h2>
                <h4>​In this interactive event, we will talk about how virtual worlds can be the next medium to deliver immersive portfolio for designers, photographer, & story tellers.</h4>
           </header>
        { !isCodeSent && (

        <form className='auth-form' onSubmit={handleSubmit}  >
                <div className='submitdatacontainer'>
                              <div style={{padding:'16px'}}>
                                <Input title='Full name' inputtype='text' value={fullname} changevalue={(e:any)=>{setFullname(e.target.value)}} />
                                <Input title='Email' inputtype='email' value={email} changevalue={(e:any)=>{setEmail(e.target.value) ; validateEmail(e.target.value);}}/>
                                       
                              </div>
                              {
                                  <div className='incorrectfullnamecontainer'>
                                    {emailError && <p className='error'>{emailError}</p>}
                                    {incorrectfullname && <p className='error'>Incorrect  Full name !</p>}
                                    {remplirChamp && <p className='error'>{remplirChamp}</p>}

                                  </div>
                                
                              }
                              <div className='submitcontainer submitcontainerAuth'>
                                <button type='submit' className='submitbutton' onClick={handleSubmit}>Submit</button>
                              </div>
                        </div>
           

        </form>
        )}

        {isCodeSent && (

            <form className='auth-form' onSubmit={handleCodeSubmit} >
            <div className='submitconfirmationcodecontainer'>
                    <div className='confirmationcodecontainer'>
                        <label className='label'>Enter Code :</label>
                        <input type="text" id="codeconfirmation" pattern="[0-9]{6}" maxLength={6} className='codeconfirmation' value={confirmationCode} onChange={(e:any)=>{setConfirmationCode(e.target.value)}}/>
                    
                    </div>
                        <div className='coderesult'>
                        {correctcode && (
                          <p className='correct'> User successfully authenticated ! </p>

                        )
                        }
                         {!correctcode && (
                          <p className='error'> Incorrect code !</p>

                        )
                        }
                        </div>
                  
                  
                    <div className='submitcontainer submitcontainerCode'>
                        <button className='submitbutton' onClick={handleCodeSubmit} >Submit</button>
                    </div>
            </div>
            </form>
         )}
    </div>
  )
}
interface inputinterface{
    title:string ;
    inputtype:string;
    value:any ;
    changevalue:any ;
}
function Input({title ,inputtype , value , changevalue }:inputinterface){
    return(
        <div className='inputcontainer'>
            <label className='label'>{title}</label>
            <input type={inputtype} className='input'  placeholder={title} value={value} onChange={changevalue} required />
        </div>
    )
}

export default Form ;