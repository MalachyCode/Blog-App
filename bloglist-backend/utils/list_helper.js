const dummy = (blogs) => {
  if (blogs) {
    return 1;
  }
};

const totalLikes = (blogs) => {
  const likes = blogs.map((blog) => blog.likes);
  const reducer = (sum, item) => {
    return sum + item;
  };

  return likes.length === 0 ? 0 : likes.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  const likes = blogs.map((blog) => blog.likes);
  const max = Math.max(...likes);
  const mostLikedBlog = blogs.find((blog) => blog.likes === max);

  return {
    _id: mostLikedBlog._id,
    title: mostLikedBlog.title,
    author: mostLikedBlog.author,
    url: mostLikedBlog.url,
    likes: mostLikedBlog.likes,
  };
};

const mostBlogs = (blogs) => {
  // extract all author names from the blogs into an array
  const authors = blogs.map((blog) => blog.author);

  // calculate amount of time each author appears in the authors array gotten above (ie this will give the amount of blogs each author has)
  let blogCount = authors.reduce((accVal, currVal) => {
    accVal[currVal] = (accVal[currVal] || 0) + 1;
    return accVal;
  }, {});

  let authorName;
  let blogsAmount;

  // this somehow stores the author with the highest blogs and the amount of blogs (ie the key-value pair with the max number gotten from reduce function above) to the variables authorName and blogsAmount respectively
  for (let [author, blogs] of Object.entries(blogCount)) {
    authorName = author;
    blogsAmount = blogs;
  }

  console.log(authorName, blogsAmount);
  return {
    author: authorName,
    blogs: blogsAmount,
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
