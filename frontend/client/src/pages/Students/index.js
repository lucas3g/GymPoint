import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Container, StudentTable } from './styles';
import api from '~/services/api';

import { studentDeleteRequest } from '~/store/modules/students/actions';

export default function Students({ history }) {
  const dispatch = useDispatch();
  const [searchStudent, setSearchStudent] = useState('');
  const [students, setStudents] = useState([]);
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    async function searchStudentByName() {
      const response = await api.get(
        searchStudent ? `students?q=${searchStudent}` : 'students'
      );

      console.tron.log(response.data);

      setStudents(response.data);
    }
    searchStudentByName();
  }, [searchStudent, students]);

  function handleDeleteSubmit(id) {
    MySwal.fire({
      title: 'Tem certeza?',
      text: 'Você não poderá reverter isso!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sim, excluir!',
    }).then(result => {
      if (result.value) {
        MySwal.fire('Exclusão!', 'O estudante foi excluido.', 'success');
        dispatch(studentDeleteRequest(id));
      }
    });
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
            <input
              name="q"
              type="text"
              placeholder="Buscar Aluno"
              onChange={text => setSearchStudent(text.target.value)}
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
