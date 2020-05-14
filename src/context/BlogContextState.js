// import React, {useState} from 'react';
// import {Text} from 'react-native';
//
// const BlogContext = React.createContext();
//
// export const BlogProvider = ({children}) => {
//   const [blogPosts, setBlogPosts] = useState([]);
//
//   const addBlogPost = () => {
//     setBlogPosts([...blogPosts, {title: `mynum ${blogPosts.length + 1}`}]);
//   };
//   const editBlogPost = console.log(blogPosts);
//   return (
//     <BlogContext.Provider value={{data: blogPosts, addBlogPost: addBlogPost}}>
//       {children}
//     </BlogContext.Provider>;
// };
// export default BlogContext;
