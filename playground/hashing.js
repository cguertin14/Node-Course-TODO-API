const { SHA256,  } = require('crypto-js');
const jwt = require('jsonwebtoken');

let data = {
    id: 4
};

let token = jwt.sign(data, '123abc');
console.log(token);
console.log(jwt.verify(token, '123abc'));

// let message = 'I am user number 1';
// const hash = SHA256(message);

// console.log('Original:',message);
// console.log('Hashed:',hash);

// let data = {
//     id: 4
// };

// let token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// };

// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.hash)).toString();

// let resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
// if (resultHash === token.hash) {
//     console.log('Data was not changed.');
// } else {
//     console.log('Data was changed (LOOKOUT).');
// }