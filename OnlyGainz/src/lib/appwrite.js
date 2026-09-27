import { Client, TablesDB } from "react-native-appwrite";
import { Platform } from "react-native";
const config = {
  endpoint: "https://fra.cloud.appwrite.io/v1",
  projectId: "6ab957e40024b4677145",
  db: "OnlyGainz TablesDB",
  col: {
    Users: "Users",
  },
};
const client = new Client()
  .setEndpoint(config.endpoint)
  .setProject(config.projectId);

switch (Platform.OS) {
  case "android":
    client.setPlatform("com.onlygainz_android.app");
    break;
}

const database = new TablesDB(client);

export { database, config, client };
