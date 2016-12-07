import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchPosts } from '../actions/index';

class PostIndex extends Component {
  componentWillMount() {
    // called only before the first time the component is mounted
    console.log('let us call some action creators.');
    this.props.fetchPosts();
  }

  renderPosts() {
    return this.props.posts.map((post) => {
        return (
          <li className="list-group-item" key={post.id}>
            <Link to={"posts/" + post.id}>
              <strong>{post.title}</strong>
              <span className="float-right">{post.categories}</span>
            </Link>
          </li>
        );
    });
  }

  render() {
    return (
      <div>
        <div className="float-right">
          <Link to="/posts/new" className="btn btn-primary">
            Add a post
          </Link>
        </div>
        <h3> Posts </h3>
        <ul className="list-group">
          {this.renderPosts()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { posts: state.posts.all }
}
// IMPORTANT
// This is the same than the shorcut below:
/*
function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchPosts}, dispatch);
}
export default connect(null, mapDispatchToProps)(PostIndex);
*/
// export default connect(null, { fetchPosts: fetchPosts })(PostIndex);

// or even more concise, using ES6 syntax
export default connect(mapStateToProps, { fetchPosts })(PostIndex);
