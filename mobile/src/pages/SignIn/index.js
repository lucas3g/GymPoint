import React, { useState } from "react";
import { Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import logo from "~/assets/logo.png";

import Background from "~/components/Background";
import { signInRequest } from "~/store/modules/auth/actions";

import { Container, Form, FormInput, SubmitButton } from "./styles";

export default function SignIn() {
  const dispath = useDispatch();
  const [id, setId] = useState("");

  const loading = useSelector(state => state.auth.loading);

  function handleSubmit() {
    dispath(signInRequest(id));
  }

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
          <SubmitButton loading={loading} onPress={handleSubmit}>
            Entrar no Sistema
          </SubmitButton>
        </Form>
      </Container>
    </Background>
  );
}
