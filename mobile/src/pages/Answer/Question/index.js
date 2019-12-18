import React from "react";
import { formatRelative, parseISO } from "date-fns";
import { TouchableOpacity, Image, View } from "react-native";
import pt from "date-fns/locale/pt";
import Icon from "react-native-vector-icons/MaterialIcons";


import logo from "~/assets/logo2.png";
import Background from "~/components/Background";


import {
  Container,
  QuestionContainer,
  QuestionTitle,
  QuestionAnswer,
  QuestionHour,
  QuestionText,
  QuestionResp,
  QuestionTitleResp,
  QuestionTextResp
} from "./styles";

export default function Question({ navigation }) {
  const item = navigation.getParam("item");

  return (
    <Background>

      <Container>
        <QuestionContainer>
          <QuestionTitle>
            <QuestionAnswer>PERGUNTA</QuestionAnswer>
            <QuestionHour>
              {formatRelative(parseISO(item.createdAt), new Date(), {
                locale: pt,
                addSuffix: true
              })}
            </QuestionHour>
          </QuestionTitle>
          <QuestionText>{item.question}</QuestionText>
          <QuestionResp>
            <QuestionTitleResp>RESPOSTA</QuestionTitleResp>
            <QuestionTextResp>{item.answer}</QuestionTextResp>
          </QuestionResp>
        </QuestionContainer>
      </Container>
    </Background>
  );
}

Question.navigationOptions = ({ navigation }) => ({
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
