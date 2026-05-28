# Credentials Required

This document lists the credentials needed to work on the Onboarding project.

## GitHub Access for CI/CD

The GitHub access token (PAT) for CI/CD operations is stored exclusively in **Paperclip secrets**. It is **never** hardcoded in repository files, documentation, or configuration.

| Credential | Stored In | Used For |
|------------|-----------|----------|
| **GitHub access token** | Paperclip secrets | CI/CD, automated pushes, workflow dispatch |

### Accessing the Token

When working within the Paperclip environment, the token is available through Paperclip's secret management system. Do **not** copy it into `.env` files, workflow YAML, or documentation.

## GitHub Accounts for Developers

| Credential | Required For | How to Get It |
|------------|-------------|---------------|
| **GitHub account** | Git operations, PR creation | Create at [github.com](https://github.com) |
| **SSH key** (recommended) | SSH git push/pull | Generate with `ssh-keygen`, add public key to GitHub → Settings → SSH keys |

> **Note:** Individual developer PATs should be managed through each developer's own GitHub settings. For automated/CI operations, use the Paperclip secrets token exclusively.
>
> **Warning:** Fine-grained PATs (prefix `github_pat_`) have limited API scope. In testing, the board's fine-grained PAT could push code but **could not create pull requests** via REST or GraphQL API. A classic PAT with `repo` scope is required for programmatic PR creation. Request the board provision one via Paperclip secrets if automated PR creation is needed.

## Responsibilities

The **Board** must:

1. **Create the GitHub repository** — Done: `https://github.com/ovihub/onboarding`
2. **Add team members** — Invite developers/agents to the `ovihub` organization or as collaborators
3. **Maintain the access token in Paperclip secrets** — The board provisions and rotates the token via Paperclip's secret management
4. **Set branch protection rules** — Require PR reviews on `main`

## Verification

To verify your local credentials work for development:

```bash
git clone https://github.com/ovihub/onboarding.git
cd onboarding
echo "test" >> README.md
git add README.md
git commit -m "test: verify credentials"
git push origin main
```

> **Important:** If using HTTPS, configure a credential manager or use SSH. Never embed tokens in remote URLs.

If push succeeds, your local credentials are configured correctly.
