import React, { Component } from 'react';
import { connect } from 'react-redux';
import TableView from '../common/TableViewer'
import * as adminAction from '../store/actions/adminACtions';

const columns =[
  { title: 'ID', field: 'id' },
  { title: 'Full Name', field: 'fullname' },
  { title: 'Email', field: 'email',  },
  {
    title: 'Status',
    field: 'status',
  },
  {
    title: 'Role',
    field: 'role',
  },
]


class Users extends Component {
  componentDidMount() {
    this.props.getUsers(this.props.auth.token)
  }
  render() {
    const user = this.props.admin.users
    return (
      <main>
        <h2>
          Users Route

        </h2>
        <TableView
          columns={columns}
          data={user}
          type='User'
        />
      </main>
    )
  }
}


const MapStateToProps = state => {
  return {
    auth: state.auth,
    admin: state.admin
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getUsers: (token) => {
      adminAction.getUsers(token)
    }
  }
}

export default connect(
  MapStateToProps,
  mapDispatchToProps,
)(Users)