import React from "react";
import { formatRelative, parseISO } from "date-fns";
import pt from "date-fns/locale/pt";
import Icon from "react-native-vector-icons/MaterialIcons";

import Background from "~/components/Background";
import Header from "~/components/Header";

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
      <Header />
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

Question.navigationOptions = {
  tabBarLabel: "Pedir Ajuda",
  tabBarIcon: ({ tintColor }) => (
    <Icon name="live-help" size={20} color={tintColor} />
  )
};
