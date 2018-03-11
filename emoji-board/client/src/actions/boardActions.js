export const boardActions = {
  START: 'START',
  CHANGE: 'CHANGE',
}

export const changeAction = (message) => ({ type: boardActions.CHANGE, message: message })
export const startAction = () => ({ type: boardActions.START })