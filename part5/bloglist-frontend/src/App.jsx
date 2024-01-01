import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import Create from './components/Create';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password
      });

      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (error) {
      setMessage('wrong username or password');
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const handleLogOut = (event) => {
    event.preventDefault();
    window.localStorage.removeItem('loggedBlogUser');
    setUser(null);
  };

  const createFormRef = useRef();

  const createForm = () => (
    <Togglable buttonLabel="new note" ref={createFormRef}>
      <Create
        title={title}
        setTitle={setTitle}
        author={author}
        setAuthor={setAuthor}
        url={url}
        setUrl={setUrl}
        handleCreate={handleCreate}
      />
    </Togglable>
  );

  const handleCreate = async (event) => {
    event.preventDefault();

    const newBlog = {
      title,
      author,
      url
    };

    createFormRef.current.toggleVisibility();
    const returnedBlog = await blogService.create(newBlog);
    setBlogs(blogs.concat(returnedBlog));
    setMessage(`a new blog ${title} by ${author} added`);
    setTimeout(() => {
      setMessage('');
    }, 5000);
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      {!user && (
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      )}
      {user && (
        <div>
          <p>
            {user.name} logged in
            <button type="submit" onClick={handleLogOut}>
              logout
            </button>
          </p>
        </div>
      )}
      {user && createForm()}
      {user && blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
    </div>
  );
};

export default App;
