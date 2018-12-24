console.log('Starting app...');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const users = require('./user.js');

const argv = yargs.argv;
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
    users.getAll();
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
        'User with email: ' + argv.email + ' has been delated !' :
        'Sorry, this user already deleted or does not exist !';
    console.log(message);
} else {
    console.log('Command not recognized');
}