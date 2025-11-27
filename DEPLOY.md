# Deployment Guide for Divine Prasad

This guide outlines the steps to deploy the "Divine Prasad" e-commerce application to production.

## Architecture Overview
- **Frontend**: React (Vite) - Deployed to Vercel or Netlify.
- **Backend**: Node.js (Express) - Deployed to Render, Heroku, or Railway.
- **Database**: MySQL - Hosted on Aiven, PlanetScale, or Railway.

---

## 1. Database Deployment (MySQL)
Before deploying the app, you need a cloud MySQL database.
1.  **Provider**: Sign up for a free tier at [Aiven](https://aiven.io/) or [Railway](https://railway.app/).
2.  **Create Service**: Create a new MySQL service.
3.  **Get Credentials**: Note down the `Host`, `Port`, `User`, `Password`, and `Database Name`.
4.  **Connection String**: Construct your connection string (or copy it from the dashboard).

---

## 2. Backend Deployment (Render.com)
We recommend Render for the backend as it has a generous free tier.

1.  **Push to GitHub**: Ensure your latest code is pushed to GitHub.
2.  **Create Web Service**:
    - Go to [Render Dashboard](https://dashboard.render.com/).
    - Click "New +" -> "Web Service".
    - Connect your GitHub repository.
3.  **Configuration**:
    - **Root Directory**: `server` (Important! Our backend is in the `server` folder).
    - **Build Command**: `npm install`
    - **Start Command**: `node server.js`
4.  **Environment Variables**:
    Add the following variables in the "Environment" tab:
    - `PORT`: `5000` (or let Render assign one)
    - `DB_HOST`: Your Cloud MySQL Host
    - `DB_USER`: Your Cloud MySQL User
    - `DB_PASS`: Your Cloud MySQL Password
    - `DB_NAME`: Your Cloud MySQL Database Name
    - `JWT_SECRET`: A strong, random string (e.g., generated via `openssl rand -base64 32`)
    - `NODE_ENV`: `production`
5.  **Deploy**: Click "Create Web Service". Render will build and start your server.

---

## 3. Frontend Deployment (Vercel)
Vercel is optimized for Vite/React apps.

1.  **Install Vercel CLI** (Optional) or use the Dashboard.
2.  **Import Project**:
    - Go to [Vercel Dashboard](https://vercel.com/dashboard).
    - Click "Add New..." -> "Project".
    - Import your GitHub repository.
3.  **Configuration**:
    - **Root Directory**: `divine-prasad-app` (Edit this! It defaults to root).
    - **Framework Preset**: Vite (should auto-detect).
    - **Build Command**: `npm run build`
    - **Output Directory**: `dist`
4.  **Environment Variables**:
    - `VITE_API_URL`: The URL of your deployed Backend (e.g., `https://divine-prasad-api.onrender.com`).
    *Note: You need to update your frontend code to use this variable instead of hardcoded localhost proxy.*
5.  **Deploy**: Click "Deploy".

---

## 4. Code Adjustments for Production

### Frontend API URL
In `divine-prasad-app/vite.config.js`, the proxy works only for local development. For production, you must configure Axios to use the environment variable.

**Create `src/api/axios.js`:**
```javascript
import axios from 'axios';

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '/api'
});

export default instance;
```
*Refactor your app to use this instance instead of importing axios directly.*

### Backend CORS
Update `server/server.js` to allow requests from your deployed frontend domain.

```javascript
const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
};
app.use(cors(corsOptions));
```

---

## 5. Post-Deployment Checks
1.  **Database Sync**: The backend should auto-sync the schema on first run (`sequelize.sync`).
2.  **Seed Data**: You might need to run the seeder script manually via the Render console or connect remotely to seed initial users/products.
3.  **Verify Flow**: Test Signup, Login, Product Browsing, and Checkout in the live environment.

Happy Deploying! 🚀
