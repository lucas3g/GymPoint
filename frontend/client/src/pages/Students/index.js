import React, { useState, useEffect } from 'react';
import { Input } from '@rocketseat/unform';
import { useSelector, useDispatch } from 'react-redux';
import { Container, StudentTable } from './styles';
import api from '~/services/api';

import {
  studentDeleteRequest,
  studentListRequest,
} from '~/store/modules/students/actions';

export default function Students({ history }) {
  const dispatch = useDispatch();
  const [searchStudent, setSearchStudent] = useState('');
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function searchStudentByName() {
      const response = await api.get('students', {
        query: { q: searchStudent },
      });

      console.tron.log(response.data);

      setStudents(response.data);
    }
    searchStudentByName();
  }, [searchStudent]);

  useEffect(() => {
    if (!searchStudent) {
      dispatch(studentListRequest());
    }
  }, [students, dispatch, searchStudent]);

  function handleDeleteSubmit(id) {
    dispatch(studentDeleteRequest(id));
  }

  function handleEditStudent(student) {
    history.push({
      pathname: '/studentsStore',
      state: { store: false, student },
    });
  }

  function handleCreateStudentFlag() {
    history.push({
      pathname: '/studentsStore',
      state: { store: true },
    });
  }

  return (
    <Container>
      <header>
        <h1>Gerenciando Alunos</h1>
        <div>
          <button type="button" onClick={handleCreateStudentFlag}>
            Cadastrar
          </button>
          <form>
            <Input
              name="searchStudent"
              type="text"
              placeholder="Buscar Aluno"
              onChange={setSearchStudent}
            />
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

        {students.map(student => (
          <tbody>
            <tr key={String(student.id)}>
              <td>{student.name}</td>
              <td id="email">{student.email}</td>
              <td id="age">{student.age}</td>
              <td id="action">
                <button
                  id="buttonEditar"
                  type="button"
                  onClick={() => handleEditStudent(student)}
                >
                  Editar
                </button>
                <button
                  id="buttonApagar"
                  type="button"
                  onClick={() => handleDeleteSubmit(student.id)}
                >
                  Apagar
                </button>
              </td>
            </tr>
          </tbody>
        ))}
      </StudentTable>
    </Container>
  );
}
