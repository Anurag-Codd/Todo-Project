import "dotenv/config";
import app from "./app.js";
import http from "node:http";
import { connectDB } from "./config/connectDB.js";

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server listening on Port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error starting server:", err.message);
    process.exit(1);
  });
