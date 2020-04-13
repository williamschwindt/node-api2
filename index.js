const express = require('express');
const postsRouter = require('./post-router');

const server = express();
const port = 8000;

server.use(express.json());
server.use('/api/posts', postsRouter);

server.listen(port, () => {
    console.log(`server running on port ${port}`)
});