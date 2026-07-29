/* =========================================================
   GUESTBOOK — public comments/testimonials, backed by /api/comments
   ========================================================= */

(function () {

  function escapeHTML(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function formatDate(iso) {
    try {
      return new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
    } catch { return ""; }
  }

  async function loadComments() {
    const list = document.getElementById("guestbookList");
    const status = document.getElementById("guestbookStatus");
    if (!list) return;

    try {
      const base = window.API_BASE_URL || "";
      const res = await fetch(`${base}/api/comments`);
      if (!res.ok) throw new Error("failed");
      const data = await res.json();

      if (!data.comments || data.comments.length === 0) {
        list.innerHTML = `<p class="guestbook-empty">No messages yet — be the first to leave one! 🌸</p>`;
      } else {
        list.innerHTML = data.comments.map(c => `
          <div class="guestbook-card reveal">
            <div class="gb-head">
              <span class="gb-name">${escapeHTML(c.name)}</span>
              <span class="gb-date">${formatDate(c.createdAt)}</span>
            </div>
            <p class="gb-message">${escapeHTML(c.message)}</p>
          </div>
        `).join("");
      }
      if (status) status.textContent = `${data.comments.length} message${data.comments.length === 1 ? "" : "s"} so far`;
    } catch (err) {
      list.innerHTML = `<p class="guestbook-empty">Couldn't load messages — backend isn't connected yet. See /backend/README.md.</p>`;
      if (status) status.textContent = "";
    }
  }

  async function submitComment(e) {
    e.preventDefault();
    const form = e.target;
    const note = document.getElementById("guestbookNote");
    const name = form.gbName.value.trim();
    const message = form.gbMessage.value.trim();
    const honeypot = form.gbWebsite.value; // hidden field, bots fill it, humans don't

    if (honeypot) return; // silently drop likely-spam

    if (!name || !message) {
      note.textContent = "Please fill in your name and message.";
      note.className = "form-note error";
      return;
    }
    if (message.length > 600) {
      note.textContent = "Message is a bit long — please keep it under 600 characters.";
      note.className = "form-note error";
      return;
    }

    const submitBtn = form.querySelector("button[type=submit]");
    submitBtn.disabled = true;
    note.textContent = "Sending…";
    note.className = "form-note";

    try {
      const base = window.API_BASE_URL || "";
      const res = await fetch(`${base}/api/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message, gbWebsite: honeypot }),
      });
      if (!res.ok) throw new Error("failed");

      note.textContent = "Thank you! Your message has been posted. 🌸";
      note.className = "form-note success";
      form.reset();
      loadComments();
    } catch (err) {
      note.textContent = "Couldn't post right now — backend isn't connected yet. See /backend/README.md.";
      note.className = "form-note error";
    } finally {
      submitBtn.disabled = false;
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    loadComments();
    const form = document.getElementById("guestbookForm");
    if (form) form.addEventListener("submit", submitComment);
  });

})();
