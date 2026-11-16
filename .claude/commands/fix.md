---
description: Fix a bug at its root cause, with a test
---
Fix this bug: $ARGUMENTS

1. Find where it happens: read the code path end to end; reproduce it with a test or a quick run if possible.
2. Name the root cause in one sentence.
3. Make the smallest fix at the cause (one shared place beats patching every caller).
4. Add one test that fails without the fix and passes with it.
5. Run the related tests, then the full suite.
6. Add an entry to .claude/CHANGES.md.
7. Reply in 3–5 lines: cause, fix, files, test results.
