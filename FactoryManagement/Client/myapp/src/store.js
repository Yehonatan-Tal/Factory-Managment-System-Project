import {configureStore} from '@reduxjs/toolkit'
import reducersReducer from './redux/reducers'


export default configureStore({
    reducer : {
        reducers: reducersReducer
    }
})