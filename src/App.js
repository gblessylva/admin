import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import './App.css';
import Login from './components/Login';
import {connect} from 'react-redux'
import Dashboard from './components/admin/Dashboard';

{
  {
    document.title = `Sylvanus Godbless Admin Login Page `
  }
}
function App(props) {
return (
  <Router>
    <div className="App">
          {props.auth.token ?
        <Dashboard />

            :
            <Login />
      }
    </div>
      </Router>
);

  }


const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}
const mapDispatchToProps = dispatch => {
  return {

  }

}
export default connect(
  mapStateToProps,
  mapDispatchToProps
) (App);
