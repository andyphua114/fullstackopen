import { useState } from 'react';
import IncreaseLike from './IncreaseLike';
import blogService from '../services/blogs';

const Blog = ({ blog, blogs, setBlogs }) => {
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
    setBlogs(blogs.map((blog) => (blog.id !== updateId ? blog : returnedBlog)));
  };

  if (!visible) {
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
      </div>
    );
  }
};

export default Blog;
