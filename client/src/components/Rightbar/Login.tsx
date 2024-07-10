import React from 'react'
import AuthForm from './AuthForm';
import CodeForm from './CodeForm';
import { useSelector } from 'react-redux';
import type {RootState } from '../../Redux/Store';

function Login() {
    const isCodeSent = useSelector((state: RootState) => state.user.isCodeSent);

  return (
   <>
    { !isCodeSent && (

        <AuthForm/>
    )}

    {isCodeSent && (

        <CodeForm/>
    )}
   </>
  )
}

export default Login