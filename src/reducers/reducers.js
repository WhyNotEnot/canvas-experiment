export default (state = {}, action) => {
 switch (action.type) {
  case 'UPDATE_FIRST':
  	state.firstCanvas = action.payload
   	return {
   		...state
   	}
  case 'UPDATE_SECOND':
  	state.secondCanvas = action.payload
   return {
   		...state
   }
  default:
   return state
 }
}