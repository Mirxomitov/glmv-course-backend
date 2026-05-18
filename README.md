# glmv-course-backend

Backend course — one folder per lesson, each self-contained.

## Lessons

| # | Folder | Topic |
|---|--------|-------|
| 01 | [lesson-01-express-api](./lesson-01-express-api) | Express basics: routes, JSON body, env vars, async handlers |
| 02 | [lesson-02-middleware-and-state](./lesson-02-middleware-and-state) | Middleware, in-memory state, race conditions |

## Running a lesson

```bash
cd lesson-01-express-api
npm install
npm run dev   # or: node server.js
```

## Conventions

- Folder naming: `lesson-NN-short-topic/` (zero-padded so they sort correctly).
- Each lesson has its own `package.json` and `node_modules/`; nothing is shared.
- `node_modules/` is gitignored at the root — run `npm install` inside each lesson.
- Add new lessons by copying the previous lesson folder and incrementing the number.
