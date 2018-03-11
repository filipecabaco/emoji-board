const initial = { content: null, clean: true }
export function boardReducer(state = initial, action) {
  switch (action.type) {
    case 'START':
      return Object.assign({...state}, { clean: true })
    case 'CHANGE':
      return Object.assign({...state}, { clean: false, content: {...action.message}})
    case 'FINISHED':
      return Object.assign({...state}, { content: null})
    default:
      return { ...state }
  }
}