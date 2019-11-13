import React from 'react';
import { Link } from 'react-router-dom';

import logo from '~/assets/logo.svg';

import { Container, Content, Profile } from './styles';

export default function Header() {
  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="GymPoint" />
          <Link to="/students">ALUNOS</Link>
          <Link to="/plans">PLANOS</Link>
          <Link to="/enrollments">MATRICULAS</Link>
          <Link to="/tickets">PEDIDOS DE AUXILIO</Link>
        </nav>

        <aside>
          <Profile>
            <div>
              <strong>Lucas Silva</strong>
              <Link to="/">Sair do sistema</Link>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
