const IncreaseLike = (props) => {
  return (
    <div>
      likes {props.likes} <button onClick={props.increaseLike}>like</button>
    </div>
  )
}

export default IncreaseLike
