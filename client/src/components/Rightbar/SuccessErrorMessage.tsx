import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/Store';
import SuccessMessage from './SuccessMessage';
import ErrorMessage from './ErrorMessage';

function SuccessErrorMessage() {
    const correctCode = useSelector((state: RootState) => state.user.correctCode);
  return (
   <>
    {
        correctCode && <SuccessMessage/>
       
    }
    {
        !correctCode && <ErrorMessage/>
    }
   </>
  )
}

export default SuccessErrorMessage