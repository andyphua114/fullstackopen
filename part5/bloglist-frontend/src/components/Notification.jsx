const Notification = ({ message }) => {
  let clsName = ''

  if (message === null) {
    return null
  } else if (message.includes('added')) {
    clsName = 'add'
  } else if (message.includes('wrong')) {
    clsName = 'wrong'
  }

  return <div className={clsName}>{message}</div>
}

export default Notification
