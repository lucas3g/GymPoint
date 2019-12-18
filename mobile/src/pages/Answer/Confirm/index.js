import React, { useState } from "react";
import { Alert, TouchableOpacity, Image, View } from "react-native";
import { useSelector } from "react-redux";
import Icon from "react-native-vector-icons/MaterialIcons";
import api from "~/services/api";
import logo from "~/assets/logo2.png";
import Background from "~/components/Background";

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

Confirm.navigationOptions = ({ navigation }) => ({
  tabBarLabel: "Pedir Ajuda",
  tabBarIcon: ({ tintColor }) => (
    <Icon name="live-help" size={20} color={tintColor} />
  ),
  headerTitle:() => (
    <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row', height: 64, flex:1}}>
      <Image resizeMode="cover" style={{width: 118, height: 18, marginLeft: -40 }} source={logo}/>

    </View>
  ),
  headerLeft: () => (
    <View style={{flexDirection: 'row',
    justifyContent: 'center', alignItems: 'center', height: 64, paddingLeft: 10}}>
      <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}
    >
      <Icon name="chevron-left" size={20} color="#EE4E62" />
    </TouchableOpacity>
    </View>
  )
});
