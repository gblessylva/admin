import axios from 'axios';

const URI = 'http://localhost:4040'
const API = {
  login : (email, password, success) => {
    axios.post(`${URI}/api/users/login`, {

        email: email,
        password: password

      })
      .then(res => {
        success(res)
      })
  },
  getUsers: (token, cb) => {
    axios.get(`${URI}/api/users?access_token=${token}`)
      .then(res => {
      cb(res)
    })
  },
  getArticles: (token, cb) => {
    axios.get(`${URI}/api/Articles?access_token=${token}`)
      .then(res => {
      cb(res)
    })
  },
  addArticles: (articles, token, cb) => {
    console.log('Adding', articles)
    axios.post(`${URI}/api/Articles?access_token=${token}`, articles)
      .then(res => {
      cb(res)
    })
  }
  ,
  getSingleArticle: (id, token, cb) => {
    axios.get(`${URI}/api/Articles/${id}?access_token=${token}`)
      .then(
        res => {
          cb(res)
      }
    )
  }
}

export default API