require('dotenv').config();
const app = require('./app');
const prisma = require('./src/core/config/prisma');

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await prisma.$connect();
    console.log('Database connected successfully');
  } catch (error) {
    console.warn('⚠️ Database connection failed. The server is running, but database queries will fail.');
    console.error(error.message || error);
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();

app.on("error", (error) => {
    console.log("Error", error);
});

