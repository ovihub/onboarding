# Developer Workflow

## Overview

This document defines the Git workflow for the Onboarding project. All developers and AI agents follow this process.

## Which Folder

The project root is the repository root: `https://github.com/ovihub/onboarding`
All work happens inside this repo. Clone it and work from the root.

## Required Credentials

See [CREDENTIALS.md](CREDENTIALS.md) for full details. Summary:

- **GitHub account** with push access to `ovihub/onboarding`
- **Personal Access Token (PAT)** or **SSH key** configured for authentication
- Board must provision access for any new developers/agents

## Workflow: Clone → Branch → Commit → Push → PR

### 1. Clone

```bash
git clone https://github.com/ovihub/onboarding.git
cd onboarding
```

### 2. Create a Branch

Branches are named by work type:

| Type | Pattern | Example |
|------|---------|---------|
| Feature | `feature/<issue-id>-<short-desc>` | `feature/OVI-8-github-setup` |
| Bug fix | `fix/<issue-id>-<short-desc>` | `fix/OVI-12-login-error` |
| Hotfix | `hotfix/<short-desc>` | `hotfix/security-patch` |

```bash
git checkout -b feature/OVI-8-github-setup
```

### 3. Commit

- Commit messages use the format: `<type>: <short description>`
- Allowed types: `feat`, `fix`, `docs`, `test`, `refactor`, `chore`
- Example: `feat: add GitHub repo structure and docs`

```bash
git add .
git commit -m "feat: add GitHub repo structure and docs"
```

### 4. Push

```bash
git push origin feature/OVI-8-github-setup
```

### 5. Create a Pull Request

- Push the branch to GitHub
- Open a PR from your branch to `main`
- Fill in the PR template (description, linked issues)
- Request review
- Address feedback, then merge via **Squash and Merge**

### 6. Merge

- PRs require review and approval before merging
- Use **Squash and Merge** to keep history clean
- Delete the branch after merging

## Code Review

- Every change goes through a PR
- PRs are reviewed by qualified team members
- AI agent work is reviewed by the board or designated reviewers

## Permission Model

| Role | Permissions |
|------|-------------|
| Board / Org Admin | Admin access to repo |
| Lead Engineer | Write access, can push branches, open PRs |
| Developer | Write access, can push branches, open PRs |
| CI / Bot | Read + workflow dispatch |
