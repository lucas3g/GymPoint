import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  align-self: stretch;
  padding: 0 30px;
`;

export const QuestionContainer = styled.View`
  background: #fff;
  margin-top: 20px;
  padding: 20px 20px 20px 20px;
  border-radius: 4px;
`;

export const QuestionTitle = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const QuestionAnswer = styled.Text`
  color: #444444;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 10px;
`;
export const QuestionHour = styled.Text`
  color: #666666;
  font-size: 14px;
  margin-bottom: 10px;
`;

export const QuestionText = styled.Text`
  font-size: 14px;
  line-height: 26px;
  color: #666666;
`;

export const QuestionResp = styled.View`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

export const QuestionTitleResp = styled.Text`
  color: #444444;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 10px;
`;

export const QuestionTextResp = styled.Text`
  color: #666666;
  font-size: 14px;
  line-height: 26px;
`;
