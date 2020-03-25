export const updateFirstCanvas = (canvasCurves) => dispatch => {
 dispatch({
  type: 'UPDATE_FIRST',
  payload: canvasCurves
 })
}

export const updateSecondCanvas = (canvasCurves) => dispatch => {
 dispatch({
  type: 'UPDATE_SECOND',
  payload: canvasCurves
 })
}