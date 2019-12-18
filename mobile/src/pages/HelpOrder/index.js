import React, { useState, useEffect } from "react";
import { Image, View } from "react-native";
import { useSelector } from "react-redux";
import { formatRelative, parseISO } from "date-fns";
import pt from "date-fns/locale/pt";
import Icon from "react-native-vector-icons/MaterialIcons";
import api from "~/services/api";

import Background from "~/components/Background";
import Header from "~/components/Header";
import logo from "~/assets/logo2.png";

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
  const [refreshing, setRefreshing] = useState(false);

  const id = useSelector(state => state.auth.id);

  useEffect(() => {
    async function loadHelpOrders() {
      const response = await api.get(`/students/${id}/help-orders`);

      setHelpOrder(response.data);
    }
    loadHelpOrders();
  }, [id]);

  async function load() {
    const response = await api.get(`/students/${id}/help-orders`);

    setHelpOrder(response.data);
    setRefreshing(false);
  }

  function refreshList() {
    setRefreshing(true);
    load();
  };

  return (
    <Background>
      <Container>
        <SubmitButton onPress={() => navigation.navigate("Confirm")}>
          Novo pedido de auxílio
        </SubmitButton>
        <HelpList
          data={helpOrder}
          onRefresh={refreshList}
          refreshing={refreshing}
          onEndReachedThreshold={0.2}
          onEndReached={refreshList}
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

HelpOrder.navigationOptions = ({ navigation }) => ({
  tabBarLabel: "Pedir Ajuda",
  tabBarIcon: ({ tintColor }) => (
    <Icon name="live-help" size={20} color={tintColor} />
  ),
  headerLeft: () => (
      <Header />
  )
});
