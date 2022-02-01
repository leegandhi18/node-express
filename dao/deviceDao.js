const { Op } = require('sequelize');
const { Device } = require('../models/index');

const dao = {
  // 등록
  insert(params) {
    return new Promise((resolve, reject) => {
      Device.create(params).then((inserted) => {
        resolve(inserted);
      }).catch((err) => {
        reject(err);
      });
    });
  },
};

module.exports = dao;
