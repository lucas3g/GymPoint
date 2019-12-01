import styled from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";
import Button from "~/components/Button";

export const Container = styled.View`
  flex: 1;

  align-self: stretch;
  padding: 0 30px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 20px;
  margin-bottom: 10px;
`;

export const HelpList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false
})`
  margin-bottom: 20px;
`;

export const Help = styled(RectButton)`
  background: #fff;
  border-radius: 4px;
  border: 1px solid #ddd;
  margin-top: 20px;
`;

export const HelpTitle = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const HelpAnswer = styled.Text`
  font-weight: bold;
  font-size: 14px;
  padding-bottom: 16px;
  padding-top: 20px;
  padding-left: 20px;

  color: ${props => (props.resp ? "#42CB59" : "#999999")};
`;

export const HelpTime = styled.Text`
  font-size: 14px;
  padding-bottom: 16px;
  padding-top: 20px;
  padding-right: 20px;
`;

export const HelpResp = styled.Text.attrs({
  numberOfLines: 3
})`
  font-size: 14px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
`;
