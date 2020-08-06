import React, { Component } from 'react';
import { connect } from 'react-redux';
import Fields from './common/Fileds'
import * as AuthAction from './store/actions/authActions';

import { withFormik } from 'formik'
import * as Yup from 'yup'


const fileds = [{
  name: "email", elementName: 'input', type: 'email', placeholder: 'Please Enter Your Email address'
},
{
  name: "password", elementName: 'password', type: 'password', placeholder: 'Please Enter Your password'
}]



class Login extends Component {


  render() {

    return (

      <div className="form-container">
        <h1>Hello Login Page</h1>
        <form
          onSubmit={e => {
            e.preventDefault();
            this.props.login(this.props.values.email, this.props.values.password)

          }}
        >
          {fileds.map((f, i) => {
            return (
              <Fields
                key={i}
                {...f}
                value={this.props.values[f.name]}
                name={f.name}
                onChange={this.props.handleChange}
                onBlur={this.props.handleBlur}
                touched={this.props.touched[f.name]}
                errors={this.props.errors[f.name]}
              />
            )
          })}

          <div className="form-control">
            <button type="submit" id="submit" > Login</button>
          </div>
        </form>
      </div>

    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth.user
  }
}
const mapDispatchToProps = dispatch => {
  return {
    login: (email, password) => {
      dispatch(AuthAction.login(email, password))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withFormik({
  mapPropsToValues: () => ({
    email: '',
    password: ''
  }),
  validationSchema: Yup.object().shape({
    email: Yup.string().email('Please enter a valid email address').required('This email field is required'),
    password: Yup.string().required('This password field is required').min(4, 'Cannot be less than 4 digits')
  }),
  handleSubmit: (values, { setSubmitting }, login) => {
    // console.log('Login attempt', values)
    // login(values.email, values.password)
  }
})(Login))