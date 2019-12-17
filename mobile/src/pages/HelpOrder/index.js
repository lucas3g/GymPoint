import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { formatRelative, parseISO } from "date-fns";
import pt from "date-fns/locale/pt";
import Icon from "react-native-vector-icons/MaterialIcons";
import api from "~/services/api";

import Background from "~/components/Background";
import Header from "~/components/Header";

import {
  Container,
  SubmitButton,
  HelpList,
  Help,
  HelpTitle,
  HelpAnswer,
  HelpTime,
  HelpResp
} from "./styles";

export default function HelpOrder({ navigation }) {
  const [helpOrder, setHelpOrder] = useState([]);
  const id = useSelector(state => state.auth.id);

  useEffect(() => {
    async function loadHelpOrders() {
      const response = await api.get(`/students/${id}/help-orders`);

      setHelpOrder(response.data);
    }
    loadHelpOrders();
  }, [id]);

  return (
    <Background>
      <Header />
      <Container>
        <SubmitButton onPress={() => navigation.navigate("Confirm")}>
          Novo pedido de auxílio
        </SubmitButton>
        <HelpList
          data={helpOrder}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Help onPress={() => navigation.navigate("Question", { item })}>
              <HelpTitle>
                <HelpAnswer resp={item.answer_at}>
                  {item.answer_at ? "Respondido" : "Sem resposta"}
                </HelpAnswer>
                <HelpTime>
                  {item.answer_at
                    ? formatRelative(parseISO(item.answer_at), new Date(), {
                        locale: pt
                      })
                    : formatRelative(parseISO(item.createdAt), new Date(), {
                        locale: pt
                      })}
                </HelpTime>
              </HelpTitle>

              <HelpResp>{item.question}</HelpResp>
            </Help>
          )}
        />
      </Container>
    </Background>
  );
}

HelpOrder.navigationOptions = {
  tabBarLabel: "Pedir Ajuda",
  tabBarIcon: ({ tintColor }) => (
    <Icon name="live-help" size={20} color={tintColor} />
  )
};
