import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { withFormik, Form } from 'formik';
import { FormikTextField, FormikSelectField } from 'formik-material-fields';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import * as Yup from 'yup';

import * as AdminAction from '../store/actions/adminACtions'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save'

import API from '../utililty/api'

/* global $ */


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
    margin: theme.spacing(1),
    padding: theme.spacing(3)
  },
  uploadBTN: {
    marginTop: theme.spacing(3)
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
  uploadImage = (e) => {
    const data = new FormData();
    data.append('file', e.target.files[0], new Date().getTime().toString() + e.target.files[0].name);
    this.props.uploadImage(data, this.props.auth.token, this.props.admin.article.id, this.props.auth.user.userId)
  }

  modules = {

    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }, { 'font': [] }],
      [{ size: [] }],
      [{ 'color': [] }, { 'background': [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote', { 'align': [] },  'code-block'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' },
      { 'indent': '-1' }, { 'indent': '+1' }],
    ['link', 'image', 'video'],
      [{ 'align': '' }, { 'align': 'center' }, { 'align': 'right' }, { 'align': 'justify' }]
      ['clean']
    ],
    clipboard: {
      matchVisual: false,
    }


  }
  formats = [

    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video',
    'background', 'code-block', 'color', 'align',
  ]
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

                name="description"
                label="Post Description"
                margin="normal"

              />
              <FormikTextField

                name="content"
                label="Post Content"
                margin="normal"
                fullWidth
              />
              <ReactQuill
                placeholder='Your content goes here'
                modules={this.modules}
                formats={this.formats}
                value={this.props.values.content}
                onChange={val => { this.props.setFieldValue('content', val) }}

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
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={e => this.props.handleSubmit()}
                  startIcon={<SaveIcon />}
                >  Publish</Button>

              </div>
              <div className="featured-iamge-thumb">

                {this.props.admin.article.ArticleImage ?
                  this.props.admin.article.ArticleImage.length > 0 ?
                    <img src={this.props.admin.article.ArticleImage} className={classes.postImage} alt='featured' />
                    : <p>Add Featured Image</p>
                  : null
                }
              </div>
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={e => {
                    $('.MyFile').trigger('click');
                  }}
                ><SaveIcon /> Featured Image</Button>
                <input type="file" style={{ display: 'none' }} className="MyFile" onChange={this.uploadImage} />
              </div>
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
  },
  uploadImage: (data, token, articleId, userId) => {
    dispatch(AdminAction.uploadImage(data, token, articleId, userId))
  }
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(withFormik({
  mapPropsToValues: (props) => ({
    title:  '',
    description:  "",
    content:  "",
    slug:  "",
    status: true,
    createdAt: new Date(),
    ArticleImage: ''

  }),
  validationSchema: Yup.object().shape({
    title: Yup.string().required('Title is Required'),
    content: Yup.string().required('Add content blocks')
  }),
  handleSubmit: (values, { setSubmitting, props }) => {
    const URI = 'http://localhost:4040'
      const fresharticle = {
        ...values,
        ArticleImage: URI + props.admin.article.ArticleImage[0].url
      }
      props.addArticle(fresharticle, props.auth.token)

  }
})(withStyles(styles)((AddArticles)))));