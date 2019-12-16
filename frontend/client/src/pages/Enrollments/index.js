import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { MdCheck, MdClose } from 'react-icons/md';
import { Container, EnrollmentTable } from './styles';
import api from '~/services/api';

export default function Enrollments({ history }) {
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    async function loadEnrollments() {
      const response = await api.get('matriculations');

      setEnrollments(response.data);
    }
    loadEnrollments();
  }, [enrollments]);

  function handleEditEnrollment(enrollment) {
    history.push({
      pathname: '/enrollmentStore',
      state: { store: false, enrollment },
    });
  }

  function handleCreateEnrollmentFlag() {
    history.push({
      pathname: '/enrollmentStore',
      state: { store: true },
    });
  }

  async function handleDeleteSubmit(id) {
    await api.delete(`matriculations/${id}`);
  }

  return (
    <Container>
      <header>
        <h1>Gerenciando Matrículas</h1>
        <div>
          <button type="button" onClick={handleCreateEnrollmentFlag}>
            Cadastrar
          </button>
        </div>
      </header>
      <EnrollmentTable>
        <thead>
          <tr>
            <th>ALUNO</th>
            <th>PLANO</th>
            <th id="start_date">INÍCIO</th>
            <th id="end_date">TÉRMINO</th>
            <th id="active">ATIVA</th>
            <th />
          </tr>
        </thead>

        {enrollments.map(enrollment => (
          <tbody>
            <tr key={String(enrollment.id)}>
              <td>{enrollment.student.name}</td>
              <td>{enrollment.plan.title}</td>
              <td id="start_date">
                {format(
                  parseISO(enrollment.start_date),
                  "dd 'de' MMMM 'de' yyyy",
                  { locale: pt }
                )}
              </td>
              <td id="end_date">
                {format(
                  parseISO(enrollment.end_date),
                  "dd 'de' MMMM 'de' yyyy",
                  { locale: pt }
                )}
              </td>
              <td id="active">{enrollment.active  === false ? <MdClose size={18} color="#ff0000" /> : <MdCheck size={18} color="#0dff00" />}</td>
              <td id="action">
                <button
                  id="buttonEditar"
                  type="button"
                  onClick={() => handleEditEnrollment(enrollment)}
                >
                  Editar
                </button>
                <button
                  id="buttonApagar"
                  type="button"
                  onClick={() => handleDeleteSubmit(enrollment.id)}
                >
                  Apagar
                </button>
              </td>
            </tr>
          </tbody>
        ))}
      </EnrollmentTable>
    </Container>
  );
}
