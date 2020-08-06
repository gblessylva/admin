import API from '../../utililty/api';

export const login = (email, password) => {
  return (dispatch) => {
    API.login(email, password, result => {
      dispatch({
        type: 'LOGIN',
        payload:
        {
          email: email,
          token: result.data.id,
          userId: result.data.userId
        }
      })

    })

  }
}