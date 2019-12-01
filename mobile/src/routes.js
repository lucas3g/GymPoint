import React from "react";

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import Icon from "react-native-vector-icons/MaterialIcons";
import SignIn from "./pages/SignIn";
import Checkin from "./pages/Checkin";
import HelpOrder from "./pages/HelpOrder";
import Question from "./pages/Answer/Question";
import Confirm from "./pages/Answer/Confirm";

export default (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn
        }),
        App: createBottomTabNavigator(
          {
            Checkin,
            screen: createSwitchNavigator(
              {
                HelpOrder,
                Question,
                Confirm
              },
              {
                navigationOptions: {
                  tabBarLabel: "Pedir Ajuda",
                  tabBarIcon: ({ tintColor }) => (
                    <Icon name="live-help" size={20} color={tintColor} />
                  )
                }
              }
            )
          },
          {
            resetOnBlur: true,
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: "#EE4E62",
              inactiveTintColor: "#3333",
              style: {
                backgroundColor: "#ffff",
                borderTopColor: "#ddd"
              }
            }
          }
        )
      },
      {
        initialRouteName: signedIn ? "App" : "Sign"
      }
    )
  );
