import { Account, Client, Databases} from "appwrite";
//project endPoint and projectID
const endPoint = import.meta.env.VITE_APPWRITE_ENDPOINT;
const projectID = import.meta.env.VITE_APPWRITE_PROJECT_ID;

const client = new Client();
client
      .setEndpoint(endPoint)
      .setProject(projectID)

//initializing and exporting account and database variables
export const account = new Account(client);
export const databases = new Databases(client);
// exporting Database ID and Database Collection ID
export const DatabaseID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
export const DBCollectionID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;