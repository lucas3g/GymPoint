import styled from 'styled-components';

const Box = styled.div`
  display: flex;
  flex-direction: column;

  margin: 0 120px;

  padding: 30px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);

  color: #444;
  font-size: 14px;
  font-weight: bold;

  label {
    margin-bottom: 8px;
  }
`;

export default Box;
