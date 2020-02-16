'use strict';

const jwt = require('jsonwebtoken');
const jwtTokenSecret = process.env.CHS_DEVELOPMENT_JWT_TOKEN_SECRET;
const jwtTokenExpiration = process.env.JWT_TOKEN_EXPIRE || '1d';

exports.generateToken = async data => {
  return jwt.sign(data, jwtTokenSecret, { expiresIn: jwtTokenExpiration });
};

exports.decodeToken = async token => {
  const data = await jwt.verify(token, jwtTokenSecret);

  return data;
};

exports.authorize = function(req, res, next) {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (!token) {
    res.status(401).json({
      message: 'Acesso restrito.',
    }); 
  } else {
    jwt.verify(token, jwtTokenSecret, function(error, decoded) {
      if (error) {
        res.status(401).json({
          message: 'Acesso restrito.',
        });
      } else {
        req.user = decoded;
        next();
      }
    });
  }
};

exports.isSuperAdm = function(req, res, next) {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (!token) {
    res.status(401).json({
      message: 'Acesso restrito.',
    });
  } else {
    jwt.verify(token, jwtTokenSecret, function(error, decoded) {
      if (error) {
        res.status(401).json({
          message: 'Acesso restrito.',
        });
      } else {
        req.user = decoded;
        if (decoded.role.includes('superAdm')) {
          next();
        } else {
          res.status(401).json({
            message: 'Acesso restrito.',
          });
        }
      }
    });
  }
};

exports.isAdm = function(req, res, next) {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (!token) {
    res.status(401).json({
      message: 'Acesso restrito.',
    });
  } else {
    jwt.verify(token, jwtTokenSecret, function(error, decoded) {
      if (error) {
        res.status(401).json({
          message: 'Acesso restrito.',
        });
      } else {
        req.user = decoded;
        if (decoded.role.includes('adm')) {
          next();
        } else {
          res.status(401).json({
            message: 'Acesso restrito.',
          });
        }
      }
    });
  }
};