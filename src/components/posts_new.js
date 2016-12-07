import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';

import { createPost } from '../actions/index';

// IMPORTANT
// With {...title} we are de-structuring the object, here
// accomplishing the passing of every property in the title
// object as key="value" to the input field.
class PostsNew extends Component {
  // Define an object context in the PostsNew class
  static contextTypes = {
    router: PropTypes.object
  };

  onSubmit(props) {
    // `props` parameter holds properties from the form,
    // not this.props.
    this.props.createPost(props)
      .then(() => {
        // blog post has been created, navigate the user to the index.
        // We navigate by calling this.context.router.push with the new
        // path to navigate to.
        this.context.router.push('/');
      });
  };

  render() {
    const { fields: { title, categories, content }, handleSubmit } = this.props;

    return (
      <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
        <h3>Create a new post</h3>
        <div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
          <label>Title</label>
          <input type="text" className="form-control" {...title} />
          <div className="text-help">
            { title.touched ? title.error : '' }
          </div>
        </div>

        <div className={`form-group ${categories.touched && title.invalid ? 'has-danger' : ''}`}>
          <label>Categories</label>
          <input type="text" className="form-control" {...categories}/>
          <div className="text-help">
            { categories.touched ? categories.error : '' }
          </div>
        </div>

        <div className={`form-group ${content.touched && title.invalid ? 'has-danger' : ''}`}>
          <label>Content</label>
          <textarea type="text" className="form-control" {...content}/>
          <div className="text-help">
            { content.touched ? content.error : '' }
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.title) {
    errors.title = "Enter a title";
  }

  if (!values.categories) {
    errors.categories = "Enter some comma-separated categories";
  }

  if (!values.content) {
    errors.content = "Enter some content for the post";
  }
  return errors;
}

// connect: first argument is mapStateToProps; 2nd is mapDispatchToProps
// reduxForm: 1st argument is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps
export default reduxForm({
  form: 'PostsNewForm',
  fields: ['title', 'categories', 'content'],
  validate
}, null, { createPost })(PostsNew);
