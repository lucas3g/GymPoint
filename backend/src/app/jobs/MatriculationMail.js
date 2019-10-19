import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class MatriculationMail {
  get key() {
    return 'MatriculationMail';
  }

  async handle({ data }) {
    const { matriculationFinished } = data;

    console.log('A fila executou');

    await Mail.sendMail({
      to: `${matriculationFinished.student.name} <${matriculationFinished.student.email}>`,
      subject: 'Bem-Vindo ao GymPoint - Bora ficar MONSTRÃO',
      template: 'matriculation',
      context: {
        student: matriculationFinished.student.name,
        start_date: format(
          parseISO(matriculationFinished.start_date),
          "'dia' dd 'de' MMM', às' H:mm'h'",
          {
            locale: pt,
          }
        ),
        end_date: format(
          parseISO(matriculationFinished.end_date),
          "'dia' dd 'de' MMM', às' H:mm'h'",
          {
            locale: pt,
          }
        ),
        price: matriculationFinished.price,
      },
    });
  }
}

export default new MatriculationMail();
