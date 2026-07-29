/* =========================================================
   AI CHAT WIDGET — floating assistant that answers questions
   about Nafisa, powered by the backend /api/ask endpoint.
   ========================================================= */

(function () {

  const SUGGESTIONS = [
    "What projects has she built?",
    "What are her technical skills?",
    "Tell me about her education",
    "How can I contact her?",
  ];

  const WELCOME = "Hi! I'm Nafisa's portfolio assistant 🌸 Ask me anything about her skills, projects, education, or experience.";

  let messages = [{ role: "bot", text: WELCOME }];
  let isOpen = false;
  let isLoading = false;

  function widgetHTML() {
    return `
      <button class="chat-launcher" id="chatLauncher" aria-label="Open AI assistant">
        💬<span class="dot"></span>
      </button>
      <div class="chat-window" id="chatWindow">
        <div class="chat-header">
          <div>
            <div class="chat-header-title">Ask about Nafisa</div>
            <div class="chat-header-sub">AI assistant · trained on her portfolio</div>
          </div>
          <button class="chat-close" id="chatClose" aria-label="Close chat">✕</button>
        </div>
        <div class="chat-messages" id="chatMessages"></div>
        <div class="chat-suggestions" id="chatSuggestions"></div>
        <div class="chat-input-row">
          <input type="text" id="chatInput" placeholder="Type a question…" autocomplete="off">
          <button class="chat-send" id="chatSend" aria-label="Send">➤</button>
        </div>
        <div class="chat-offline-note" id="chatOfflineNote" style="display:none;">
          Backend not connected yet — see /backend/README.md to activate live answers.
        </div>
      </div>
    `;
  }

  function renderMessages() {
    const box = document.getElementById("chatMessages");
    if (!box) return;
    box.innerHTML = messages.map(m => `
      <div class="chat-bubble ${m.role === "user" ? "user" : "bot"}">${escapeHTML(m.text)}</div>
    `).join("") + (isLoading ? `
      <div class="chat-bubble bot typing"><span></span><span></span><span></span></div>
    ` : "");
    box.scrollTop = box.scrollHeight;
  }

  function renderSuggestions() {
    const box = document.getElementById("chatSuggestions");
    if (!box) return;
    if (messages.length > 1) { box.innerHTML = ""; return; }
    box.innerHTML = SUGGESTIONS.map(s => `<button class="chat-suggestion" data-q="${escapeHTML(s)}">${escapeHTML(s)}</button>`).join("");
  }

  function escapeHTML(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  async function sendQuestion(question) {
    if (!question.trim() || isLoading) return;
    messages.push({ role: "user", text: question.trim() });
    isLoading = true;
    renderMessages();
    renderSuggestions();

    const input = document.getElementById("chatInput");
    if (input) input.value = "";

    try {
      const base = window.API_BASE_URL || "";
      const res = await fetch(`${base}/api/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: question.trim() }),
      });

      if (!res.ok) throw new Error("Backend responded with an error");
      const data = await res.json();
      messages.push({ role: "bot", text: data.answer || "Sorry, I couldn't find an answer to that." });
    } catch (err) {
      const note = document.getElementById("chatOfflineNote");
      if (note) note.style.display = "block";
      messages.push({
        role: "bot",
        text: "I can't reach my backend right now, so I can't answer live yet. Once Nafisa deploys the backend (see /backend/README.md), I'll be able to answer questions about her in real time!"
      });
    } finally {
      isLoading = false;
      renderMessages();
    }
  }

  function initWidget() {
    const mount = document.createElement("div");
    mount.id = "chatWidget";
    mount.innerHTML = widgetHTML();
    document.body.appendChild(mount);
    renderMessages();
    renderSuggestions();

    document.getElementById("chatLauncher").addEventListener("click", () => {
      isOpen = !isOpen;
      document.getElementById("chatWindow").classList.toggle("open", isOpen);
      if (isOpen) document.getElementById("chatInput").focus();
    });
    document.getElementById("chatClose").addEventListener("click", () => {
      isOpen = false;
      document.getElementById("chatWindow").classList.remove("open");
    });
    document.getElementById("chatSend").addEventListener("click", () => {
      const input = document.getElementById("chatInput");
      sendQuestion(input.value);
    });
    document.getElementById("chatInput").addEventListener("keydown", (e) => {
      if (e.key === "Enter") sendQuestion(e.target.value);
    });
    document.getElementById("chatSuggestions").addEventListener("click", (e) => {
      const btn = e.target.closest(".chat-suggestion");
      if (btn) sendQuestion(btn.dataset.q);
    });
  }

  document.addEventListener("DOMContentLoaded", initWidget);

})();
