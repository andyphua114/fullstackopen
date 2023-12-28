const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  let likes = 0;
  blogs.forEach((blog) => {
    likes += blog.likes;
  });
  return likes;
};

const favoriteBlog = (blogs) => {
  let favoriteBlogIdx = 0;
  let favoriteBlogLikes = blogs[0].likes;
  blogs.forEach((blog, index) => {
    if (blog.likes > favoriteBlogLikes) {
      favoriteBlogLikes = blog.likes;
      favoriteBlogIdx = index;
    }
  });
  const favorite = {
    title: blogs[favoriteBlogIdx].title,
    author: blogs[favoriteBlogIdx].author,
    likes: blogs[favoriteBlogIdx].likes,
  };
  return favorite;
};

const mostBlogs = (blogs) => {
  const authorBlogs = {};
  blogs.forEach((blog) => {
    if (!Object.keys(authorBlogs).includes(blog.author)) {
      authorBlogs[blog.author] = 1;
    } else authorBlogs[blog.author] += 1;
  });
  const maxBlogs = Math.max(...Object.values(authorBlogs));
  const author = Object.keys(authorBlogs).find(
    (key) => authorBlogs[key] === maxBlogs
  );
  return {
    author: author,
    blogs: authorBlogs[author],
  };
};

const mostLikes = (blogs) => {
  const authorLikes = {};
  blogs.forEach((blog) => {
    if (!Object.keys(authorLikes).includes(blog.author)) {
      authorLikes[blog.author] = blog.likes;
    } else authorLikes[blog.author] += blog.likes;
  });
  const maxLikes = Math.max(...Object.values(authorLikes));
  const author = Object.keys(authorLikes).find(
    (key) => authorLikes[key] === maxLikes
  );
  return {
    author: author,
    likes: authorLikes[author],
  };
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
