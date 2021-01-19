const crypto = require('crypto');

const algorithm = 'aes-256-ctr';
const secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3';
const iv = crypto.randomBytes(16);

let text = "testttttttttttt";
const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

let a = encrypted.toString('hex');
console.log( "log ",encrypted.toString('hex'));
console.log(a)

const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(iv, 'hex'));
const decrpyted = Buffer.concat([decipher.update(Buffer.from(a, 'hex')), decipher.final()]);
console.log(decrpyted.toString());