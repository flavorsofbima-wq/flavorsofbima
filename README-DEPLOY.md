# Publishing Flavors Of BIMA — GitHub Pages + GoDaddy domain

Your site is hosted FREE on GitHub Pages, and your GoDaddy domain
(flavorsofbima.com) points to it. You keep the domain at GoDaddy; only the
website files live on GitHub. Every time you push to GitHub, the site rebuilds
and goes live automatically.

=============================================================
PART 1 — Put the project on GitHub (one time)
=============================================================

1. Create a new repository on github.com (e.g. "flavors-of-bima").
   Keep it Public (GitHub Pages is free for public repos).

2. On your computer, in the `bima` folder, run:

   git init
   git add .
   git commit -m "Flavors Of BIMA website"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git push -u origin main

=============================================================
PART 2 — Turn on GitHub Pages (one time)
=============================================================

1. In your repo on github.com, go to:  Settings → Pages
2. Under "Build and deployment" → "Source", choose:  GitHub Actions
   (NOT "Deploy from a branch")
3. That's it. Pushing already triggered the build. Go to the "Actions" tab
   and watch the "Deploy to GitHub Pages" workflow finish (2-3 min).
   When it's green, your site is live at:
       https://<your-username>.github.io/<your-repo>/
   (We'll switch this to flavorsofbima.com next.)

=============================================================
PART 3 — Point your GoDaddy domain at GitHub Pages
=============================================================

Your repo already includes a CNAME file with "flavorsofbima.com", so GitHub
knows your domain. Now tell GoDaddy to send the domain to GitHub.

1. In GitHub repo:  Settings → Pages → "Custom domain" → type:
       flavorsofbima.com
   then Save. (It may show a DNS check warning until step 2 is done.)

2. In GoDaddy:  My Products → Domains → flavorsofbima.com → "Manage DNS"
   (the DNS button from your products page).

3. Add these records. Delete any existing "A" records pointing at a GoDaddy
   parking page or the Websites+Marketing site first.

   FOUR "A" records — Name: @  →  Value (one record each):
       185.199.108.153
       185.199.109.153
       185.199.110.153
       185.199.111.153

   ONE "CNAME" record:
       Name: www   →   Value: <your-username>.github.io

   (Replace <your-username> with your GitHub username. Note the trailing
   dot may be added automatically — that's fine.)

4. Save. DNS changes can take 15 minutes to a few hours to take effect
   (occasionally up to 24h, but usually quick).

5. Back in GitHub → Settings → Pages, once the DNS check passes, tick
   "Enforce HTTPS" so your site is served securely (https://).

=============================================================
PART 4 — Done. Updating the site later
=============================================================

Your routine for any change (prices, products, images):

1. Edit admin/FlavorsOfBIMA-Admin.xlsx, save, CLOSE it.
   (Add/replace images in public/images/... if needed.)
2. git add .
   git commit -m "update prices"
   git push
3. Wait ~2-3 min. The site rebuilds and goes live automatically.

That's it — no manual uploads ever.

=============================================================
Troubleshooting
=============================================================

- Site loads but looks unstyled (no colors/fonts): the .nojekyll file is
  missing from the build. It's in public/.nojekyll — make sure it got
  committed (git add public/.nojekyll).

- "There isn't a GitHub Pages site here": the Action hasn't finished or
  Pages source isn't set to "GitHub Actions" (Part 2, step 2).

- Domain not working after a few hours: re-check the four A records and the
  www CNAME in GoDaddy. Make sure old GoDaddy "parking"/"Websites+Marketing"
  records are removed.

- Old prices live: you didn't commit the updated Excel, or didn't push.
  The build reads admin/FlavorsOfBIMA-Admin.xlsx from the repo.

- Images missing: they must be in public/images/... and committed BEFORE
  the push (the build copies them into the site).
