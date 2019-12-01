import styled from "styled-components/native";
import Button from "~/components/Button";

export const Container = styled.View`
  flex: 1;
`;

export const Form = styled.View`
  align-self: stretch;
  padding: 0 30px;
`;

export const CheckinButton = styled(Button)`
  margin-top: 20px;
`;

export const CheckinList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false
})``;

export const Checkins = styled.View`
  margin-top: 20px;
  height: 46px;
  background: #fff;
  border-radius: 4px;
  border: 1px solid #dddddd;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const CheckIn = styled.Text`
  padding-left: 20px;
  font-weight: bold;
  font-size: 12px;
  color: #000;
`;

export const CheckTime = styled.Text`
  padding-right: 20px;
  color: #666666;
  font-size: 12px;
  line-height: 19px;
`;
