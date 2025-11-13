// src/lib/appwriteClient.js
import { Client, Databases } from "appwrite";

const APPWRITE_PROJECT = import.meta.env.VITE_APPWRITE_PROJECT_ID || "";
const APPWRITE_ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT || "";

let client = null;
let databases = null;

if (APPWRITE_PROJECT && APPWRITE_ENDPOINT) {
  try {
    client = new Client().setEndpoint(APPWRITE_ENDPOINT).setProject(
      APPWRITE_PROJECT
    );
    databases = new Databases(client);
  } catch (err) {
    console.warn("Appwrite init failed:", err);
    client = null;
    databases = null;
  }
}

export { client, databases };
