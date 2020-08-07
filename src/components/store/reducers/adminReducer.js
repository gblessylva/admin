const defaultState = {
  users: [],
  token: [],
  article: {}
}
const admin = (state = defaultState, action) => {
  switch (action.type) {
    case 'GOT_USERS':
      return {
        ...state,
        users: action.payload,
          token: action.payload.token
      }
      case 'GOT_ARTICLES':
        return {
          ...state,
          articles: action.payload
        }
    case 'ARTICLE_ADDED':
      return {
        ...state,
        articles: state.articles.concat(action.payload),
        article: action.payload
      }
    case 'UPDATED_ARTICLE': {
      return {
        ...state,
        article: action.payload,
        articles: state.articles.map(art => {
          if (art.id === action.payload.id) {
            return {
              ...art,
              ...action.payload
            }

            } else {
            return {
              art
            }
          }
        })
      }
    }
    case 'GOT_SINGLE_ARTICLE':
      return {
        ...state,
        article: action.payload
      }
        default:
          return state
  }
}
export default admin;