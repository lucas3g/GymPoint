import React, { useState, useEffect } from 'react';
import { parseISO, startOfDay, isBefore, addMonths } from 'date-fns';
import { Form, Input, Select } from '@rocketseat/unform';
import DatePicker from 'react-datepicker';
import { toast } from 'react-toastify';
import { Container, ContentForm, EnrollmentForm } from './styles';
import 'react-datepicker/dist/react-datepicker.css';
import api from '~/services/api';

export default function EnrollmentStore({ history }) {
  const { enrollment } = history.location.state;
  const { store } = history.location.state;
  const [plans, setPlans] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [initialData, setInitialData] = useState({});

  useEffect(() => {
    setInitialData(enrollment);
  }, [enrollment]);

  useEffect(() => {
    async function loadPlan() {
      const response = await api.get('plans');

      console.tron.log(response.data);

      setPlans(response.data);
    }
    loadPlan();
  }, []);

  const options = plans.map(plan => ({ id: plan.id, title: plan.title }));

  async function handleCreateSubmit(data) {
    const matricula = {
      student_id: data.student_id,
      plan_id: data.plan_id,
      start_date: startDate,
      end_date: endDate,
      price: data.price,
    };
    await api.post('matriculations', matricula);

    toast.success('Matricula cadastrada com sucesso!');
  }

  function handleUpdateSubmit(data) {}

  function handleEditEnrollmentReverse() {
    history.push('/enrollments');
  }

  return (
    <Container>
      <ContentForm>
        <header id="HeaderForm">
          <h1>Cadastro da Matrícula</h1>
          <div>
            <button
              id="voltar"
              type="button"
              onClick={handleEditEnrollmentReverse}
            >
              Voltar
            </button>
            <button type="submit" form="formEnrollment" id="buttonHandleSubmit">
              Salvar
            </button>
          </div>
        </header>
        <EnrollmentForm>
          <Form
            initialData={initialData}
            onSubmit={store ? handleCreateSubmit : handleUpdateSubmit}
            id="formEnrollment"
          >
            <div id="div1">
              <ul>
                <li>
                  <strong>ALUNO</strong>
                  <Input
                    name="student_id"
                    type="text"
                    placeholder="Buscar Aluno"
                  />
                </li>
              </ul>
            </div>
            <div id="div2">
              <ul>
                <li>
                  <strong>PLANO</strong>
                  <Select name="plan_id" options={options} />
                </li>
                <li>
                  <strong>DATA DE INÍCIO</strong>
                  <DatePicker
                    selected={startDate}
                    onChange={date => setStartDate(date)}
                  />
                </li>
                <li>
                  <strong>DATA DE TÉRMINO</strong>
                  <DatePicker
                    selected={startDate}
                    onChange={date => setEndDate(date)}
                  />
                </li>
                <li>
                  <strong>VALOR FINAL</strong>
                  <Input
                    name="price"
                    type="number"
                    placeholder="0.00"
                    pattern="[0-9]+([,\.][0-9]+)?"
                    min="0"
                    step="any"
                  />
                </li>
              </ul>
            </div>
          </Form>
        </EnrollmentForm>
      </ContentForm>
    </Container>
  );
}
