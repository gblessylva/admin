import React, { Component } from 'react';
import { Link as RouterLink } from 'react-router-dom'
import { connect } from 'react-redux'
import TableView from '../common/TableViewer'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import { withStyles } from '@material-ui/core/styles'
import Link from '@material-ui/core/Link'


import * as adminAction from '../store/actions/adminACtions'
const columns = [
  { title: 'ID', field: 'id', render: rowData => <Link to={`/admin/articles/edit/${rowData.id}`} component={RouterLink}>{rowData.id}</Link> },
  { title: 'Title', field: 'title' },
  { title: 'Description', field: 'description', },
  {
    title: 'Content',
    field: 'content',
  },
  {
    title: 'Status',
    field: 'status',
  },
  {
    field: 'edit', render: rowData => <Link to={`/admin/articles/edit/${rowData.id}`} component={RouterLink}>Edit</Link>
  },


]

const styles = theme => ({
  fab: {
    position: 'fixed',
    right: '50px',
    bottom: '50px'
  }

});

class Articles extends Component {

  componentDidMount() {
    this.props.getArticles(this.props.auth.token)
  }
  render() {
    const posts = this.props.admin.articles;
    const { classes } = this.props
    return (

      <main>

        <TableView
          columns={columns}
          data={posts}
          type='Article'
          title='All Post View'
        />
        <Fab
          component={RouterLink}
          to='/admin/articles/add'
          className={classes.fab}
          size="small" color="primary"
          aria-label="add">
          <AddIcon />
        </Fab>
      </main>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    admin: state.admin
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getArticles: (token) => {
      dispatch(adminAction.getArticles(token))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Articles))