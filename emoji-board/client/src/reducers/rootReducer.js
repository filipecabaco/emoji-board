import { boardReducer } from './boardReducer'
import { combineReducers } from "redux"

const rootReducer = combineReducers({ boardReducer })

export default rootReducer