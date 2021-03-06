import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Container, PlanTable } from './styles';
import api from '~/services/api';

import { planDeleteRequest } from '~/store/modules/plans/actions';

export default function Students({ history }) {
  const dispatch = useDispatch();
  const [plans, setPlans] = useState([]);
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    async function listPlans() {
      const response = await api.get('plans');

      console.tron.log(response.data);

      setPlans(response.data);
    }
    listPlans();
  }, [plans]);

  function handleDeleteSubmit(id) {
    MySwal.fire({
      title: 'Tem certeza?',
      text: "Você não poderá reverter isso!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sim, excluir!'
    }).then((result) => {
      if (result.value) {
        MySwal.fire(
          'Exclusão!',
          'O plano foi excluido.',
          'success'
        )
        dispatch(planDeleteRequest(id));
      }
    })
  }

  function handleEditPlan(plan) {
    history.push({
      pathname: '/planStore',
      state: { store: false, plan },
    });
  }

  function handleCreatePlanFlag() {
    history.push({
      pathname: '/planStore',
      state: { store: true },
    });
  }

  return (
    <Container>
      <header>
        <h1>Gerenciando Planos</h1>
        <div>
          <button type="button" onClick={handleCreatePlanFlag}>
            Cadastrar
          </button>
        </div>
      </header>
      <PlanTable>
        <thead>
          <tr>
            <th>TÍTULO</th>
            <th>DURAÇÃO</th>
            <th id="valor">VALOR p/MÊS</th>
            <th />
          </tr>
        </thead>

        {plans.map(plan => (
          <tbody>
            <tr key={String(plan.id)}>
              <td id="title">{plan.title}</td>
              <td id="duration">
                {plan.duration}
                <span> {plan.duration > 1 ? 'meses' : 'mês'}</span>
              </td>
              <td id="price">R${plan.price}</td>
              <td id="action">
                <button
                  id="buttonEditar"
                  type="button"
                  onClick={() => handleEditPlan(plan)}
                >
                  Editar
                </button>
                <button
                  id="buttonApagar"
                  type="button"
                  onClick={() => handleDeleteSubmit(plan.id)}
                >
                  Apagar
                </button>
              </td>
            </tr>
          </tbody>
        ))}
      </PlanTable>
    </Container>
  );
}
