import { Client, TablesDB } from "react-native-appwrite";
import { Platform } from "react-native";
const config = {
  endpoint: "https://fra.cloud.appwrite.io/v1",
  projectId: "6ab950b60004906bac3e",
  db: "6ab957e40024b4677145",
  col: {
    Users: "6ab957ec001842c5f3e8",
  },
};
const client = new Client()
  .setEndpoint(config.endpoint)
  .setProject(config.projectId);

switch (Platform.OS) {
  case "android":
    client.setPlatform("com.onlygainz_android.app");
    break;
  case "ios":
    client.setPlatform("com.onlygainz_ios.app");
    break;
}

const database = new TablesDB(client);

export { database, config, client };
