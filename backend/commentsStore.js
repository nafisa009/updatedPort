/* =========================================================
   Simple file-based store for guestbook comments.
   Good enough for a personal-portfolio scale guestbook.

   NOTE: on free hosting tiers the disk can be wiped on
   redeploy (not on every request — only when you push new
   code / the service restarts fresh). For something more
   durable, swap this out for MongoDB Atlas's free tier —
   the two functions below (readAll / addComment) are the
   only place you'd need to change.
   ========================================================= */

const fs = require("fs");
const path = require("path");

const DB_FILE = path.join(__dirname, "data", "comments.json");

function ensureFile() {
  const dir = path.dirname(DB_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(DB_FILE)) fs.writeFileSync(DB_FILE, "[]", "utf-8");
}

function readAll() {
  ensureFile();
  try {
    const raw = fs.readFileSync(DB_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    return [];
  }
}

function addComment({ name, message }) {
  ensureFile();
  const comments = readAll();
  const comment = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
    name,
    message,
    createdAt: new Date().toISOString(),
  };
  comments.unshift(comment); // newest first
  fs.writeFileSync(DB_FILE, JSON.stringify(comments, null, 2), "utf-8");
  return comment;
}

module.exports = { readAll, addComment };
