import { Client, Databases } from "react-native-appwrite";
import { Platform } from "react-native";
const config = {
  endpoint: "https://fra.cloud.appwrite.io/v1",
  projectId: "6ab957e40024b4677145",
  db: "OnlyGainz TablesDB",
  col: {
    Users: "6ab95926003b92e6fe5c",
  },
};
const client = new Client()
  .setEndpoint(config.endpoint)
  .setProject(config.projectId);

switch (Platform.OS) {
  case "android":
    client.setPlatform("com.onlygainz_android.app");
    break;
  default:
    console.error("Non valid platform");
}

const database = new Databases(client);

export { database, config, client };
