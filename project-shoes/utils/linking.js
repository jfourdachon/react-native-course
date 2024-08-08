import * as Linking from "expo-linking";

const prefixes = [Linking.createURL("/"), "project-shoes://"];

const config = {
  screens: {
    Details: "details/:id",
    MainCart: "cart",
    // Autres écrans du MainStack Navigator
    Drawer: {
      screens: {
        BottomTabs: {
          screens: {
            Notifications: "notifications",
            // Autres écrans du Bottom Tabs Navigator
          },
        },
      },
    },
  },
};

export const linkingConfig = {
  prefixes,
  config,
};
