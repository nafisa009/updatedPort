# Backend — AI Assistant + Guestbook API

This is the backend for Nafisa's portfolio. It powers two things on the site:

1. **AI Assistant** (`POST /api/ask`) — answers visitor questions about Nafisa using Claude.
2. **Guestbook** (`GET/POST /api/comments`) — public testimonials wall.

It's a small Node.js + Express server. Static hosts like GitHub Pages **cannot**
run this — GitHub Pages only serves plain HTML/CSS/JS. So this backend needs
to be deployed somewhere that can run Node.js (instructions below, using a
free host).

---

## 1. Get an Anthropic API key

1. Go to **https://console.anthropic.com/** and sign up / log in.
2. Go to **Settings → API Keys → Create Key**.
3. Copy the key (starts with `sk-ant-...`) — you'll paste it in step 3 below.
4. Anthropic API usage is pay-as-you-go, but new accounts get starting credit,
   and a personal portfolio assistant costs a very small amount per question
   (a few hundred questions ≈ a dollar or less on Claude's cheaper models).

---

## 2. Install Node.js (if you don't have it)

Download and install from **https://nodejs.org/** (LTS version). Confirm it worked:

```bash
node -v
npm -v
```

---

## 3. Run the backend locally (to test before deploying)

```bash
cd backend
npm install
cp .env.example .env
```

Open `.env` and paste your real key:

```
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxx
```

Then start the server:

```bash
npm start
```

You should see:

```
✅ Backend running at http://localhost:5000
```

Test it in a **new terminal tab**:

```bash
curl -X POST http://localhost:5000/api/ask \
  -H "Content-Type: application/json" \
  -d '{"question":"What projects has Nafisa built?"}'

curl http://localhost:5000/api/comments
```

If both return JSON (not an error), it's working. The frontend's
`js/config.js` already points to `http://localhost:5000` by default, so if
you open the frontend site while this is running locally, the chat widget
and guestbook will work immediately.

---

## 4. Deploy for free (Render.com)

Render's free tier can run this backend at no cost (it sleeps after 15 minutes
of inactivity and takes ~30–50 seconds to wake up on the next request — that's
normal for free tier, not a bug).

1. Push this whole project (including the `backend/` folder) to a GitHub repo
   — the same one from your GitHub Pages setup, or a separate one, either works.
2. Go to **https://render.com** → sign up (you can use your GitHub account).
3. Click **New +** → **Web Service**.
4. Connect your GitHub repo.
5. Fill in the settings:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free
6. Under **Environment Variables**, add:
   - `ANTHROPIC_API_KEY` → your real key
   - `ALLOWED_ORIGINS` → your GitHub Pages URL, e.g. `https://nafisa009.github.io`
7. Click **Create Web Service**. Wait for the build/deploy to finish (a few minutes).
8. You'll get a live URL like:
   ```
   https://nafisa-portfolio-api.onrender.com
   ```

---

## 5. Connect the frontend to your live backend

Open `frontend/js/config.js` and replace the URL:

```javascript
window.API_BASE_URL = "https://nafisa-portfolio-api.onrender.com";
```

Save, push to GitHub, and GitHub Pages will update automatically. Now the AI
assistant and guestbook on your live site will work for every visitor.

---

## Notes & limitations

- **Guestbook storage**: comments are stored in a JSON file
  (`backend/data/comments.json`) on the server. This is fine for a personal
  portfolio, but on Render's free tier the disk can reset when the service
  redeploys (not on every request — only on a fresh deploy/restart). If you
  want comments to be 100% permanent, swap `commentsStore.js` for a free
  database like **MongoDB Atlas** — only that one file would need to change.
- **Rate limiting**: both endpoints are rate-limited (12 questions/min for
  the AI assistant, 5 posts/min for the guestbook) to prevent abuse and keep
  your Anthropic API costs predictable.
- **Spam protection**: the guestbook form has a hidden honeypot field —
  real visitors never fill it in, but simple bots often do, so those
  submissions are silently dropped.
- **Costs**: the AI assistant uses your Anthropic API key, so each question
  a visitor asks uses a small amount of your API credit. Keep an eye on
  usage at console.anthropic.com if the site gets a lot of traffic.
