
function Reducer(action, state = { switch: false, token: null, userName: null, employees: [], employee: null, departments : [], shifts : [], register: false }) {
      switch (action.type) {
            case "SWITCH_ACTION":
                  return { ...state, switch: action.payload }

            case "TOKEN":
                  return { ...state, token: action.payload }

            case "USER_NAME":
                  return { ...state, userName: action.payload }

            case "EMPLOYEES":
                 
                  return { ...state, employees: action.payload }

            case "EMPLOYEES_INFO":
                  return { ...state, employee: action.payload }

            case "DEPARTMENTS":
                  return { ...state, departments: action.payload }

            case "SHIFTS":
                  return { ...state, shifts: action.payload }
            
            case "REGISTER":
                  return { ...state, register: action.payload }
            default:
                  return state
      }
}
export default Reducer;