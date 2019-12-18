import React from "react";
import { useDispatch } from 'react-redux';
import { Image, StatusBar, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

import logo from "~/assets/logo2.png";
import { signOut } from '~/store/modules/auth/actions';

import { Container, HeaderPrincipal } from "./styles";

export default function Header() {
  const dispatch = useDispatch();
  function handleSignOut() {
    dispatch(signOut());
  }
  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <HeaderPrincipal>
        <View />
        <Image source={logo} />
        <TouchableOpacity
          onPress={handleSignOut}
        >
          <Icon name="exit-to-app" size={20} color="#EE4E62" />
        </TouchableOpacity>
      </HeaderPrincipal>
    </Container>
  );
}
