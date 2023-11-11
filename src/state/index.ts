import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    tasks: [],
    token: null,
    user: null
}
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setTasks: (state, action) => {
            state.tasks = action.payload.tasks;
        },
        setTask: (state: any, action) => {
            const updatedTask = state.tasks.map((task: any) => {
                if (task._id === action.payload.task._id) {
                    return action.payload.task;
                } else {
                    return task;
                }
            })
            state.tasks = updatedTask;
        },
        setDelete: (state, action) => {
            const updatedTasks = state.tasks.filter((task: any) => {
                return task._id !== action.payload.task._id
            })
            state.tasks = updatedTasks
        }
    }
})
export const { setLogin, setLogout, setTask, setTasks, setDelete } = authSlice.actions;
export default authSlice;