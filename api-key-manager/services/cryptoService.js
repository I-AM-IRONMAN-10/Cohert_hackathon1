const crypto = require("crypto");

// AES-256-CBC requires a 32-byte key and 16-byte IV
// In production, load KEY from environment variable (process.env.CRYPTO_KEY)
const KEY = crypto
  .createHash("sha256")
  .update("hardcodedkey")
  .digest(); // 32-byte Buffer

exports.encrypt = function (text) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-256-cbc", KEY, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  // Store iv:ciphertext so we can decrypt later
  return iv.toString("hex") + ":" + encrypted;
};

exports.decrypt = function (stored) {
  const [ivHex, encrypted] = stored.split(":");
  const iv = Buffer.from(ivHex, "hex");
  const decipher = crypto.createDecipheriv("aes-256-cbc", KEY, iv);
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};