import styled from 'styled-components';

export const Container = styled.div`
  margin: 34px 300px;
  min-width: 700px;
  ul {
    padding: 16px 0;
  }
  ul + ul {
    border-top: 1px solid #eee;
  }
  .nohelp {
    display: flex;
    width: 100%;
    justify-content: center;
    color: #666;
    font-size: 16px;
    line-height: 20px;
  }
`;

export const Header = styled.div`
  margin: 0 120px 24px 120px;
  font-family: Roboto;
  font-size: 24px;
  font-weight: bold;
  color: #ffff;
`;

export const Help = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: #666;
  font-size: 16px;
  line-height: 20px;
  button {
    background: none;
    border: none;
    font-size: 15px;
    color: #4d85ee;
  }
  div {
    max-width: 100%;
    max-height: 100%;
    border-radius: 4px;
    .modal {
      display: flex;
      flex-direction: column;
      padding: 30px;
      strong {
        margin-bottom: 8px;
      }
      p {
        margin-bottom: 20px;
        font-weight: normal;
      }
      form {
        display: flex;
        flex-direction: column;
        div {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: baseline;
          border-bottom: 1px solid #eee;
          margin-bottom: 20px;
          div {
            border: none;
            margin-bottom: 0;
            flex-direction: row;
          }
          input {
            margin-left: 10px;
            ::placeholder {
              color: #666;
            }
          }
        }
        }
        input {
          border-radius: 4px;
          border: none;
          background: none;
        }
        span {
          align-self: flex-end;
          font-family: Roboto;
          font-size: 12px;
          color: red;
          margin-top: 5px;
        }
        textarea {
          border: 1px solid #ddd;
          padding: 10px;
          border-radius: 4px;
          resize: none;
          font-size: 16px;
          height: 150px;
          &:focus {
              border: 1px solid #ee4d64;
          }
        }
        button {
          min-width: 390px;
          min-height: 45px;
          margin-top: 21px;
          color: #fff;
          border-radius: 4px;
          background-color: #ee4d64;
        }
      }
    }
  }
`;
