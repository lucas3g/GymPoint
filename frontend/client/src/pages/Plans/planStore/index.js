import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import NumberFormat from 'react-number-format';
import { Container, ContentForm, PlanForm } from './styles';


import {
  planCreateRequest,
  planUpdateRequest,
} from '~/store/modules/plans/actions';

export default function PlanStore({ history }) {
  const schema = Yup.object().shape({
    title: Yup.string().required('Titulo do Plano é obrigatório'),
    duration: Yup.number()
      .integer()
      .required('Duração do Plano é obrigatória'),
    price: Yup.number().required('Preço do Plano é obrigatória'),
  });

  const dispatch = useDispatch();
  const [priceFinal, setPriceFinal] = useState('');
  const [duration, setDuration] = useState('');
  const [price, setPrice] = useState('');
  const { plan } = history.location.state;
  const { store } = history.location.state;

  const [initialData, setInitialData] = useState({});

  useEffect(() => {
    setInitialData(plan);
  }, [plan]);

  useMemo(() => {
    setPriceFinal(plan ? plan.duration * plan.price : duration * price);
  }, [price, duration]);

  function handleCreateSubmit(data) {
    dispatch(planCreateRequest(data));
  }

  function handleUpdateSubmit(data) {
    dispatch(planUpdateRequest(data, initialData.id));
  }

  function handleEditPlanReverse() {
    history.push('/plans');
  }

  return (
    <Container>
      <ContentForm>
        <header id="HeaderForm">
          <h1>Cadastro de Plano</h1>
          <div>
            <button id="voltar" type="button" onClick={handleEditPlanReverse}>
              Voltar
            </button>
            <button type="submit" form="formPlan" id="buttonHandleSubmit">
              Salvar
            </button>
          </div>
        </header>
        <PlanForm>
          <Form
            schema={schema}
            initialData={initialData}
            onSubmit={store ? handleCreateSubmit : handleUpdateSubmit}
            id="formPlan"
          >
            <div id="div1">
              <ul>
                <li>
                  <strong>TITULO DO PLANO</strong>
                  <Input name="title" type="text" placeholder="Nome do Plano" />
                </li>
              </ul>
            </div>
            <div id="div2">
              <ul>
                <li>
                  <strong>DURAÇÃO(em meses)</strong>
                  <Input
                    name="duration"
                    type="number"
                    placeholder="0"
                    pattern="[0-9]+([,\.][0-9]+)?"
                    min="0"
                    step="any"
                    onChange={text => setDuration(text.target.value)}
                  />
                </li>
                <li>
                  <strong>PREÇO MENSAL</strong>
                  <Input
                    name="price"
                    type="number"
                    placeholder="0.00"
                    pattern="[0-9]+([,\.][0-9]+)?"
                    min="0"
                    step="any"
                    onChange={text => setPrice(text.target.value)}
                  />
                </li>
                <li>
                  <strong>PREÇO TOTAL</strong>
                  <NumberFormat
                    name="pricetotal"
                    displayType="input"
                    thousandSeparator
                    prefix="R$"
                    placeholder={priceFinal}
                    disabled
                    value={priceFinal}
                  />
                </li>
              </ul>
            </div>
          </Form>
        </PlanForm>
      </ContentForm>
    </Container>
  );
}
