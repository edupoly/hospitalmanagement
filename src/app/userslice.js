import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    isAdmin : false,
    user : null
}

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        changeUser:(state,actions)=>{
            console.log(actions)
            state.isAdmin=actions.payload.isadmin
            state.user=actions.payload.user
        }
    }
})

export const { changeUser } = userSlice.actions
export default userSlice.reducer