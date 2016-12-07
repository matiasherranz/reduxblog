import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import PostIndex from './components/posts_index';
import PostsNew from './components/posts_new';
import PostsShow from './components/posts_show';

// IMPORTANT:
// Map urls to components using Route component. The
// mapping can be nested. Whenever a parent route needs to
// render child components, we need to reference
// this.props.children in its render method
export default (
  <Route path="/" component={App}>
    <IndexRoute component={PostIndex} />
    <Route path="posts/new" component={PostsNew}/>
    <Route path="posts/:id" component={PostsShow}/>
  </Route>
);
// this.props.params.id (handled by react-router)
