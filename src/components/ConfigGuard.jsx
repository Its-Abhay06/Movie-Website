// src/components/ConfigGuard.jsx
import React from "react";

/**
 * Top-level guard component:
 * - If TMDB key is missing, show a friendly admin message instead of a blank screen.
 * - Exposes a simple context (optional) that downstream code can use to know if Appwrite is available.
 */

export const ConfigContext = React.createContext({
  hasTmdbKey: false,
  hasAppwrite: false,
});

export default function ConfigGuard({ children }) {
  const hasTmdbKey = Boolean(import.meta.env.VITE_TMDB_API_KEY);
  const hasAppwrite =
    Boolean(import.meta.env.VITE_APPWRITE_PROJECT_ID) &&
    Boolean(import.meta.env.VITE_APPWRITE_ENDPOINT);

  if (!hasTmdbKey) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial"
      }}>
        <div style={{ maxWidth: 720, textAlign: "center" }}>
          <h1 style={{ marginBottom: 8 }}>Site is not configured</h1>
          <p style={{ marginBottom: 16 }}>
            Your TMDB API key is missing. Please set the environment variable:
            <br />
            <code>VITE_TMDB_API_KEY</code>
            <br />
            in your hosting provider (Vercel / Netlify / GitHub Actions).
          </p>
          <p style={{ color: "#555" }}>
            Once you add the TMDB API key and redeploy, the website will work.
          </p>
        </div>
      </div>
    );
  }

  return (
    <ConfigContext.Provider value={{ hasTmdbKey, hasAppwrite }}>
      {children}
    </ConfigContext.Provider>
  );
}
