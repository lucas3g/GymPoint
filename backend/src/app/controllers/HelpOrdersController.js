import * as Yup from 'yup';
import { Op } from 'sequelize';
import Student from '../models/Student';
import HelpOrder from '../models/HelpOrder';

import AnswerMail from '../jobs/AnswerMail';
import Queue from '../../lib/Queue';

class HelpOrdersController {
  async show(req, res) {
    const checkStudentExists = await Student.findByPk(req.params.id);

    if (!checkStudentExists) {
      return res.status(400).json({ error: 'Student does not exists' });
    }

    const searchHO = await HelpOrder.findAll({
      where: { student_id: checkStudentExists.id },
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name'],
        },
      ],
    });

    return res.json(searchHO);
  }

  async index(req, res) {
    const answer = await HelpOrder.findAll({
      where: { answer: null },
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name'],
        },
      ],
    });

    if (!answer) {
      res.status(404).json({ message: 'No questions to answer' });
    }

    return res.json(answer);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      question: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const checkStudentExists = await Student.findByPk(req.params.id);

    if (!checkStudentExists) {
      return res.status(400).json({ error: 'Student does not exists' });
    }

    const { question } = req.body;

    const helpOrder = await HelpOrder.create({
      student_id: checkStudentExists.id,
      question,
    });

    return res.json({ helpOrder });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      answer: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const checkStudentExists = await Student.findByPk(req.params.id);

    if (!checkStudentExists) {
      return res.status(400).json({ error: 'Student does not exists' });
    }

    const { id } = req.params;
    const { answer } = req.body;

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

export default new HelpOrdersController();
