import Mail from '../../lib/Mail';

class AnswerMail {
  get key() {
    return 'AnswerMail';
  }

  async handle({ data }) {
    const { helpOrderFinished } = data;

    console.log('A fila executou');

    await Mail.sendMail({
      to: `${helpOrderFinished.student.name} <${helpOrderFinished.student.email}>`,
      subject: 'Sua pergunta foi respondida - GymPoint',
      template: 'answer',
      context: {
        student: helpOrderFinished.student.name,
        question: helpOrderFinished.question,
        answer: helpOrderFinished.answer,
        answer_at: helpOrderFinished.answer_at,
      },
    });
  }
}

export default new AnswerMail();
