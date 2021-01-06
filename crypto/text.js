const { encrypt, decrypt } = require('./crypto');

const readline = require('readline-sync');
// const hash = encrypt('Hello World!');


let tk = readline.question("nhap vao tk :");
let mk = readline.question("nhap mat khau: ");

const hash = encrypt(mk)
console.log("tai khoan la :", tk);
console.log("mat khau sau khi encrypt", hash);

const text = decrypt(hash);

console.log("mat khau sau decrypt la :", text); // Hello World!
