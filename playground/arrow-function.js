var square = (x) => x * x;
//console.log(square(9));

var user = {
    name: 'Mike',
    sayHi: () => {
        console.log(`Hi, ${user.name}`);
    },
    sayHiAlt () {
        console.log(arguments);
        console.log(`Hi, ${this.name}`);
    }
};
user.sayHiAlt(1,3,5);