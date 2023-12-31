const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleLogin}>
      <div>
        username
        <input
          type="text"
          value={props.username}
          name="username"
          onChange={props.handleUsername}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={props.password}
          name="password"
          onChange={props.handlePassword}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
};

export default LoginForm;
