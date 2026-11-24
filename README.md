# Executive Functioning module — Seonbi app

A copy of the self-paced Executive Functioning (EF) learning module from the
Seonbi app, kept here under Vanshika's own account so the work stays in her
hands even though `seonbiedu/seonbiapp` has forking disabled.

Source: `seonbiedu/seonbiapp`, main branch, commit
`ad00bff` ("Add self-paced executive functioning module", Nov 23, 2026).
Copied verbatim on Nov 23, 2026. File contents are unchanged from the source;
only this README is new.

## What it is

Seven self-paced lessons for students (ages 11–17) on planning, focus,
memory, organization, and starting/finishing work. Each lesson has an
explanation, a school example, a hands-on exercise, a 3-question quiz, and a
"try this week" action. Progress is stored on-device (AsyncStorage, no
sign-in), lessons unlock in order, and there are parent and "My wins" screens
plus a coaching upsell card.

Lessons: Your Brain's Control Center · Plan It Before You Do It · Time, Tamed ·
Get Organized · Focus Like a Pro · Remember What Matters · Start, Stick, Finish.

Pricing (picked by Joseph, Nov 23, 2026 — Option A): $49 module only ·
$99 module + 1 live session + free consult · $299 module + 2 live sessions +
consult + 2-week check-in.

## Files

- `app/ef/` — routes: `index.tsx` (module home), `[lesson].tsx` (lesson
  screen), `parents.tsx`, `wins.tsx`, `_layout.tsx` (wraps the module in
  `EfProgressProvider`)
- `components/ef/EfScreen.tsx` — screen/card/button/progress-gate/coaching-card
  components and the `EfHomeEntry` link used on the app's Home screen
- `components/ef/EfExercise.tsx` — the per-lesson interactive exercises
  (self-check, assignment plan, schedule planner, 5-minute reset, 10-minute
  focus sprint, chunking memory game)
- `data/efLessons.ts` — all lesson content (text, examples, quizzes, actions)
- `context/EfProgressContext.tsx` — progress state, AsyncStorage persistence
  (`seonbi.ef-progress.v1`), sequential unlocking

## This repo is not a runnable app

These files plug into the Seonbi app. They depend on app code that is **not**
included here:

- Expo SDK 57 / React Native / expo-router
- `@/constants/theme` (colors, `gameCard`, `gameCardInner`, `layout`, `type`)
- `@/components/GameMeter`, `@/components/ScreenHeader`
- `@/lib/time` (`formatClock`)
- Routes `/consult` (coaching card) and `/(tabs)/focus` (Mochi Focus screen)
- Home entry: `EfHomeEntry` is rendered from `app/(tabs)/home.tsx`
- `context/SeonbiAppContext.tsx` in the main app also references
  `EfProgressContext`

## Merging back into seonbiapp

Copy `app/ef`, `components/ef`, `data/efLessons.ts`, and
`context/EfProgressContext.tsx` into `seonbiapp` at the same paths, make sure
`EfHomeEntry` is on the Home screen, then run the repo's checks
(`typecheck`, tests, `web:export`) before committing. The repo's rule is to
commit directly to `main` — no pull requests.
