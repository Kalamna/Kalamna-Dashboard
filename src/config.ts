// src/config.ts

export const config = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || "https://localhost:3000/api",
  demoEmail: import.meta.env.VITE_DEMO_EMAIL || "demo@kalamna.com",
  demoPassword: import.meta.env.VITE_DEMO_PASSWORD || "GP@2026",
  widgetUrl: "https://cdn.kalamna.ai/widget.js",
  apiDomain: "https://api.kalamna.ai",
  dummyApiKey: "kalamna_live_sk_xxxxxxxxxxxxxxxxx",
};
