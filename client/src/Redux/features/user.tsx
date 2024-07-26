// features/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    emailError: string;
    incorrectFullname: boolean;
    remplirChamp: string;
    id:string|null ;
    email: string;
    fullname: string;
    isCodeSent :boolean ;
    correctCode:boolean ;
    authentificate:boolean;
    closesuccessmessage:boolean;
    callId :string ;
    isInRoom:boolean ;
    leavecall:boolean ;

  }
  
  const initialState: UserState = {
    emailError: '',
    incorrectFullname: false,
    remplirChamp: '',
    id:null,
    email: '',
    fullname: '',
    isCodeSent:false ,
    correctCode:false ,
    authentificate:false,
    closesuccessmessage:false,
    callId:'' ,
    isInRoom:false ,
   leavecall:false ,
  };

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setEmailError: (state, action: PayloadAction<string>) => {
      state.emailError = action.payload;
    },
    setIncorrectFullname: (state, action: PayloadAction<boolean>) => {
      state.incorrectFullname = action.payload;
    },
    setRemplirChamp: (state, action: PayloadAction<string>) => {
      state.remplirChamp = action.payload;
    },
    setCodeSent: (state, action: PayloadAction<boolean>) => {
        state.isCodeSent = action.payload;
      },
    setcorrectCode: (state, action: PayloadAction<boolean>) => {
        state.correctCode = action.payload;
      },
    setauthentificate: (state, action: PayloadAction<boolean>) => {
        state.authentificate = action.payload;
    },
    setclosesuccessmessage:(state, action: PayloadAction<boolean>) => {
      state.closesuccessmessage = action.payload;
  },

  login: (state, action: PayloadAction<{ id:string ;fullname: string; email: string }>) => {
        state.id=action.payload.id ;
        state.fullname = action.payload.fullname;
        state.email = action.payload.email;
      
   },
  setCallId: (state, action: PayloadAction<string>) => {
        state.callId = action.payload;
    },
    setIsInRoom: (state, action: PayloadAction<boolean>) => {
      state.isInRoom = action.payload;
  },
  setLeavecall: (state, action: PayloadAction<boolean>) => {
    state.leavecall = action.payload;
},

  },

});

export const { setEmailError, setIncorrectFullname, setRemplirChamp,setCodeSent,setcorrectCode ,setauthentificate , login , setclosesuccessmessage  ,setIsInRoom , setCallId  , setLeavecall} = userSlice.actions;
export default userSlice.reducer;
