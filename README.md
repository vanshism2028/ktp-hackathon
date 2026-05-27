# Handshake Redesign — Job Fit & Student-First Experience

A Handshake-style prototype that redesigns the core student job search experience.

## Features

- **Fit Score** — % match on every job with breakdown (major, skills, experience, location, work auth)
- **Why you're seeing this** — explains relevance on each job card
- **Hide low-fit jobs** — filter with adjustable minimum fit % (default 60%)
- **Sort by fit** — rank jobs by relevance
- **At a glance on cards** — pay, work mode, job type, application deadline
- **Application tracker** — pipeline from saved → applied → interview → offer
- **Duplicate apply warning** — alerts when you've already applied to the same employer
- **Profile boost suggestions** — add skills to improve fit on more roles
- **Priority messages** — inbox highlights recruiter messages tied to high-fit jobs

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Demo tips

1. **Jobs** — toggle fit filter, click roles, apply/save
2. **Applications** — see pipeline after applying
3. **Profile** — click "Add skill" (e.g. PyTorch) then return to Jobs — fit scores update
4. **Messages** — priority inbox mock

## Repo

https://github.com/vanshism2028/ktp-hackathon
