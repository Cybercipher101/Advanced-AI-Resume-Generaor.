# Production Deployment Guide (Vercel)

Deploying your Next.js Advanced Resume Generator to production is incredibly simple using Vercel.

## Step 1: Push your code to GitHub
1. Open your terminal in VS Code (`Ctrl + \``).
2. If you haven't already, initialize git and commit your code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Advanced AI Resume Generator"
   ```
3. Go to [GitHub](https://github.com/new) and create a new repository.
4. Follow the instructions on GitHub to push your existing repository from the command line:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```

## Step 2: Deploy to Vercel
1. Log in to [Vercel](https://vercel.com).
2. Click the **"Add New..."** button and select **Project**.
3. Connect your GitHub account if you haven't already, and click **Import** next to your newly created repository.
4. **Environment Variables (CRITICAL):**
   In the "Configure Project" screen, expand the "Environment Variables" section. You MUST copy all the variables from your local `.env.local` file and paste them here:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `GEMINI_API_KEY`
5. Click **Deploy**.

## Step 3: Wait & Verify
Vercel will build your application (this usually takes 1-2 minutes). Once it is complete, Vercel will give you a live production URL (e.g., `https://your-resume-generator.vercel.app`). 

Your application is now live, ATS compliant, and fully secured by Supabase Row-Level Security!
