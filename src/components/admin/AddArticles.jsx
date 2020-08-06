import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux';
import { withFormik, Form } from 'formik';
import { FormikTextField, FormikSelectField } from 'formik-material-fields';

import * as Yup from 'yup';

import * as AdminAction from '../store/actions/adminACtions'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save'



const styles = theme => ({
  container: {
    margin: theme.spacing(3),
    display: 'flex',
    flexDirection: 'row',
    justifyConten: 'flex-start'
  },
  formControl: {
    margin: theme.spacing(3)
  },
  leftColumn: {
    flex: 6,
    height: '100%',
    margin: theme.spacing(1),
    padding: theme.spacing(3),

  },
  rightColumn: {
    flex: 1,
    height: '100%',
    margin: theme.spacing.unit * 1,
    padding: theme.spacing.unit * 3
  }



})

class AddArticles extends Component {
  componentDidUpdate(props, state) {
    if (this.props.match.params.view === 'add' && this.props.admin.articles.filter(p =>  p.title === this.props.values.title ).length > 0) {
      const articles = this.props.admin.articles.filter(p=>p.title===this.props.values.title)[0]
      this.props.history.push('/admin/articles/edit/'+articles.id)
    }
  }
  render() {
    const { classes } = this.props

    return (
      <main>
        <Paper>
          <Typography align='center' variant="h4" component="h4">
            Add new Post
          </Typography>

          <Form className={classes.container}>

            <Paper className={classes.leftColumn}>

              <FormikTextField

                name="title"
                label="Post Title"
                margin="normal"
                fullWidth
              />
              <FormikTextField

                name="slug"
                label="Post Slug"
                margin="normal"

              />
              <FormikTextField

                name="content"
                label="Post Content"
                margin="normal"
                fullWidth
              />
            </Paper>
            <Paper className={classes.rightColumn}>
              <FormikSelectField
                name="status"
                label="Status"
                margin="normal"
                options={[
                  { label: 'Unpublished', value: false },
                  { label: 'Published', value: true },

                ]}
                fullWidth
              />
              <Button
                variant="contained"
                color="primary"
                onClick={e => this.props.handleSubmit()}
                startIcon={<SaveIcon />}
              >  Publish</Button>
            </Paper>
          </Form>
        </Paper>
      </main>
    )
  }

}

const mapStateToProps = state => ({
  auth: state.auth,
  admin: state.admin
})

const mapDispatchToProps = dispatch => ({
  addArticles: (articles, token) => {
    dispatch(AdminAction.addArticles(articles, token))
  }
})

export default withRouter (connect(
  mapStateToProps,
  mapDispatchToProps,
)(withFormik({
  mapPropsToValues: () => ({
    title: "",
    description: "",
    content: "",
    slug: "",
    createdAt: "",
    status: false

  }),
  validationSchema: Yup.object().shape({
    title: Yup.string().required('Title is Required'),
    content: Yup.string().required('Add content blocks')
  }),
  handleSubmit: (values, { setSubmitting, props }) => {

    props.addArticles(values, props.auth.token)
    console.log('fired', props.addArticles)
  }
})(withStyles(styles)((AddArticles)))));