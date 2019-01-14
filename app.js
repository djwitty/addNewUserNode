const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const users = require('./user.js');

const nicknameOptions = {
    describe: 'User\'s nickname',
    demand: true,
    alias: 'n'
}
const emailOptions = {
    describe: 'User\'s email',
    demand: true,
    alias: 'e'
}
const argv = yargs
    .command('add', 'Add a new user', {
        nickname: nicknameOptions,
        email: emailOptions
    })
    .command('list', 'List all users')
    .command('read', 'Read a user', {
        nickname: nicknameOptions
    })
    .command('remove', 'Remove user', {
        nickname: nicknameOptions
    })
    .help()
    .argv;
var command = argv._[0];

console.log('Command: ', command);
//console.log('Yargs: ', argv);

if (command === 'add') {
   var user = users.addUser(argv.nickname, argv.email);
   if (user) {
        console.log('User ' + user.nickname + ' created !\nEmail is: ' + user.email);
   } else {
       console.log('User didn\'t create !');
   }
} else if (command === 'list') {
    var allUsers = users.getAll();
    console.log(`Printing ${allUsers.length} user(s).`);
    var i = 1;
    allUsers.forEach((user) => {
        
        var message = allUsers ?
        `${i}: ${user.nickname} printed !` :
        `Do not work !`;
        i++;
    console.log(message);
    });
} else if (command === 'read') {
    var userNickname = users.getUserByNickname(argv.nickname);
    var userEmail = users.getUserByEmail(argv.email);
    if (userNickname) {
        console.log(`User found ! Nickname: ${userNickname.nickname}`);
    } else if (userEmail) {
        console.log(`User found ! Email: ${userEmail.email}`);
    } else {
        console.log('User not found =(');
    }
} else if (command === 'rm' || command === 'remove') {
    var userRemoved = users.rmUser(argv.email);
    var message = userRemoved ?
        'User with email: ' + argv.email + ' has been deleted !' :
        'Sorry, this user already deleted or does not exist !';
    console.log(message);
} else {
    console.log('Command not recognized');
}