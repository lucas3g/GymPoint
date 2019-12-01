import * as Yup from 'yup';
import { Op } from 'sequelize';
import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

import AnswerMail from '../jobs/AnswerMail';
import Queue from '../../lib/Queue';

class AnswerController {
  async store(req, res) {
    const schema = Yup.object().shape({
      answer: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;
    const { answer } = req.body;

    const checkQuestionExists = await HelpOrder.findOne({ where: { id } });

    if (!checkQuestionExists) {
      return res.status(400).json({ error: 'Question does not exists' });
    }

    const checkAnswer = await HelpOrder.findOne({
      where: {
        id,
        answer: {
          [Op.not]: null,
        },
      },
    });

    if (checkAnswer) {
      return res
        .status(401)
        .json({ error: 'Question has already been answered ' });
    }

    const helpOrder = await HelpOrder.findOne({ where: { id } });

    helpOrder.answer = answer;
    helpOrder.answer_at = new Date();

    await helpOrder.save();

    const helpOrderFinished = await HelpOrder.findByPk(helpOrder.id, {
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email'],
        },
      ],
    });

    await Queue.add(AnswerMail.key, {
      helpOrderFinished,
    });

    return res.json(helpOrder);
  }
}

export default new AnswerController();
