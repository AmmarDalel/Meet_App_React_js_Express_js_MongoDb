import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    online:string[] 
}

const initialState: UserState = {
    online:[] 
}

const participantsSlice = createSlice({
    name: 'participants',
    initialState,
    reducers: {
      setParticipants: (state, action: PayloadAction<string[]>) => {
        state.online = action.payload;
      }

    }
});

export const {setParticipants}= participantsSlice.actions;
export default participantsSlice.reducer;