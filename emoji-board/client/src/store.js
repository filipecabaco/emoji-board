import { createStore } from 'redux'
import rootReducer from './reducers/rootReducer'


export function configStore(initialState = {}){
  return createStore(rootReducer, initialState)
}