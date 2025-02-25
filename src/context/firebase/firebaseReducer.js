import {
  ADD_USER,
  USERS_LOADING,
  GET_ALL_USERS
} from '../types'

export default (state, action) => {
  switch(action.type){
    case GET_ALL_USERS:
      return {
        ...state,
        loading: false,
        users: action.payload
      }
    case ADD_USER:
      return {
        ...state,
        user: action.payload,
        loading:false
      }
    case USERS_LOADING:
      return {
        ...state,
        loading: true
      }
    default:
      return state
  }
}