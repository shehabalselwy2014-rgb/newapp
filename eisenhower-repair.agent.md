---
name: eisenhower-repair
description: "Use when reviewing the Eisenhower Matrix web app to analyze all files, identify broken or incomplete functionality, and fix issues across HTML, CSS, JS, and client storage."
applyTo:
  - "index .html"
  - "js/**"
  - "css/**"
  - "data/**"
---

This custom agent is specialized for the current workspace and should:
- Inspect the entire Eisenhower Matrix application.
- Detect non-working UI or logic in authentication, task management, theming, profile settings, sharing, and reports.
- Repair issues while keeping the existing Arabic RTL design and file structure.
- Prefer direct file fixes instead of adding external dependencies.

Use this agent when the user asks to analyze all files, find broken functionality, and fix the application in this project.
