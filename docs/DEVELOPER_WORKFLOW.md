# Developer Workflow

## Overview

This document defines the Git workflow for the Onboarding project. All developers and AI agents follow this process.

## Which Folder

The repository root is: `https://github.com/ovihub/onboarding`

All projects live under `projects/<projectname>/`. Each project has its own `src/`, `tests/`, and `docs/` directories.

```
onboarding/
├── .github/              # CI/CD, PR templates, CODEOWNERS (company-wide)
├── docs/                 # Company-level documentation
├── CONTEXT.md            # Project vocabulary and conventions
├── README.md             # Company overview
├── .gitignore
└── projects/             # All projects live here
    └── <projectname>/    # One folder per project
        ├── src/          # Project source code
        ├── tests/        # Project tests
        └── docs/         # Project-specific docs
```

## Required Credentials

See [CREDENTIALS.md](CREDENTIALS.md) for full details. Summary:

- **GitHub account** with push access to `ovihub/onboarding`
- **Personal Access Token (PAT)** or **SSH key** configured for authentication
- Board must provision access for any new developers/agents

## Branching Strategy

The repository uses a three-branch model:

```
feature/*  →  develop  →  main
hotfix/*   →  main (emergency only)
```

| Branch | Purpose | Protection |
|--------|---------|------------|
| `develop` | Integration branch for all completed features | Require PR + 2 approvals |
| `main` | Production-ready code | Require PR + 2 approvals + CI pass |
| `feature/*` | Individual feature work | No protection (developer workspace) |
| `fix/*` | Bug fixes | No protection (developer workspace) |
| `hotfix/*` | Emergency production fixes | Merges directly to `main` |

### Review Requirements per Merge Path

| Merge Path | Reviewers Required |
|------------|--------------------|
| `feature/*` → `develop` | Lead Engineer **+ Quality Reviewer** (2 approvals) |
| `fix/*` → `develop` | Lead Engineer **+ Quality Reviewer** (2 approvals) |
| `develop` → `main` | Lead Engineer **+ Quality Reviewer** (2 approvals) |
| `hotfix/*` → `main` | Lead Engineer **+ Quality Reviewer** (2 approvals) |

> **Note:** A single person cannot fulfill both the Lead Engineer and Quality Reviewer roles on the same PR.

## Workflow: Clone → Branch → Commit → Push → PR

### 1. Clone

```bash
git clone https://github.com/ovihub/onboarding.git
cd onboarding
```

### 2. Create a Branch

Always branch from the correct base:
- Features and fixes branch from `develop`
- Hotfixes branch from `main`

Branches are named by work type:

| Type | Pattern | Base Branch | Example |
|------|---------|-------------|---------|
| Feature | `feature/<issue-id>-<short-desc>` | `develop` | `feature/OVI-8-github-setup` |
| Bug fix | `fix/<issue-id>-<short-desc>` | `develop` | `fix/OVI-12-login-error` |
| Hotfix | `hotfix/<short-desc>` | `main` | `hotfix/security-patch` |

```bash
git checkout develop
git pull origin develop
git checkout -b feature/OVI-8-github-setup
```

### 3. Work in the Correct Project Folder

Navigate to the project folder for your work. For the Onboarding project:

```bash
cd projects/onboarding
# Make changes in src/, tests/, or docs/
```

### 4. Commit

- Commit messages use the format: `<type>: <short description>`
- Allowed types: `feat`, `fix`, `docs`, `test`, `refactor`, `chore`, `ci`
- Example: `feat: add GitHub repo structure and docs`

```bash
git add .
git commit -m "feat: add GitHub repo structure and docs"
```

### 5. Push

```bash
git push origin feature/OVI-8-github-setup
```

### 6. Create a Pull Request

- Push the branch to GitHub
- Open a PR targeting the correct base branch (`develop` or `main`)
- Fill in the PR template (description, linked issues)
- Request review from both required reviewers (Lead Engineer + Quality Reviewer)
- Address feedback, then, once approved, merge via **Squash and Merge**
- Delete the branch after merging

## Code Review Process

Every change goes through a PR. The review process works as follows:

1. **Developer** opens PR and fills in the template
2. **Lead Engineer** reviews for technical correctness, architecture alignment, and code quality
3. **Quality Reviewer** reviews for test coverage, edge cases, documentation, and spec compliance
4. Both reviewers must approve before the PR can be merged
5. CI must pass (lint, build, test) — status checks are enforced by branch protection

### Review Checklist

- [ ] Code is readable and follows project conventions
- [ ] Tests cover new/changed functionality
- [ ] Documentation updated if needed
- [ ] No secrets or credentials in code
- [ ] Commit messages follow convention
- [ ] CI pipeline passes (lint, build, test)

## Release Process (develop → main)

When features on `develop` are ready for production:

1. Create a PR from `develop` to `main`
2. Fill in the PR template with release notes summary
3. Get approval from Lead Engineer + Quality Reviewer
4. Ensure CI passes
5. Merge via **Squash and Merge**
6. Tag the merge commit with a semantic version: `v1.2.3`
7. The `release.yml` workflow automatically creates a GitHub Release

## Permission Model

| Role | Permissions |
|------|-------------|
| Board / Org Admin | Admin access to repo |
| Lead Engineer | Write access, can push branches, open PRs, review |
| Quality Reviewer | Write access, can review and approve PRs |
| Developer | Write access, can push branches, open PRs |
| CI / Bot | Read + workflow dispatch |
