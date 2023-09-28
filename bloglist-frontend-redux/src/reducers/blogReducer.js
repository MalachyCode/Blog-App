import { createSlice } from '@reduxjs/toolkit';

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    createBlog(state, action) {
      const title = action.payload.title;
      const author = action.payload.author;
      const url = action.payload.url;
      state.push({
        title,
        author,
        likes: 0,
        url,
      });
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    setBlogs(state, action) {
      return action.payload;
    },
    appendComment(state, action) {
      state.blogs.comments.push(action.payload);
    },
  },
});

export const { createBlog, appendBlog, setBlogs, appendComment } =
  blogSlice.actions;
export default blogSlice.reducer;
