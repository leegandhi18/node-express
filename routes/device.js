const express = require('express');

const router = express.Router();
const logger = require('../lib/logger');
const { isLoggedIn } = require('../lib/middleware');
const deviceService = require('../service/deviceService');

// 등록
router.post('/', isLoggedIn, async (req, res) => {
  try {
    const params = {
      name: req.body.name,
      deviceModelName: req.body.deviceModelName,
      manufacturer: req.body.manufacturer,
      location: req.body.location,
      edgeSerialNumber: req.body.edgeSerialNumber,
      networkInterface: req.body.networkInterface,
      networkConfig: req.body.networkConfig,
      description: req.body.description,
    };
    logger.info(`(device.reg.params) ${JSON.stringify(params)}`);

    // 입력값 null 체크
    if (!params.name) {
      const err = new Error('Not allowed null (name)');
      logger.error(err.toString());

      res.status(500).json({ err: err.toString() });
    }

    // 비즈니스 로직 호출
    const result = await deviceService.reg(params);
    logger.info(`(device.reg.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

module.exports = router;
