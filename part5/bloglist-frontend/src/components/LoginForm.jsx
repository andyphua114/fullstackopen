const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleLogin}>
      <div>
        username
        <input
          type="text"
          value={props.username}
          name="username"
          id="username"
          onChange={({ target }) => {
            props.setUsername(target.value)
          }}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={props.password}
          name="password"
          id="password"
          onChange={({ target }) => {
            props.setPassword(target.value)
          }}
        />
      </div>
      <button id="login-submit" type="submit">
        login
      </button>
    </form>
  )
}

export default LoginForm
