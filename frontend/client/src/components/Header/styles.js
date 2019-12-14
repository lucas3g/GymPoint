import styled from 'styled-components';

export const Container = styled.div`
  background: #ffff;
  padding: 0 30px;
  width: 100%;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.25);
  position: relative;
  z-index: 1;
`;

export const Content = styled.div`
  height: 64px;
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid #eee;
      width: 100px;
    }

    a {
      font-size: 15px;
      font-weight: bold;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: normal;
      color: #444444;
      margin-left: 20px;
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const Profile = styled.div`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;
  border-left: 1px solid #eee;

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      color: #333;
    }

    button {
      display: block;
      margin-top: 2px;
      font-size: 12px;
      color: #de3b3b;
      background: none;
      border: none;
    }
  }
`;
