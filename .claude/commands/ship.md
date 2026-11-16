---
description: Final checks, change log, commit (push only if asked)
---
Get the current work ready to ship. $ARGUMENTS

1. Run lint/typecheck and the full test suite; stop and report if anything fails.
2. Check git status: no secrets, .env files, build output or large files staged.
3. Make sure .claude/CHANGES.md has an entry for this work.
4. Commit with a clear message (what and why).
5. Push only if the arguments above say "push". Never force-push.
6. Reply with the commit hash and a one-line summary.
