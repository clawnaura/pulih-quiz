# PULIH QUIZ — Live Challenge

Realtime multi-device quiz for BNPB-style events and public engagement.

## Flow
- Host opens `/?role=host`
- A six-digit room PIN is created with 5 starter questions
- Participants open the public root page, enter PIN and nickname
- Host controls question → reveal → Top 10 → next → final podium
- Correct answers score 500–1000 points based on response speed

## Local development
```bash
npm install
npm run dev
```

## Production
Vite static app backed by Supabase Realtime. The frontend uses a Supabase publishable key (safe for public clients); never add a service-role/secret key to this repository.

## Current MVP
Designed for live event testing. Before broad public use, harden host authorization and answer-key access policies so participants cannot query privileged game data directly.
