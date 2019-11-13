import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 100%;
  background: #ee4d64;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 360px;
  background: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  text-align: center;
  padding: 50px 30px;
  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    strong {
      text-align: left;
      line-height: 30px;
      color: #444444;
    }
    input {
      border: 1px solid #ddd;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      margin: 0 0 10px;
    }
    span {
      color: #ee4d64;
      margin: 0 0 10px;
      align-self: flex-start;
      font-weight: bold;
    }
    button {
      height: 44px;
      background: #ee4d64;
      border-radius: 4px;
      color: #fff;
      font-weight: bold;
      font-size: 16px;
      border: none;
      transition: background 1s;
      &:hover {
        background: #fff;
        border: 3px solid #ee4d64;
        color: #ee4d64;
      }
    }
  }
`;
