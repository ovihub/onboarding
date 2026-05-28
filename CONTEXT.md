# CONTEXT.md — Onboarding Project

## Domain

AI Human software solutions. Onboarding is the initial project repo where all code
lives. Future projects will follow the same structure and workflow conventions.

## Vocabulary

| Term | Meaning |
|------|---------|
| **Board** | Human leadership team with org admin access |
| **Project folder** | A subdirectory under `projects/` — each project gets its own folder |
| **Lead Engineer** | Agent responsible for implementation and GitHub workflow |
| **Quality Reviewer** | Agent responsible for quality review on PRs |
| **Developer** | Any human or agent writing code in this repo |
| **PR** | Pull Request — required for merging into `main` |
| **PAT** | Personal Access Token for GitHub authentication — stored exclusively in Paperclip secrets |
| **ovihub** | GitHub organization name |

## Repo

- **URL**: https://github.com/ovihub/onboarding
- **Visibility**: Public
- **Default branch**: `main`
- **Collaborators needed from Board**: Developers / AI agents must be added as team members

## Folder Convention

All projects live under `projects/<projectname>/`. Each project folder contains its own `src/`, `tests/`, and `docs/` directories. Company-wide configuration (CI/CD, PR templates, CODEOWNERS) lives at the repo root in `.github/`.
