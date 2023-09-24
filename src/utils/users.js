const users = []

const addUser =async ( socket_id, username ) => {
  
    // Store user
    const user = { socket_id, username }
    users.push(user)
    return users
}

const removeUser = (socket_id) => {
    const index = users.findIndex((user) => user.socket_id === socket_id)

    if (index !== -1) {
        return users.splice(index, 1)[0]
    }
}

const getUser = (socket_id) => {
    return users.find((user) => user.socket_id === socket_id)
}

const getUsersInRoom = () => {
    //const usersInRoom = []
    return users
}

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}