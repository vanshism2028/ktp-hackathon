# Handshake Redesign — Job Fit Score

A Handshake-style student jobs experience with an integrated **Fit Score** showing how well each role matches the student's profile.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Fit Score feature

Each job shows a **percentage match** based on:

- **Major** alignment
- **Skills** (required + preferred vs. profile)
- **Experience level** (intern vs. entry vs. mid)
- **Location & job type** preferences
- **Work authorization**

Toggle **Sort by fit** to rank jobs by relevance. Open any job to see the full breakdown panel.

## Demo profile

Edit `src/data/profile.ts` to change the student (major, skills, grad year, etc.) and watch fit scores update.

## Team

Built for the KTP mini hackathon — redesigning Handshake's core job discovery experience.
