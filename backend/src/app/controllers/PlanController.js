import * as Yup from 'yup';
import Plan from '../models/Plan';

class PlanController {
  async index(req, res) {
    const plans = await Plan.findAll();

    return res.json(plans);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number()
        .integer()
        .required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { title, duration, price } = await Plan.create(req.body);

    return res.json({
      title,
      duration,
      price,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number()
        .integer()
        .required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const checkPlanExist = await Plan.findByPk(req.params.id);

    if (!checkPlanExist) {
      return res.status(400).json({ error: 'Plan not found!' });
    }

    const { title, duration, price } = await Plan.update(req.body, {
      where: { id: req.params.id },
    });

    return res.json({
      title,
      duration,
      price,
    });
  }

  async delete(req, res) {
    const checkPlanExist = await Plan.findByPk(req.params.id);

    if (!checkPlanExist) {
      return res.status(400).json({ error: 'Plan not found!' });
    }

    await Plan.destroy({ where: { id: req.params.id } });
    return res.json({ error: 'Plan deleted with success!' });
  }
}

export default new PlanController();
