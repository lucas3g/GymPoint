import * as Yup from 'yup';
import Student from '../models/Student';

class StudentController {
  async index(req, res) {
    const students = await Student.findAll();

    return res.json(students);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number()
        .integer()
        .required(),
      weight: Yup.number().required(),
      height: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation faiels' });
    }

    const studentExists = await Student.findOne({
      where: { email: req.body.email },
    });

    if (studentExists) {
      return res.status(400).json({ error: 'Student already exists.' });
    }

    const { id, name, email, age, weight, height } = await Student.create(
      req.body
    );

    return res.json({
      id,
      name,
      email,
      age,
      weight,
      height,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      age: Yup.number()
        .integer()
        .positive(),
      weight: Yup.number().positive(),
      height: Yup.number().positive(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation faiels' });
    }

    const studentExists = await Student.findByPk(req.params.id);

    if (!studentExists) {
      return res.json({ error: 'Student does not exists' });
    }

    const { name, email, age, weight, height } = await Student.update(
      req.body,
      {
        where: { id: studentExists.id },
      }
    );

    return res.json({
      id: studentExists.id,
      name,
      email,
      age,
      weight,
      height,
    });
  }

  async delete(req, res) {
    const checkStudentsExists = await Student.findByPk(req.params.id);

    if (!checkStudentsExists) {
      return res.status(400).json({ error: 'Student not found!' });
    }

    await Student.destroy({ where: { id: req.params.id } });

    return res.json({ error: 'Student deleted with success!' });
  }
}

export default new StudentController();
