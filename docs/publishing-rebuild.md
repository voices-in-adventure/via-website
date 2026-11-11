# How publishing reaches the live site

## The short version

When an editor clicks **Publish** in Sanity Studio, the live site updates on
its own about a minute later. Nobody needs to touch this repo or Vercel.

## Why a rebuild is needed at all

The VIA site is a *static* site. Vercel doesn't ask Sanity for content each
time someone visits a page. Instead, it asks once, during a build, and saves
every page as a finished file. That is what makes the site fast and cheap
to run, but it also means **new content only appears after a new build**.

Builds used to happen only when code was pushed to GitHub. So for a while,
editors could publish in Sanity and nothing changed on the site. That's the
problem this setup fixes.

## The two pieces

1. **Vercel deploy hook.** A private URL that starts a fresh production
   build of the `main` branch when called.
   Where: Vercel → the `via-website` project → Settings → Git → Deploy Hooks.

2. **Sanity webhook.** Calls the deploy hook whenever published content
   changes.
   Where: [sanity.io/manage](https://www.sanity.io/manage) → the VIA project →
   API → Webhooks → **"Rebuild site on Vercel"**.

   Its settings:

   | Setting | Value |
   | --- | --- |
   | Dataset | `production` |
   | Trigger on | Create, Update, Delete |
   | Filter | `!(_id in path("drafts.**"))`, so published documents only |
   | Drafts | Off |
   | Versions (Releases) | Off |
   | HTTP method | POST |
   | URL | the Vercel deploy hook URL |

Saving a draft does **not** rebuild the site. Only Publish, Unpublish and
Delete do.

## Things worth knowing

- **Timing.** A build takes roughly a minute. If an editor publishes several
  pieces quickly, Vercel may run a few builds back to back. That's harmless.
- **Scheduled pieces.** Articles with a future `publishedAt` are hidden until
  that time. Nothing rebuilds the site when that moment arrives, so the piece
  appears with the next publish or deploy. If scheduling becomes common, add
  a daily scheduled build. Vercel can call the same deploy hook on a timer.
- **The hook URL is a secret.** Anyone who has it can trigger builds. It lives
  only in the Sanity webhook settings and in Vercel. Never put it in this
  repo. If it leaks, delete the hook in Vercel, create a new one, and paste
  the new URL into the Sanity webhook.

## If published content isn't showing up

1. In Sanity → API → Webhooks → "Rebuild site on Vercel", open **Attempts
   log**. Failed attempts show an error there.
2. In Vercel → Deployments, check whether a deployment started at the time
   of the publish, and whether it failed.
3. Make sure the webhook isn't disabled and still points at a deploy hook
   that exists in Vercel.
4. Make sure `PUBLIC_SANITY_DATASET` in Vercel's environment variables is
   `production`, the same dataset the Studio publishes to.

## How it was set up

The webhook was created on 2026-11-11 through Sanity's management API (the
equivalent of filling in the form at sanity.io/manage). To recreate it by
hand, use the settings in the table above.
