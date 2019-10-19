import * as Yup from 'yup';
import Student from '../models/Student';

class StudentController {
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
      return res.status(400).json({ error: 'Stundet already exists.' });
    }

    if (req.isAdm !== 1) {
      return res.json({ error: 'User is not an Administrator' });
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
      age: Yup.number().integer(),
      weight: Yup.number(),
      height: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation faiels' });
    }

    const studentExists = await Student.findByPk(req.params.id);

    if (!studentExists) {
      return res.json({ error: 'Student does not exists' });
    }

    if (req.isAdm !== 1) {
      return res.json({ error: 'User is not an Administrator' });
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
}

export default new StudentController();
