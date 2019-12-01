import React, { useState } from "react";
import { Alert, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import Icon from "react-native-vector-icons/MaterialIcons";
import api from "~/services/api";

import Background from "~/components/Background";
import Header from "~/components/Header";
import { Container, Form, FormInput, SubmitButton } from "./styles";

export default function Confirm({ navigation }) {
  const [question, setQuestion] = useState("");
  const id = useSelector(state => state.auth.id);

  async function handleQuestion() {
    const response = await api.post(`/students/${id}/help-orders`, {
      question
    });

    console.tron.log(response);
    setQuestion(response.data);

    if (response.status === 200) {
      Alert.alert("Aviso", "Sua pergunta foi enviada com sucesso!");
      navigation.navigate("HelpOrder");
    }
  }

  return (
    <Background>
      <Container>
        <Header />
        <Form>
          <FormInput
            autoCorrect
            placeholder="Inclua seu pedido de auxílio"
            returnKeyType="send"
            onChangeText={setQuestion}
            textAlignVertical="top"
            multiline
          />

          <SubmitButton onPress={handleQuestion}>Enviar pedido</SubmitButton>
        </Form>
      </Container>
    </Background>
  );
}

Confirm.navigationOptions = {
  tabBarLabel: "Pedir Ajuda",
  tabBarIcon: ({ tintColor }) => (
    <Icon name="live-help" size={20} color={tintColor} />
  )
};
