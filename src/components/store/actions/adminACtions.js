import API from '../../utililty/api';

export const getUsers = (token) => {
  return dispatch => {
    API.getUsers(token, res => {
      dispatch({
        type: 'GOT_USERS',
        payload: res.data
      })
    })
  }
}
export const getArticles = (token) => {
  return dispatch => {
    API.getArticles(token, res => {
      dispatch({
        type: "GOT_ARTICLES",
        payload: res.data
      })

    })
  }
}
export const addArticles = (articles, token) => {
  return dispatch => {
    API.addArticles(articles, token, res => {

      dispatch({
        type: 'ARTICLE_ADDED',
        payload: res.data
      })
    })
  }

}
export const getSingleArticle = (id, token) => {
    return dispatch => {
      API.getSingleArticle(id, token, res => {
        dispatch({
          type: 'GOT_SINGLE_ARTICLE',
          payload: res.data
        })
      })
    }
  }