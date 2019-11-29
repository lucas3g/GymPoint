import React, { useState } from "react";
import { Image } from "react-native";

import logo from "~/assets/logo.png";

import Background from "~/components/Background";

import { Container, Form, FormInput, SubmitButton } from "./styles";

export default function SignIn() {
  const [id, setId] = useState("");

  function handleSubmit() {}

  return (
    <Background>
      <Container>
        <Image source={logo} />

        <Form>
          <FormInput
            icon="perm-identity"
            placeholder="Informe seu ID de cadastro"
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            value={id}
            onChangeText={setId}
          />
          <SubmitButton>Entrar no Sistema</SubmitButton>
        </Form>
      </Container>
    </Background>
  );
}
