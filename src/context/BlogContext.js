import createDataContext from './createDataContext';
import jsonServer from '../api/jsonServer1';

const blogURL = '/api/blogposts';

const blogReducer = (state, action) => {
  switch (action.type) {
    case 'get_blogposts':
      return action.payload;
    // case 'add_blogposts':
    //     return ([...state,
    //         {
    //             //id: Math.floor(Math.random() * 99999),
    //             title: action.payload.title,
    //             content: action.payload.content
    //         }]);

    case 'delete_blogpost':
      return state.filter((blogPost) => blogPost._id !== action.payload);
    case 'edit_blogpost':
      return state.map((blogPost) => {
        return blogPost.id === action.payload.id ? action.payload : blogPost;
        //  if (blogPost.id === action.payload.id) {
        //        return action.payload
        //   }else {
        //      return blogPost;
        //   }
      });
    default:
      return state;
  }
};

const getBlogPost = (dispatch) => {
  return async () => {
    const response = await jsonServer.get(blogURL);
    dispatch({type: 'get_blogposts', payload: response.data});
  };
};

const addBlogsPost = (dispatch) => {
  return async (title, content, callback) => {
    await jsonServer.post(blogURL, {title, content});
    //  dispatch({type: 'add_blogposts', payload: {title: title, content: content}});
    if (callback) {
      callback();
    }
  };
};

const deleteBlogPost = (dispatch) => {
  return async (_id) => {
    await jsonServer.delete(`${blogURL}/${_id}`);
    dispatch({type: 'delete_blogpost', payload: _id});
  };
};

const editBlogsPost = (dispatch) => {
  return async (title, content, _id, callback) => {
    await jsonServer.put(`${blogURL}/${_id}`, {title, content});
    // dispatch({type: 'edit_blogpost', payload: {_id: _id, title: title, content: content}});
    if (callback) {
      callback();
    }
  };
};

export const {Context, Provider} = createDataContext(
  blogReducer,
  {addBlogsPost, deleteBlogPost, editBlogsPost, getBlogPost},
  [],
);
