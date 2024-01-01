import { useState } from 'react';

const Blog = ({ blog }) => {
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
        <div>
          likes {blog.likes} <button>like</button>
        </div>
        <div>{userName}</div>
      </div>
    );
  }
};

export default Blog;
