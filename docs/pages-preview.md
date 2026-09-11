# Publish the portfolio and customer preview together

## Reference implementation

`H-Sami/hektor-chat-pitch` uses `.github/workflows/publish-decks.yml` on `main` to check out all three branches, build each into a separate directory, and upload one combined Pages artifact. Its routes are `/` for `main`, `/demo-v2/` for `demo-v2`, and `/hektor-demo/` for `hektor-demo-sv`. All versions must build successfully before deployment. The older workflow copy on the Swedish branch is not the current main-branch implementation.

The portfolio follows the same pattern, adapted to plain static files:

| Version | Source branch | URL after activation |
| --- | --- | --- |
| Existing portfolio and demos | `main` | `https://raal1600.github.io/ai-agent-portfolio/` |
| Customer website and its demos | `feature/customer-facing-website` | `https://raal1600.github.io/ai-agent-portfolio/preview/` |

These are planned paths until the combined workflow is activated. GitHub Pages does not automatically assign a URL to every branch.

## Review boundaries

The customer feature branch contains the assembly and verification scripts. A separate `feature/pages-branch-preview` branch, based on unchanged `main`, contains only `.github/workflows/publish-portfolio.yml`. This allows review and eventual installation of the workflow without merging the customer homepage into `main`.

The new workflow has **only a manual trigger** and runs only from `main`. Pushing either feature branch cannot deploy it. Unlike Hektor's workflow, this one does not automatically deploy on main pushes; publication remains an explicit step. Both checkouts and all checks are required. A missing branch or failed check prevents upload/deployment, preserving the previously published site. Deployment jobs share the `pages` concurrency group and do not cancel an in-progress deployment.

`build-pages.mjs` copies public assets and pages from main unchanged into the output root. Customer files live entirely inside `preview/`. It rewrites canonical/social metadata only in exported preview files, and gives every preview HTML page `noindex, follow` while the version is under review. Main's index, CSS, scripts, media, and evidence files are verified byte-for-byte against their source. A pre-existing `/preview/` directory on main causes a failure instead of overwriting that path.

Only public site files are copied. Repository metadata, credentials, development docs, dependency directories and tooling are excluded. No new package or paid hosting service is needed. Every run rebuilds the whole site from both branches; neither branch can publish an incomplete site independently.

## Local validation

From the customer worktree, with a separate checkout of current main available:

```sh
npm run check
node --test scripts/build-pages.test.mjs
npm run build:pages -- ../ai-agent-portfolio-pages-preview
npm run check:pages
npm run verify:pages
npm run preview:pages
```

The workflow-only review worktree is a suitable local main source because its website files match main. The built preview is at `http://127.0.0.1:8110/preview/`, with the existing portfolio at `http://127.0.0.1:8110/`. Stop any other preview server using 8110 first. `pages-dist/` is generated and ignored by Git. It can be rebuilt only when empty or marked as this tool's own output.

Validation performed on the prepared version:

- Five Node tests passed for preservation, incomplete branch inputs, an existing preview path, unknown output contents and stale generated files.
- Combined build preserved all 131 selected main files byte-for-byte; the customer export contains 138 source files before preview-only metadata adjustments.
- Static checks passed across 27 HTML pages and 629 local links, assets and fragments, including preview canonical URLs, noindex markers, and exclusion of development files.
- Chrome checks passed at 390px and 1440px for both versions: homepages, all three demo players, chapter seeking, return navigation and transcript query/fragment paths. Preview contact and Hektor transcript fallback worked without JavaScript. No browser errors were observed.
- The workflow parsed successfully with an existing local YAML parser. Its only trigger is manual dispatch, its build is restricted to main, and deployment depends on the complete build. GitHub-hosted execution has not been run because activation is pending approval.

## Activation — requires approval

The initial user instructions explicitly prohibit merging or changing production deployment without approval. Preparation and feature-branch publication do not activate this configuration.

After approval:

1. Review and merge **only** the workflow PR from `feature/pages-branch-preview` into `main`. Keep the customer website branch separate.
2. In Settings → Pages → Build and deployment, change Source to **GitHub Actions**. The current source was verified as legacy branch publishing from `main` at `/`.
3. Open Actions → **Publish portfolio and customer preview** → Run workflow, select **main**, then run it.
4. Wait for the build and deploy jobs to succeed; verify both public URLs and the original demo paths.

The workflow must exist on the default branch before GitHub exposes manual dispatch. The `github-pages` environment must allow deployments from main; existing protections remain in place.

After changes to either branch, run the same workflow from main to refresh both versions. Merely pushing a branch will not refresh Pages with this manual-only configuration.

To return to the original publishing mode, select Deploy from a branch → main → / (root) in Pages settings. That removes the preview from the live site while restoring main's standalone publication. Do not merge the customer branch just to preview it.

References: [Hektor workflow](https://github.com/H-Sami/hektor-chat-pitch/blob/main/.github/workflows/publish-decks.yml), [custom Pages workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages), [manual workflow dispatch](https://docs.github.com/en/actions/how-tos/manage-workflow-runs/manually-run-a-workflow).
