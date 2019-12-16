/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect, useMemo } from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';

import { format, addMonths, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import DatePicker from '~/components/DatePicker';
import AsyncSelect from '~/components/AsyncSelect';
import Select from '~/components/Select';
import { formatPrice } from '~/utils/format';

import api from '~/services/api';

import 'react-datepicker/dist/react-datepicker.css';

import { Container, ContentForm, EnrollmentForm } from './styles';

export default function Enrollments({ history }) {
  const { enrollment } = history.location.state;
  const { store } = history.location.state;
  const [plans, setPlans] = useState([]);
  const [planList, setPlanList] = useState({});
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [initialData, setInitialData] = useState({});

  const schema = Yup.object().shape({
    student_id: Yup.string().required('Nome é obrigatório!'),
    plan_id: Yup.string().required('Plano é obrigatório!'),
    start_date: Yup.date().required('Data é obrigatoria!'),
  });

  async function handleCreateSubmit(data) {
    const { student, plan, start_date } = data;
    console.tron.log({
      student_id: student.value,
      plan_id: plan.value,
      start_date,
    });

      await api.post('/matriculations', {
        student_id: student.value,
        plan_id: plan.value,
        start_date: data.start_date,
      })
      .then(function (response) {
        console.tron.log(response);
        toast.success('Matrícula realizada com sucesso!');
        history.push('/enrollments');
      })
      .catch(function (error) {
        toast.error(error);
        console.tron.log(error);
      });


  }

  async function loadStudents(inputValue) {
    const response = await api
      .get('students', {
        params: { name: `${inputValue}` },
      })
      .then(r => r.data)
      .then(r =>
        r.map(student => ({
          label: `${student.id} - ${student.name}`,
          value: student.id,
        }))
      );
    return response;
  }

  function handleUpdateSubmit(data) {}

  async function loadPlans() {
    const response = await api
      .get('plans', {
        params: { page: 1, per_page: 100 },
      })
      .then(r => r.data)
      .then(d =>
        d.map(p => ({
          label: p.title,
          value: p.id,
          duration: p.duration,
          price: p.price,
        }))
      );

    setPlans(response);
  }

  const end_date = useMemo(() => {
    if (!planList.duration) {
      return '';
    }
    const { duration } = planList;
    const formattedDate = format(
      addMonths(startDate, duration),
      "dd'/'MM'/'yyyy",
      {
        locale: pt,
      }
    );
    return formattedDate;
  }, [planList, startDate]);

  const totalPrice = useMemo(() => {
    if (!planList.price) return '';

    return formatPrice(Number(planList.duration) * Number(planList.price));
  }, [planList.duration, planList.price]);

  useEffect(() => {
    loadPlans();
    setInitialData({
      end_date,
      totalPrice,
    });
  }, [end_date, startDate, totalPrice]);

  useEffect(() => {
    setInitialData({
      student: enrollment ? enrollment.student_id : '',
      plan: enrollment ? enrollment.plan_id : '',
      start_date: enrollment ? format(parseISO(enrollment.start_date), "dd'/'MM'/'yyyy", {
        locale: pt,
      }) : '',
      end_date: enrollment ?  format(parseISO(enrollment.end_date), "dd'/'MM'/'yyyy", {
        locale: pt,
      }): '',
      price: enrollment ?  enrollment.price: '',
    });
  }, [enrollment]);

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
                  <AsyncSelect
                    name="student"
                    loadOptions={loadStudents}
                    label="ALUNO"
                  />
                </li>
              </ul>
            </div>
            <div id="div2">
              <ul>
                <li>
                  <strong>PLANO</strong>
                  <Select
                    name="plan"
                    options={plans}
                    setChange={setPlanList}
                  />
                </li>
                <li>
                  <strong>DATA DE INÍCIO</strong>
                  <DatePicker
                    name="start_date"
                    setChange={setStartDate}
                    selectedDate={startDate}
                  />
                </li>
                <li>
                  <strong>DATA DE TÉRMINO</strong>
                  <Input name="end_date" type="text" readOnly available={true} />
                </li>
                <li>
                  <strong>VALOR FINAL</strong>
                  <Input
                    name="totalPrice"
                    type="text"
                    placeholder="0.00"
                    readOnly
                    available={true}
                    value={enrollment ? enrollment.price : totalPrice}
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
