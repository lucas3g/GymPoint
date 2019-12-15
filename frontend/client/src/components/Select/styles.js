import styled from 'styled-components';
import Select from 'react-select';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SelectOptions = styled(Select)`
  width: 200px;
  margin-right: 16px;
`;
