# E2E Workflow Test

This file verifies the full GitHub workflow: clone → branch → commit → push → PR.

- Branch protection: 2 reviews required (Lead Engineer + Quality Reviewer) on develop and main
- CI pipeline runs on PR to develop and main
- PR template applied with review requirements
- Projects live under `projects/<projectname>/`
