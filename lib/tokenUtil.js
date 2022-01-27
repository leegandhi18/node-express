const jwt = require('jsonwebtoken');

const secretKey = '546A576E5A7234753778214125442A472D4B614E645267556B58703273357638';
const options = {
  expiresIn: '2h', // 만료시간
};

const tokenUtil = {
  // 토큰 생성
  makeToken(user) {
    const payload = {
      id: user.id,
      userid: user.userid,
      name: user.name,
      role: user.role,
    };

    const token = jwt.sign(payload, secretKey, options);

    return token;
  },
};

module.exports = tokenUtil;
