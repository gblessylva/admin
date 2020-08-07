import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
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
    if (this.props.match.params.view === 'add' && this.props.admin.articles.filter(p => p.title === this.props.values.title).length > 0) {
      const articles = this.props.admin.articles.filter(p => p.title === this.props.values.title)[0]
      this.props.history.push('/admin/articles/edit/' + articles.id)
    }
    if (this.props.admin.article.id !== props.admin.article.id) {
      //Fires when the reducer changes post in admin
      //also prevents edit post from inherintinmg previous posts state
      this.props.setValues(this.props.admin.article)
    }
  }
  componentDidMount(props, state) {
    if (this.props.match.params.view === 'edit' && this.props.match.params.id) {
      this.props.getSingleArticle(this.props.match.params.id, this.props.auth.token)

    }

  }


  render() {
    const { classes } = this.props
    const isView = this.props.match.params.view === 'edit';
    const isID = this.props.match.params.id

    return (
      <main>
        <Paper>
          <Typography align='center' variant="h6" component="h6">
            {isView && isID ? `${this.props.admin.article.title}` : "Add New Post"}
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
  addArticle: (article, token) => {
    dispatch(AdminAction.addArticle(article, token))
  },
  updateArticle: (id, token) => {
    dispatch(AdminAction.updateArticle(id, token))
  },
  getSingleArticle: (id, token) => {
    dispatch(AdminAction.getSingleArticle(id, token))
  }
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(withFormik({
  mapPropsToValues: (props) => ({
    title: props.admin.article.title || "",
    description: props.admin.article.description || "",
    content: props.admin.article.content || "",
    slug: props.admin.article.slug || "",
    status: props.admin.article.status === true || false,

  }),
  validationSchema: Yup.object().shape({
    title: Yup.string().required('Title is Required'),
    content: Yup.string().required('Add content blocks')
  }),
  handleSubmit: (values, { setSubmitting, props }) => {
    console.log('Saving', values)
    if (props.match.params.view === 'edit') {
      const article = {
        ...values,
        id: props.match.params.id
      }
      props.updateArticle(article, props.auth.token)
    }else {
          props.addArticle(values, props.auth.token)

    }

  }
})(withStyles(styles)((AddArticles)))));