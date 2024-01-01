import { useState } from 'react';
import IncreaseLike from './IncreaseLike';
import blogService from '../services/blogs';
import DeleteBlog from './Delete';

const Blog = ({ blog, blogs, setBlogs, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

  const [visible, setVisible] = useState(false);

  const changeVisbility = () => {
    setVisible(!visible);
  };

  const increaseLike = async (event) => {
    event.preventDefault();
    const updateId = blog.id;
    const likes = blog.likes + 1;
    const updatedObject = {
      user: blog.user.id,
      likes: likes,
      author: blog.author,
      title: blog.title,
      url: blog.url
    };
    const returnedBlog = await blogService.update(blog.id, updatedObject);
    const newBlogList = blogs.map((blog) => (blog.id !== updateId ? blog : returnedBlog));
    newBlogList.sort((a, b) => b.likes - a.likes);
    setBlogs(newBlogList);
  };

  const handleRemove = async (event) => {
    event.preventDefault();
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      const updateId = blog.id;
      const returnedBlog = await blogService.deleteBlog(blog.id);
      const newBlogList = blogs.map((blog) => (blog.id !== updateId ? blog : returnedBlog));
      newBlogList.sort((a, b) => b.likes - a.likes);
      setBlogs(newBlogList);
    }
  };

  if (!visible && blog) {
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author}
        <button onClick={changeVisbility}>view</button>
      </div>
    );
  } else if (visible) {
    let userName = null;
    if (Object.keys(blog).includes('user')) {
      userName = blog.user.name;
    }
    return (
      <div style={blogStyle}>
        <div>
          {blog.title} {blog.author}
          <button onClick={changeVisbility}>hide</button>
        </div>
        <div>{blog.url}</div>
        <IncreaseLike likes={blog.likes} increaseLike={increaseLike} />
        <div>{userName}</div>
        <DeleteBlog user={user} blog={blog} handleRemove={handleRemove} />
      </div>
    );
  }
};

export default Blog;
