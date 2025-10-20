import dotenv from "dotenv";
import app from "./App.js";
import { ConnectDB } from "./config/db.js";

dotenv.config();

ConnectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
