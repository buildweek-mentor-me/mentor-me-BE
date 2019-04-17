// make secret env variable
module.exports = {
  jwtSecret: process.env.JWT_SECRET || 'lambda100500900'
};
