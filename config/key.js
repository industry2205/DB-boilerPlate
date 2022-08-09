// production은 서버에 띄어진 상태
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./prod');
} else { // Local
  module.exports = require('./dev');
}