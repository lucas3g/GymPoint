import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';

import { Container, ContentForm, StudentForm } from './styles';
// import api from '../../services/api';

import {
  studentCreateRequest,
  studentUpdateRequest,
} from '~/store/modules/students/actions';

export default function StudentStore({ history }) {
  const dispatch = useDispatch();
  const { student } = history.location.state;
  const { store } = history.location.state;


  const [initialData, setInitialData] = useState({});

  useEffect(() => {
    setInitialData(student);
  }, [student]);

  function handleCreateSubmit(data) {
    dispatch(studentCreateRequest(data));
  }

  function handleUpdateSubmit(data) {
    dispatch(studentUpdateRequest(data, initialData.id));
  }

  function handleEditStudentReverse() {
    history.push('/students');
  }

  return (
    <Container>
      <ContentForm>
        <header id="HeaderForm">
          <h1>Cadastro de Aluno</h1>
          <div>
            <button
              id="voltar"
              type="button"
              onClick={handleEditStudentReverse}
            >
              Voltar
            </button>
            <button type="submit" form="formStudent" id="buttonHandleSubmit">
              Salvar
            </button>
          </div>
        </header>
        <StudentForm>
          <Form
            initialData={initialData}
            onSubmit={store ? handleCreateSubmit : handleUpdateSubmit}
            id="formStudent"
          >
            <div id="div1">
              <ul>
                <li>
                  <strong>NOME COMPLETO</strong>
                  <Input
                    name="name"
                    type="text"
                    placeholder="Seu Nome Completo"
                  />
                </li>
                <li>
                  <strong>ENDEREÇO DE E-MAIL</strong>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Seu Endereço de E-mail"
                  />
                </li>
              </ul>
            </div>
            <div id="div2">
              <ul>
                <li>
                  <strong>IDADE</strong>
                  <Input name="age" type="text" placeholder="Sua Idade" />
                </li>
                <li>
                  <strong>PESO (em kg)</strong>
                  <Input name="weight" type="number" placeholder="Seu Peso" />
                </li>
                <li>
                  <strong>ALTURA</strong>
                  <Input
                    name="height"
                    type="number"
                    placeholder="Sua Altura"
                    pattern="[0-9]+([,\.][0-9]+)?"
                    min="0"
                    step="any"
                  />
                </li>
              </ul>
            </div>
          </Form>
        </StudentForm>
      </ContentForm>
    </Container>
  );
}
