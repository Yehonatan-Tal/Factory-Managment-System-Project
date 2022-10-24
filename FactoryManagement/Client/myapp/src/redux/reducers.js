import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    switchButton: false,
    token: null,
    userName: null,
    employees: [],
    employee: null,
    departments: [],
    shifts: [],
    register: false,
}

export const reducersSlice = createSlice({
    name: 'reducers',
    initialState,
    reducers: {
        switchButton: (state, action) => {
            state.switchButton = action.payload
        },
        userName: (state, action) => {
            state.userName = action.payload
        },
        token: (state, action) => {
            state.token = action.payload
        },
        shifts: (state, action) => {
            state.shifts = action.payload
        },
        register: (state, action) => {
            state.register = action.payload
        },
        employees: (state, action) => {
            state.employees = action.payload
        },
        employee: (state, action) => {
            state.employee = action.payload
        },
        departments: (state, action) => {
            state.departments = action.payload
        }
    },
})

export const {switchButton, userName, token, shifts, register, employees, employee, departments} = reducersSlice.actions

export default reducersSlice.reducer