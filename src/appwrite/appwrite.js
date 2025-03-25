import { Client, Account, Databases } from 'appwrite';
// const sdk = require('node-appwrite');
const projectEndPoint = import.meta.env.VITE_APPWRITE_ENDPOINT;
const projectID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
export const projectDBID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
export const DBCollection = import.meta.env.VITE_APPWRITE_DB_COLLECTION_ID;

const client = new Client();

client
    .setEndpoint(projectEndPoint)
    .setProject(projectID);

export const account = new Account(client);
export const database = new Databases(client);