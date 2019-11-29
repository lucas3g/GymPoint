import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import { Container, StudentTable, ContentForm, StudentForm } from './styles';
// import api from '../../services/api';

import {
  studentCreateRequest,
  studentUpdateRequest,
  studentDeleteRequest,
  studentListRequest,
} from '~/store/modules/students/actions';

export default function Students() {
  const dispatch = useDispatch();
  const students = useSelector(state => state.students.data);
  const [flag, setFlag] = useState(false);
  const [storeStudent, setStoreStudent] = useState(false);
  const [initialData, setInitialData] = useState({});
  // const loading = useSelector(state => state.student.loading);

  // console.log(studentUpdate);

  // componetDidMount
  useEffect(() => {
    dispatch(studentListRequest());
  }, [dispatch, students, flag]);

  function handleCreateSubmit(data) {
    dispatch(studentCreateRequest(data));
    setStoreStudent(false);
  }

  function handleUpdateSubmit(data) {
    dispatch(studentUpdateRequest(data, initialData.id));
    setStoreStudent(false);
  }

  function handleDeleteSubmit(id) {
    dispatch(studentDeleteRequest(id));
  }

  function handleEditStudent(s) {
    setInitialData(s);
    setStoreStudent(true);
    setFlag(false);
  }

  function handleCreateStudentFlag() {
    setStoreStudent(true);
    setFlag(true);
    setInitialData({});
  }

  function handleEditStudentReverse() {
    setStoreStudent(false);
  }

  return (
    <Container>
      {storeStudent ? (
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
              <button
                type="submit"
                form="formStudent"
                id="buttonHandleSubmit"
                // onClick={flag ? handleCreateSubmit : handleUpdateSubmit}
              >
                Salvar
              </button>
            </div>
          </header>
          <StudentForm>
            <Form
              initialData={initialData}
              onSubmit={flag ? handleCreateSubmit : handleUpdateSubmit}
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
      ) : (
        <>
          <header>
            <h1>Gerenciando Alunos</h1>
            <div>
              <button type="button" onClick={handleCreateStudentFlag}>
                Cadastrar
              </button>
              <form>
                <input type="text" placeholder="Buscar Aluno" />
              </form>
            </div>
          </header>
          <StudentTable>
            <thead>
              <tr>
                <th>NOME</th>
                <th>E-MAIL</th>
                <th id="ageHead">IDADE</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {students.map(s => (
                <tr key={String(s.id)}>
                  <td>{s.name}</td>
                  <td id="email">{s.email}</td>
                  <td id="age">{s.age}</td>
                  <td id="action">
                    <button
                      id="buttonEditar"
                      type="button"
                      onClick={() => handleEditStudent(s)}
                    >
                      Editar
                    </button>
                    <button
                      id="buttonApagar"
                      type="button"
                      onClick={() => handleDeleteSubmit(s.id)}
                    >
                      Apagar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </StudentTable>
        </>
      )}
    </Container>
  );
}
