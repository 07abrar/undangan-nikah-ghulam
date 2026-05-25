# Undangan Pernikahan — Yasmin & Ghulam Abrar

A personalised digital wedding invitation for **Yasmin Farhana & Ghulam Abrar**, 4 July 2026.

**Live site:** [yasmin-ghulam-undangan.online](https://yasmin-ghulam-undangan.online)

---

## Table of Contents

1. [What it does](#what-it-does)
2. [System architecture](#system-architecture)
3. [Repository layout](#repository-layout)
4. [Frontend deep-dive](#frontend-deep-dive)
5. [Backend deep-dive](#backend-deep-dive)
6. [Guest personalisation flow](#guest-personalisation-flow)
7. [Running locally](#running-locally)
8. [Environment variables](#environment-variables)
9. [Deploying](#deploying)
10. [Seeding guests](#seeding-guests)

---

## What it does

- Renders a full-page, single-scroll wedding invitation in Indonesian.
- Reads a `?to=<token>` query parameter from the URL to greet the specific guest by name on the cover.
- Plays background music (`A Town with an Ocean`) that starts when the guest clicks "Buka Undangan".
- Displays a live countdown to the wedding, venue details, an embedded Google Map, and a Google Calendar link.
- Lets guests submit an RSVP (name, attendance status, message) and shows all past RSVPs in a real-time feed.

---

## System architecture

```
┌──────────────────────────────────────────────────────────┐
│                       Browser                            │
│  URL: yasmin-ghulam-undangan.online/?to=<token>          │
└────────────────────┬─────────────────────────────────────┘
                     │  HTTPS
          ┌──────────▼──────────┐
          │   Vercel CDN / Edge │   (static React SPA)
          │   frontend/         │
          └──────────┬──────────┘
                     │  REST API calls (/api/*)
          ┌──────────▼──────────┐
          │   Railway           │   (FastAPI / uvicorn)
          │   backend/          │
          └──────────┬──────────┘
                     │  SQLAlchemy ORM
          ┌──────────▼──────────┐
          │   PostgreSQL        │   (Railway managed DB)
          │   tables: guests    │
          │           rsvps     │
          └─────────────────────┘
```

**Data flows**

| Action                        | Frontend call             | Backend endpoint    | DB table |
| ----------------------------- | ------------------------- | ------------------- | -------- |
| Guest opens personalised link | `GET /api/guests/{token}` | `routers/guests.py` | `guests` |
| Guest submits RSVP            | `POST /api/rsvp/`         | `routers/rsvp.py`   | `rsvps`  |
| RSVP feed loads               | `GET /api/rsvp/`          | `routers/rsvp.py`   | `rsvps`  |

Local development uses SQLite (`wedding.db`) so no database setup is required.

---

## Repository layout

```
undangan-nikah-ghulam/
├── frontend/                   # React 19 + TypeScript + Vite SPA
│   ├── index.html              # HTML shell — loads /src/main.tsx
│   ├── vite.config.ts          # Vite config; proxies /api → localhost:8000 in dev
│   ├── package.json
│   └── src/
│       ├── main.tsx            # Entry point; mounts <App /> with CSS layers
│       ├── App.tsx             # Root component; section scroll, music, nav state
│       ├── const.ts            # Wedding constants (date, venue, map URL, …)
│       ├── lib/
│       │   └── api.ts          # apiFetch() wrapper (reads VITE_API_BASE_URL)
│       ├── styles/
│       │   ├── tokens.css      # CSS custom properties (colours, spacing, fonts)
│       │   ├── base.css        # Global resets and typography
│       │   └── components.css  # Component-scoped utility classes
│       ├── components/         # Reusable UI atoms
│       │   ├── BotanicalSVG.tsx
│       │   ├── Button.tsx
│       │   ├── CountdownBox.tsx
│       │   ├── GoogleMap.tsx
│       │   ├── MusicPlayer.tsx
│       │   └── NavigationBar.tsx
│       └── pages/              # Full-width invitation sections
│           ├── Cover.tsx       # Hero; resolves guest name from ?to= token
│           ├── Quote.tsx
│           ├── CoupleProfile.tsx
│           ├── EventDetails.tsx # Countdown timer, venue card, schedule
│           ├── Story.tsx
│           ├── RSVP.tsx        # RSVP form + live feed
│           ├── Thanks.tsx
│           └── Footer.tsx
│
└── backend/                    # Python FastAPI service
    ├── main.py                 # App factory; CORS, router registration, DB init
    ├── Procfile                # Railway start command (uvicorn)
    ├── requirements.txt
    ├── guests.csv              # Input: one guest name per row
    ├── guests_with_links.csv   # Output: name, token, personalised URL
    ├── app/
    │   ├── database.py         # SQLAlchemy engine (SQLite locally, Postgres on Railway)
    │   ├── models.py           # ORM models: Guest, RSVP, AttendingChoice enum
    │   ├── schemas.py          # Pydantic request/response schemas
    │   └── routers/
    │       ├── guests.py       # GET /api/guests/{token}
    │       └── rsvp.py         # GET /api/rsvp/  POST /api/rsvp/
    └── scripts/
        └── seed_guests.py      # CSV → DB + guests_with_links.csv generator
```

---

## Frontend deep-dive

### Entry point chain

```
index.html
  └── src/main.tsx        (React root, imports CSS layers in order)
        └── App.tsx        (stateful shell: isOpen, activeSection, isPlaying)
              ├── Cover    (shown before invitation is opened)
              └── after open:
                    ├── NavigationBar  (highlights active section via IntersectionObserver)
                    ├── MusicPlayer    (pauses/resumes on tab visibility change)
                    └── <main>
                          ├── #cover          → Cover (again, inside scroll)
                          ├── #quote          → Quote
                          ├── #couple_profile → CoupleProfile
                          ├── #event_details  → EventDetails
                          ├── #story          → Story
                          ├── #rsvp           → RSVP
                          └── #thanks         → Thanks
                    └── Footer
```

### Key design decisions

- **CSS layer order** — `tokens.css` → `base.css` → `components.css`. Variables are defined once in `tokens.css` and consumed everywhere; no CSS-in-JS.
- **Music autoplay** — started on the first user gesture (`handleOpen`) to satisfy browser autoplay policies. Paused automatically when the browser tab loses focus.
- **Section tracking** — `IntersectionObserver` with `rootMargin: "-50% 0px -50% 0px"` fires when a section crosses the vertical midpoint, keeping the nav dot in sync.
- **API base URL** — `apiFetch` reads `VITE_API_BASE_URL` at build time. If unset, the path is relative (works with the Vite dev-proxy and with Vercel rewrite rules).

---

## Backend deep-dive

### API endpoints

| Method | Path                  | Description                                                      |
| ------ | --------------------- | ---------------------------------------------------------------- |
| `GET`  | `/api/guests/{token}` | Returns `{ name }` for the given 6-char token. 404 if not found. |
| `POST` | `/api/rsvp/`          | Creates an RSVP. Body: `{ name, attending?, message? }`          |
| `GET`  | `/api/rsvp/`          | Returns all RSVPs ordered by `created_at` descending.            |

`attending` is an enum: `"hadir"` · `"tidak_hadir"` · `"mungkin"`.

### Database

- **Local:** SQLite file at `backend/wedding.db` (created automatically on first run).
- **Production:** PostgreSQL provided by Railway via the `DATABASE_URL` environment variable. `database.py` rewrites `postgres://` → `postgresql://` to satisfy SQLAlchemy.

### CORS

Origins are configured via the `ALLOWED_ORIGINS` environment variable (comma-separated). Defaults to `http://localhost:5173` for local development.

---

## Guest personalisation flow

Each guest receives a unique URL such as:

```
https://yasmin-ghulam-undangan.online/?to=a3f9k2
```

1. `Cover.tsx` reads the `to` query parameter on mount.
2. It calls `GET /api/guests/a3f9k2`.
3. The backend looks up the token in the `guests` table and returns the guest's name.
4. The cover displays **"Kepada Yth. \<Guest Name\>"**.
5. If no token is present or the token is invalid, it falls back to `"Tamu Undangan"`.

Tokens are 6 characters, lowercase alphanumeric (`[a-z0-9]{6}`), generated with `secrets.choice` (cryptographically random).

---

## Running locally

### Prerequisites

- Node.js ≥ 18
- Python ≥ 3.11
- `pip` / `venv`

### 1 — Backend

```bash
cd backend
python -m venv venv
# Windows
venv\Scripts\activate
# macOS / Linux
source venv/bin/activate

pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

The API will be available at `http://localhost:8000`. SQLite (`wedding.db`) is created automatically.

### 2 — Frontend

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`. The Vite dev server proxies `/api/*` to `http://localhost:8000`, so no CORS configuration is needed locally.

---

## Environment variables

### Frontend (Vercel)

| Variable            | Purpose                     | Default              |
| ------------------- | --------------------------- | -------------------- |
| `VITE_API_BASE_URL` | Full URL of the backend API | `""` (relative path) |

Set this to your Railway backend URL on Vercel, e.g. `https://your-backend.up.railway.app`.

### Backend (Railway)

| Variable          | Purpose                                | Default                  |
| ----------------- | -------------------------------------- | ------------------------ |
| `DATABASE_URL`    | PostgreSQL connection string           | `sqlite:///./wedding.db` |
| `ALLOWED_ORIGINS` | Comma-separated CORS origins           | `http://localhost:5173`  |
| `PORT`            | Port for uvicorn (injected by Railway) | —                        |

---

## Deploying

### Frontend → Vercel

1. Push the repo to GitHub.
2. Import the project in Vercel; set the **Root Directory** to `frontend`.
3. Add the `VITE_API_BASE_URL` environment variable pointing to your Railway backend.
4. Vercel automatically runs `npm run build` (which executes `tsc -b && vite build`).

### Backend → Railway

1. Import the repo in Railway; set the **Root Directory** to `backend`.
2. Railway reads `Procfile` and runs `uvicorn main:app --host 0.0.0.0 --port $PORT`.
3. Provision a PostgreSQL plugin; Railway injects `DATABASE_URL` automatically.
4. Set `ALLOWED_ORIGINS` to your Vercel frontend URL.

---

## Seeding guests

`backend/scripts/seed_guests.py` reads a CSV of guest names, generates a unique 6-char token for each, inserts them into the `guests` table, and writes a second CSV with the personalised links.

### Input format — `guests.csv`

```
name
Ghulam Abrar
Yasmin Farhana
Tamu Undangan 1
Tamu Undangan 2
...
```

### Running against local SQLite

```bash
cd backend
python scripts/seed_guests.py guests.csv
```

### Running against Railway PostgreSQL

```powershell
$env:DATABASE_URL = "postgresql://postgres:<password>@<host>:<port>/railway"
python .\scripts\seed_guests.py .\guests.csv
```

### Output — `guests_with_links.csv`

```
name,token,url
Ghulam Abrar,a3f9k2,https://yasmin-ghulam-undangan.online/?to=a3f9k2
Yasmin Farhana,b4g0l3,https://yasmin-ghulam-undangan.online/?to=b4g0l3
```

The script is idempotent: re-running it with the same names reuses existing tokens.
