const { createServer } = require('json-server');
const server = createServer();
const router = server.router('db.json'); // Path to db.json
const middlewares = server.defaults();

server.use(middlewares);
server.use('/api/articles', router);

module.exports = server;
