<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1WRGhHgY15MZM5xM6MmCFTA6zV_cdoZYY

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
## Deploy to Vercel

### Prerequisites
- Vercel account (sign up at https://vercel.com)
- GitHub repository with this code

### Deployment Steps

1. **Push to GitHub** (if not already done):
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Select your GitHub repository
   - Vercel will auto-detect the settings (React + Vite)

3. **Set Environment Variables**:
   - In Vercel project settings, go to "Environment Variables"
   - Add `GEMINI_API_KEY` with your API key value
   - Click "Save"

4. **Deploy**:
   - Click "Deploy"
   - Wait for the build to complete
   - Your app will be live at `https://your-project-name.vercel.app`

### Build Configuration
The project includes a `vercel.json` file with the following setup:
- Build command: `npm run build`
- Framework preset: React with Vite
- Output directory: `dist`
- SPA routing configured for React Router

### Environment Variables Required
- `GEMINI_API_KEY`: Your Gemini API key for the app