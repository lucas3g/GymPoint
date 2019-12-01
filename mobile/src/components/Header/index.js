import React from "react";
import { Image, StatusBar } from "react-native";

import logo from "~/assets/logo2.png";

import { Container, HeaderPrincipal } from "./styles";

export default function Header() {
  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <HeaderPrincipal>
        <Image source={logo} />
      </HeaderPrincipal>
    </Container>
  );
}
