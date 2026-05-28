# Credentials Required

This document lists the credentials needed to work on the Onboarding project.

## GitHub Access

| Credential | Required For | How to Get It |
|------------|-------------|---------------|
| **GitHub account** | All Git operations | Create at [github.com](https://github.com) |
| **Personal Access Token (PAT)** | HTTPS git push/pull | GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic) |
| **SSH key** (alternative to PAT) | SSH git push/pull | Generate with `ssh-keygen`, add public key to GitHub → Settings → SSH keys |

## PAT Scopes Required

The PAT needs these scopes:
- `repo` — full control of private repositories
- `workflow` — update GitHub Action workflows (if CI/CD is used)

## Who Needs to Provide What

The **Board** must:

1. **Create the GitHub repository** — Done: `https://github.com/ovihub/onboarding`
2. **Add team members** — Invite developers/agents to the `ovihub` organization or as collaborators
3. **Provision PATs or SSH keys** — Each developer needs their own credentials
4. **Set branch protection rules** — Require PR reviews on `main`

## Verification

To verify your credentials work:

```bash
git clone https://github.com/ovihub/onboarding.git
cd onboarding
echo "test" >> README.md
git add README.md
git commit -m "test: verify credentials"
git push origin main
```

If push succeeds, credentials are configured correctly.
