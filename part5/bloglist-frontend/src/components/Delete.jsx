const DeleteBlog = (props) => {
  if (props.blog.user) {
    if (props.blog.user.username === props.user.username) {
      return (
        <div>
          <button onClick={props.handleRemove}>remove</button>
        </div>
      )
    }
  } else {
    return null
  }
}

export default DeleteBlog
