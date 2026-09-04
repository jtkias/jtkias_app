# JTKias landing page — setup guide

This gets you two things running:
1. **The sign-up form** — saves every sign-up to a Google Sheet and auto-sends a confirmation email, using a free Google Apps Script (no paid service needed).
2. **The site itself** — live on GitHub Pages, free.

Do Part A first — the site won't be able to *save* sign-ups without it. Part B puts the whole thing online.

---

## Part A — the sign-up autoresponder (Google Sheets + Apps Script)

### A1. Create the spreadsheet
1. Go to [sheets.google.com](https://sheets.google.com) and create a **new blank spreadsheet**.
2. Name it something like `JTKias Sign-ups`.
3. Leave it empty — the script fills in the header row itself the first time someone signs up.

### A2. Open the script editor
1. In that spreadsheet, click **Extensions → Apps Script**.
2. A new tab opens with an empty code editor (a file called `Code.gs`).
3. Delete anything already in the editor.
4. Open `apps-script/Code.gs` from this repo, copy **all** of it, and paste it into the editor.
5. Click the disk icon (or Ctrl/Cmd+S) to save. Give the project a name when asked, e.g. `JTKias signup handler`.

If you want to change what the confirmation email says, edit the `EMAIL_SUBJECT` and `EMAIL_BODY` lines near the top before you deploy.

### A3. Deploy it as a Web App
1. Top-right of the Apps Script editor: click **Deploy → New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Fill in:
   - **Description**: `JTKias signup v1` (anything you like)
   - **Execute as**: **Me** (your Google account)
   - **Who has access**: **Anyone**
4. Click **Deploy**.
5. Google will ask you to **authorize** the script (since it sends email and edits the sheet on your behalf). Click through:
   - "Authorize access" → pick your Google account
   - You'll likely see an "unverified app" warning — this is normal for a script you wrote yourself. Click **Advanced** → **Go to JTKias signup handler (unsafe)** → **Allow**.
6. After it deploys, you'll see a **Web app URL** that looks like:
   ```
   https://script.google.com/macros/s/AKfycb.../exec
   ```
   **Copy this whole URL.** This is the only thing you need from Part A.

### A4. Connect it to the site
1. Open `js/main.js` in this repo.
2. Near the top, find this line:
   ```js
   var SCRIPT_URL = 'PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE';
   ```
3. Replace the placeholder text with the URL you copied in A3, so it looks like:
   ```js
   var SCRIPT_URL = 'https://script.google.com/macros/s/AKfycb.../exec';
   ```
4. Save the file.

That's it — every sign-up now lands as a new row in your Google Sheet, and the person gets an automatic confirmation email.

**Test it before you launch:** open `index.html` on your computer (double-click it, or use the live server your editor offers), fill in the form with your own name and email, and submit. Check your Google Sheet for the new row, and check your inbox for the confirmation email. If nothing shows up, re-read step A3 — it's almost always the "Execute as / Who has access" settings.

> **If you ever update the script later** (change the email text, add a field), you must create **another** deployment: Deploy → Manage deployments → the pencil/edit icon → change "Version" to **New version** → Deploy. Just saving the code isn't enough to update a *live* deployment.

---

## Part B — putting the site on GitHub Pages

### B1. Create the repository
1. Go to [github.com/new](https://github.com/new).
2. Name it whatever you like (e.g. `jtkias-landing`). Keep it **Public** (required for free GitHub Pages).
3. Click **Create repository**.

### B2. Upload the files
Easiest way, no command line needed:
1. On your new repo's page, click **Add file → Upload files**.
2. Drag in **everything** from this folder — keeping the folder structure:
   ```
   index.html
   thank-you.html
   SETUP.md
   css/style.css
   js/main.js
   assets/…  (all subfolders: covers, music, branding, phones)
   ```
   GitHub Pages needs `index.html` at the root, and the `css/`, `js/`, `assets/` folders sitting right next to it — don't upload them into a subfolder.
3. Click **Commit changes**.

### B3. Turn on GitHub Pages
1. In the repo, go to **Settings → Pages** (left sidebar).
2. Under "Build and deployment" → **Source**, choose **Deploy from a branch**.
3. Under "Branch", choose `main` and folder `/ (root)`. Click **Save**.
4. Wait about a minute, then refresh the page — it'll show your live URL, something like:
   ```
   https://yourusername.github.io/jtkias-landing/
   ```

That's your landing page, live. Share that link anywhere.

### B4. Double-check the links
Two links in this site point at your existing app and WhatsApp — make sure they're still correct before you launch:
- **The app link**: `https://ndambachirashwa.github.io/one/` — appears in `index.html` (header button), `thank-you.html`, and `apps-script/Code.gs` (the `APP_LINK` variable, used in the confirmation email).
- **Your WhatsApp number**: `https://wa.me/263787726262` — appears in `index.html` and `thank-you.html` footers, and in `apps-script/Code.gs` (`WHATSAPP_LINK`).

If either changes, search for it across those files and update all the places it appears.

---

## Updating content later

- **Book covers**: each cover in `assets/covers/` and `assets/music/` is a plain rectangle image — replace the file (keep the same filename) and it updates everywhere it's used. Aim for roughly the same shape as the original (book covers are portrait/3:4-ish) so they don't look stretched.
- **Copy/text**: everything is plain text inside `index.html` and `thank-you.html` — open either in any text editor and edit directly.
- **Colors/fonts**: all controlled from the top of `css/style.css`, in the `:root { … }` block.
