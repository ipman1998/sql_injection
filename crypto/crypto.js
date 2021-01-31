const crypto = require('crypto');

const algorithm = 'aes-256-ctr';
const secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3';
// const iv = crypto.randomBytes(16);
const iv = 'c692e44dbbea073fc1a8d1c37ea68dffa';

const encrypt = (text) => {

    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

    return {
        iv: iv.toString('hex'),
        content: encrypted.toString('hex')
    };
};

const decrypt = (hash) => {

    const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(hash.iv, 'hex'));

    const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);

    return c
};


function encryption(text){
    const cipher = crypto.createCipheriv(algorithm, secretKey, Buffer.from(iv, 'hex'));
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    return encrypted.toString('hex');
  }
  
  function decryption(text){
    const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(iv, 'hex'));
    const decrpyted = Buffer.concat([decipher.update(Buffer.from(text, 'hex')), decipher.final()]);
    console.log(decrpyted.toString());
    return decrpyted.toString();
  }

module.exports = {
    encrypt,
    decrypt,
    encryption,
    decryption
};