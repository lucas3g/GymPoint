import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 30px;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 30px;
    h1 {
      font-size: 24px;
      font-weight: bold;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: normal;
      color: #fff;
    }
    div {
      display: flex;
      justify-content: center;
      align-items: center;

      button {
        margin-left: 10px;
        height: 44px;
        width: 142px;
        background: #fff;
        border-radius: 4px;
        color: #ee4d64;
        font-weight: bold;
        font-size: 16px;
        border: none;
        transition: background 0.2s;

        &:hover {
          background: ${darken(0.1, '#fff')};
        }
      }
      input {
        border: 1px solid #ddd;
        border-radius: 4px;
        height: 44px;
        padding-left: 40px;
        padding-right: 15px;
        margin-left: 10px;
        width: 237px;
      }

      button#voltar {
        height: 44px;
        width: 100px;
        background: #4f545c;
        border-radius: 4px;
        color: #fff;
        font-weight: bold;
        font-size: 16px;
        border: none;
        transition: background 1s;
        &:hover {
          background: #fff;
          border: 3px solid #4f545c;
          color: #4f545c;
        }
      }
    }
  }
  header#HeaderForm {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 30px;
    width: 900px;
  }
`;

export const EnrollmentTable = styled.table`
  width: 100%;
  height: 100px;
  border-radius: 4px;
  background-color: #fff;
  margin-top: 30px;
  padding: 30px;

  thead {
    font-family: Roboto;
    color: #444;
    text-align: left;
    th#start_date {
      text-align: center;
    }
    th#end_date {
      text-align: center;
    }
    th#active {
      text-align: center;
    }
  }

  tbody {
    td {
      padding-top: 10px;
      padding-bottom: 10px;
      font-size: 16px;
      color: #666666;
    }
    td#start_date {
      text-align: center;
    }
    td#end_date {
      text-align: center;
    }
    td#active {
      text-align: center;
    }
    td#action {
      text-align: end;
      width: 50px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-right: 80px;
      button#buttonEditar {
        background: none;
        border: 0;
        color: #4d85ee;
      }
      button#buttonApagar {
        background: none;
        border: 0;
        color: #de3b3b;
      }

      button {
        padding-left: 10px;
        font-size: 15px;
      }
    }
  }
`;
