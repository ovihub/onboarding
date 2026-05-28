# Onboarding

AI Human software solutions — Onboarding project.

## Quick Start

```bash
git clone https://github.com/ovihub/onboarding.git
cd onboarding
```

## Repository Structure

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

### Active Projects

| Project | Path | Description |
|---------|------|-------------|
| Onboarding | `projects/onboarding/` | Initial company project |

## Developer Workflow

See [docs/DEVELOPER_WORKFLOW.md](docs/DEVELOPER_WORKFLOW.md) for the full workflow including branching strategy, commit conventions, and PR process.

## Credentials

See [docs/CREDENTIALS.md](docs/CREDENTIALS.md) for required credentials and setup instructions.
