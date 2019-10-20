import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';
import moneyFormated from '../../utils/moneyFormat';

class UpdateMatriculationMail {
  get key() {
    return 'UpdateMatriculationMail';
  }

  async handle({ data }) {
    const { matriculationFinished } = data;

    console.log('A fila executou');

    await Mail.sendMail({
      to: `${matriculationFinished.student.name} <${matriculationFinished.student.email}>`,
      subject: 'Academia GymPoint informa dados alterados',
      template: 'updateMatriculation',
      context: {
        student: matriculationFinished.student.name,
        start_date: format(
          parseISO(matriculationFinished.start_date),
          "'dia' dd 'de' MMM 'de' yyyy ', às' H:mm'h'",
          {
            locale: pt,
          }
        ),
        end_date: format(
          parseISO(matriculationFinished.end_date),
          "'dia' dd 'de' MMM 'de' yyyy ', às' H:mm'h'",
          {
            locale: pt,
          }
        ),
        price: moneyFormated(matriculationFinished.price),
      },
    });
  }
}

export default new UpdateMatriculationMail();
