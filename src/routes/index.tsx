import { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { AppRoutes } from "./app.routes";

import { SignIn } from "../screens/SignIn";

import { AuthContext } from "../contexts/auth";

export const Routes = () => {
  const authContext = useContext(AuthContext);

  return (
    <NavigationContainer>
      {authContext.user ? <AppRoutes /> : <SignIn />}
    </NavigationContainer>
  );
};
