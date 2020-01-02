import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import logo from '~/assets/logo.svg';
import { signOut } from '~/store/modules/auth/actions';
import { Container, Content, Profile } from './styles';

export default function Header() {
  const dispatch = useDispatch();
  const adm = useSelector(state => state.auth.name);
  console.tron.log(adm);
  function handleSignOut() {
    dispatch(signOut());
  }
  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="GymPoint" />
          <Link to="/students" active>ALUNOS</Link>
          <Link to="/plans" active>PLANOS</Link>
          <Link to="/enrollments" active>MATRICULAS</Link>
          <Link to="/helpOrders" active>PEDIDOS DE AUXILIO</Link>
        </nav>

        <aside>
          <Profile>
            <div>
              <strong>{adm}</strong>
              <button type="button" onClick={handleSignOut}>
                  Sair do sistema
              </button>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
