const Notification = ({ message }) => {
    if (message === null) {
        return null
    }

    let clsName = ""

    if (message.includes("Added")) {
        clsName = "add"
    }
    else if (message.includes("Deleted")) {
        clsName = "delete"
    }
    else if (message.includes("changed")) {
        clsName = "change"
    }
    else if (message.includes("removed") || message.toLowerCase().includes("validation") || message.includes("missing")) {
        clsName = "error"
    }

    return (
        <div className={clsName}>
            {message}
        </div>
    )
}

export default Notification