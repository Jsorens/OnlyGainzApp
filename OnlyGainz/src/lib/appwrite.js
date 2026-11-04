import { Client, TablesDB, Account, Teams } from "react-native-appwrite";
import { Platform } from "react-native";

const ADMIN_TEAM_ID = "6ad7befa00225bcabd55";

const config = {
  endpoint: "https://fra.cloud.appwrite.io/v1",
  projectId: "6ab950b60004906bac3e",
  db: "6ab957e40024b4677145",
  col: {
    Foods: "6ac76db7001c67602dc6",
    Profiles: "6ace749800130796cac7",
    Meals: "6ae8e026002c89795d1c",
  },
};
const client = new Client()
  .setEndpoint(config.endpoint)
  .setProject(config.projectId);

const teams = new Teams(client);

switch (Platform.OS) {
  case "android":
    client.setPlatform("com.onlygainz_android.app");
    break;
  case "ios":
    client.setPlatform("com.onlygainz_ios.app");
    break;
}

const database = new TablesDB(client);

const account = new Account(client);

export { database, config, client, account, teams, ADMIN_TEAM_ID };
