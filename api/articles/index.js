import { createServer } from 'json-server';
const server = createServer();
const router = server.router('../../db.json'); // Path to db.json
const middlewares = server.defaults();

server.use(middlewares);
server.use('/api/articles', router);

export default server;
