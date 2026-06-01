import {createSlice} from "@reduxjs/toolkit"

const userSlice = createSlice({
    name:"user",
    initialState:{
       useData:null
    },
    reducers:{
        setUserData:(state,action)=>{
            state.useData=action.payload
        }
    }
})
export const {setUserData} = userSlice.actions
export default userSlice.reducer