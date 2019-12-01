import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatRelative, parseISO } from "date-fns";
import pt from "date-fns/locale/pt";
import Icon from "react-native-vector-icons/MaterialIcons";
import api from "~/services/api";

import Background from "~/components/Background";
import Header from "~/components/Header";

import { checkInRequest } from "~/store/modules/checkin/actions";

import {
  Container,
  Form,
  CheckinButton,
  CheckinList,
  Checkins,
  CheckIn,
  CheckTime
} from "./styles";

export default function Checkin() {
  const [checkin, setCheckin] = useState([]);
  const dispatch = useDispatch();
  const id = useSelector(state => state.auth.id);
  const loading = useSelector(state => state.auth.loading);

  async function handleSubmit() {
    dispatch(checkInRequest(id));
  }

  useEffect(() => {
    async function loadCheckin() {
      const response = await api.get(`/students/${id}/checkins`);

      setCheckin(response.data);
    }
    loadCheckin();
  }, [checkin, id]);

  return (
    <Background>
      <Container>
        <Header />
        <Form>
          <CheckinButton loading={loading} onPress={handleSubmit}>
            Novo Check-in
          </CheckinButton>
          <CheckinList
            data={checkin}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <Checkins>
                <CheckIn>Check-in #{item.id}</CheckIn>
                <CheckTime>
                  {formatRelative(parseISO(item.createdAt), new Date(), {
                    locale: pt
                  })}
                </CheckTime>
              </Checkins>
            )}
          />
        </Form>
      </Container>
    </Background>
  );
}

Checkin.navigationOptions = {
  tabBarLabel: "Check-ins",
  tabBarIcon: ({ tintColor }) => (
    <Icon name="event" size={20} color={tintColor} />
  )
};

// withNavigationFocus(CheckIn);
