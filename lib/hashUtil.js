const crypto = require('crypto');

const iterations = 1005; // 반복횟수(1000번 이상)

const hashUtil = {
  // hash함수 생성
  makePasswordHash(password) {
    return new Promise((resolve, reject) => {
      if (!password) {
        reject(new Error('Not allowed null (password)'));
      }

      // 1. salt 생성
      const salt = crypto.randomBytes(64).toString('base64');

      // 2. hash 생성
      crypto.pbkdf2(password, salt, iterations, 64, 'sha256', (err, derivedKey) => {
        if (err) throw err;

        const hash = derivedKey.toString('hex');

        // 최종 패스워드 (password=salt.hash)
        const encryptedPassword = `${salt}.${hash}`;

        resolve(encryptedPassword);
      });
    });
  },
};

module.exports = hashUtil;
