const fs = require('fs');

var fetchUsers = () => {
    try {
        var usersString = fs.readFileSync('users.json');
        return JSON.parse(usersString);
    } catch (e) {
        return [];
    }
};
var saveUsers = (users) => {
    fs.writeFileSync('users.json', JSON.stringify(users));
};

var addUser = (nickname, email) => {
    var users = fetchUsers();
    var user = {
        nickname,
        email
    };
    var dublicateUsers = users.filter(
        (user) => user.email === email
    );

    if (dublicateUsers.length === 0) {
        users.push(user);
        saveUsers(users);
        return user;
    }  
};
var rmUser = (email) => {
    var users = fetchUsers();
    var filteredUsers = users.filter(
        (user) => user.email != email
    );
    saveUsers(filteredUsers);

    return users.length !== filteredUsers.length;
}

var getUserByEmail = (email) => {
    var users = fetchUsers();
    var filteredUsers = users.filter((user) => user.email === email);
    return filteredUsers[0];
}
var getUserByNickname = (nickname) => {
    var users = fetchUsers();
    var filteredUsers = users.filter((user) => user.nickname === nickname);
    return filteredUsers[0];
}
var getAll = () => {
    return fetchUsers();
}

module.exports = {
    addUser,
    getAll,
    getUserByEmail,
    getUserByNickname,
    rmUser
}