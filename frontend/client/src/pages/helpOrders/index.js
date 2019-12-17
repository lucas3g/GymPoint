import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import Popup from 'reactjs-popup';
import { Input, Form } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import { Container, Header, Help } from './styles';
import Box from '../../components/Box';
import api from '~/services/api';

export default function HelpOrders({ history }) {
  const schema = Yup.object().shape({
    name: Yup.string(),
    id: Yup.string(),
    answer: Yup.string().required('Resposta é obrigatória!'),
  });

  const [helpOrders, setHelpOrders] = useState([]);

  useEffect(() => {
    async function loadHelpOrders() {
      const response = await api.get('/help-orders');

      setHelpOrders(response.data);
    }
    loadHelpOrders();
  }, [helpOrders]);

  async function handleAwnser(data) {
    await api.post(`/help-orders/${data.id}/answer`, data);
    toast.success('Resposta enviada com sucesso');
    history.push('/helporders');
  }

  return (
    <Container>
      <Header>Pedidos de auxílio</Header>
      <Box>
        {helpOrders.length === 0 ? (
          <strong className="nohelp">Sem pedidos de auxílio no momento</strong>
        ) : (
          helpOrders.map(help => (
            <Help key={help.id}>
              <li>{help.student.name}</li>

              <div>
                <Popup
                  trigger={
                    <button type="button" className="button">
                      Responder
                    </button>
                  }
                  modal
                  closeOnDocumentClick
                >
                  <div className="modal">
                    <Form
                      initialData={help}
                      onSubmit={handleAwnser}
                      schema={schema}
                    >
                      <div>
                        <div>
                          <strong>ALUNO:</strong>
                          <Input
                            name="name"
                            disabled
                            placeholder={help.student.name}
                            // value={help.student.name}
                          />
                        </div>
                        <div>
                          <strong>Número da pergunta:</strong>
                          <Input
                            name="id"
                            disabled
                            placeholder={help.id}
                            // value={help.id}
                          />
                        </div>
                      </div>
                      <strong>PERGUNTA DO ALUNO</strong>

                      <p>{help.question}</p>
                      <strong>SUA RESPOSTA</strong>

                      <Input
                        name="answer"
                        multiline
                        placeholder="Escreva sua resposta aqui..."
                      />
                      <button type="submit">ENVIAR RESPOSTA</button>
                    </Form>
                  </div>
                </Popup>
              </div>
            </Help>
          ))
        )}
      </Box>
    </Container>
  );
}
