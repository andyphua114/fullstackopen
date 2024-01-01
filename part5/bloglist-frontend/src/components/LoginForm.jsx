const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleLogin}>
      <div>
        username
        <input
          type="text"
          value={props.username}
          name="username"
          onChange={({ target }) => {
            props.setUsername(target.value);
          }}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={props.password}
          name="password"
          onChange={({ target }) => {
            props.setPassword(target.value);
          }}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
};

export default LoginForm;
