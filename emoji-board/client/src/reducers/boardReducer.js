const initial = { content: [], clean: true }
export function boardReducer(state = initial, action) {
  switch (action.type) {
    case 'START':
      return Object.assign({...state}, { clean: true })
    case 'CHANGE':
      return Object.assign({...state}, { clean: false, content: {...action.message}})
    case 'FINISHED':
      return Object.assign({...state}, { content: []})
    default:
      return { ...state }
  }
}