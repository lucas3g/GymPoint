import * as Yup from 'yup';
import { parseISO, startOfDay, isBefore, addMonths } from 'date-fns';
import Matriculation from '../models/Matriculation';
import Plan from '../models/Plan';
import Student from '../models/Student';
import calculateMatriculation from '../../utils/calculateMatriculation';

import MatriculationMail from '../jobs/MatriculationMail';
import UpdateMatriculationMail from '../jobs/UpdateMatriculationMail';
import Queue from '../../lib/Queue';

class MatriculationController {
  async show(req, res) {
    const matriculations = await Matriculation.findOne({
      where: { id: req.params.id },
      attributes: [
        'id',
        'start_date',
        'end_date',
        'price',
        'active',
        'student_id',
        'plan_id',
      ],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['title'],
        },
      ],
    });

    return res.json(matriculations);
  }

  async index(req, res) {
    const matriculations = await Matriculation.findAll({
      attributes: [
        'id',
        'start_date',
        'end_date',
        'price',
        'active',
        'student_id',
        'plan_id',
      ],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['title'],
        },
      ],
    });

    return res.json(matriculations);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      start_date: Yup.date().required(),
      student_id: Yup.number()
        .integer()
        .required(),
      plan_id: Yup.number()
        .integer()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { student_id, plan_id } = req.body;

    const checkMatriculationExists = await Matriculation.findOne({
      where: { student_id },
    });

    if (checkMatriculationExists) {
      return res.status(401).json({ error: 'Student already has a plan' });
    }

    const { start_date } = req.body;

    const dateStart = startOfDay(parseISO(start_date));

    if (isBefore(dateStart, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permitted' });
    }

    const plan = await Plan.findOne({ where: { id: req.body.plan_id } });

    const MonthFinished = addMonths(parseISO(start_date), plan.duration);
    const priceFinal = calculateMatriculation(plan.duration, plan.price);

    const matriculation = await Matriculation.create({
      student_id,
      plan_id,
      start_date,
      end_date: MonthFinished,
      price: priceFinal,
    });

    const matriculationFinished = await Matriculation.findByPk(
      matriculation.id,
      {
        include: [
          {
            model: Student,
            as: 'student',
            attributes: ['name', 'email'],
          },
        ],
      }
    );

    await Queue.add(MatriculationMail.key, {
      matriculationFinished,
    });

    return res.json(matriculation);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number()
        .integer()
        .required(),
      plan_id: Yup.number()
        .integer()
        .required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const checkMatriculationExists = await Matriculation.findByPk(
      req.params.id
    );

    if (!checkMatriculationExists) {
      return res.status(400).json({ error: 'Matriculation not found!' });
    }

    const checkStudentExists = await Matriculation.findByPk(
      req.body.student_id
    );

    if (checkStudentExists) {
      return res.status(400).json({ error: 'Already Enrolled Student' });
    }

    const { student_id, plan_id, start_date } = req.body;

    const dateStart = startOfDay(parseISO(start_date));

    if (isBefore(dateStart, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permitted' });
    }

    const plan = await Plan.findOne({ where: { id: req.body.plan_id } });

    const MonthFinished = addMonths(parseISO(start_date), plan.duration);
    const priceFinal = calculateMatriculation(plan.duration, plan.price);

    await Matriculation.update(
      { ...req.body, end_date: MonthFinished, price: priceFinal },
      {
        where: { id: req.params.id },
      }
    );

    const matriculationFinished = await Matriculation.findByPk(req.params.id, {
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email'],
        },
      ],
    });

    await Queue.add(UpdateMatriculationMail.key, {
      matriculationFinished,
    });

    return res.json({
      id: req.params.id,
      student_id,
      plan_id,
      start_date,
      end_date: MonthFinished,
      price: priceFinal,
    });
  }

  async delete(req, res) {
    const checkPlanExist = await Matriculation.findByPk(req.params.id);

    if (!checkPlanExist) {
      return res.status(400).json({ error: 'Matriculation not found!' });
    }

    await Matriculation.destroy({ where: { id: req.params.id } });

    return res.json({ message: 'Matriculation deleted with success!' });
  }
}

export default new MatriculationController();
