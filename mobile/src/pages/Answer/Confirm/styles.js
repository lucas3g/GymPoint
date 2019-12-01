import styled from "styled-components/native";
import Button from "~/components/Button";

export const Container = styled.View`
  flex: 1;
`;

export const Form = styled.View`
  align-self: stretch;
  padding: 0 30px;
`;

export const FormInput = styled.TextInput`
  margin-top: 20px;
  background: #fff;
  height: 300px;
  border-radius: 4px;
  padding: 20px 20px 20px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 20px;
`;
