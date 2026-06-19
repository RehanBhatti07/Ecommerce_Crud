const express = require("express");
const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']); // Uses Google and Cloudflare public DNS
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", require("./routes/UserRoute"));
app.use("/api/products", require("./routes/ProductRoute"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server Running On Port ${PORT}`);
});