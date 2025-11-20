const multer = require("multer");

// Use memory storage → file stored in req.file.buffer
const storage = multer.memoryStorage();

const upload = multer({ storage });

module.exports = upload;
