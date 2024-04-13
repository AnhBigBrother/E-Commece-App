import { configDotenv } from "dotenv";
configDotenv();

const firebaseConfig = {
  apiKey: process.env.FB_API_KEY,
  authDomain: process.env.FB_AUTH_DOMAIN,
  projectId: process.env.FB_PROJECT_ID,
  storageBucket: process.env.FB_STORAGE_BUGKET,
  messagingSenderId: process.env.FB_MESSAGINGSENDER_ID,
  appId: process.env.FB_APP_ID,
};

export default firebaseConfig;
