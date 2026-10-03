# Senpar — Family Information Vault (TEST MODE)

A secure family information vault (passwords, devices, subscriptions, notes, family members).
Built with Next.js, Auth.js v5, Prisma. Danish/English i18n. TEST MODE / demo data only.

## Setup

1. Copy `.env.example` to `.env` and fill in real values.
2. Install dependencies: `yarn install`
3. Generate the database client: `yarn prisma generate`
4. Apply the schema: `yarn prisma db push`
5. (Optional) Seed demo data: `yarn tsx scripts/seed.ts`
6. Run the dev server: `yarn dev`

## Publishing to your repository (SSH)

From your own machine, inside the extracted folder, run the standard first-push sequence for `git@github.com:harunsdev/senpar_app_browser.git` using the branch `main` and commit message `initial push`.

## Notes

- `.env` is intentionally excluded — never commit real secrets.
- The app is in TEST MODE; use demo/fake data only.
