import { createContext, useReducer } from "react";

const initialState = {
  token: null,
  username: null,
  id: null
}

const AuthContext = createContext()

const AuthContextProvider = (props) => {

  const reducer = (state, action) => {
    switch(action.type) {
      case 'LOGIN':
        console.log("payload", action.payload)
        return {
          ...state,
          token: action.payload.token,
          username: action.payload.username,
          id: action.payload.id
        }
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <AuthContext.Provider value={{state, dispatch}}>
      {props.children}
    </AuthContext.Provider>
    )

}

export {AuthContextProvider}
export default AuthContext