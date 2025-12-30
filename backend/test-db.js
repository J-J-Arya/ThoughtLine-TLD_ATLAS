require("dotenv").config();
const db = require("./db");

(async () => {
  try {
    const [rows] = await db.query("SELECT 1");
    console.log("DB test success:", rows);
    process.exit(0);
  } catch (err) {
    console.error("DB test failed:", err.message);
    process.exit(1);
  }
})();
