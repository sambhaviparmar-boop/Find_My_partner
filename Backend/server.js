require('dotenv').config();
const http = require('http');
const app = require('./app');
const prisma = require('./src/core/config/prisma');
const socketInstance = require('./src/core/socket/socket');

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await prisma.$connect();
    console.log('Database connected successfully');
  } catch (error) {
    console.warn('⚠️ Database connection failed. The server is running, but database queries will fail.');
    console.error(error.message || error);
  }

  const server = http.createServer(app);
  
  // Attach Socket.IO to HTTP server
  socketInstance.init(server);

  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
