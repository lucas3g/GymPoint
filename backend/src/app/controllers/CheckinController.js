import { differenceInDays } from 'date-fns';
import Checkin from '../models/Checkin';
import Student from '../models/Student';

class CheckinController {
  async index(req, res) {
    const checkins = await Checkin.findAll({
      where: { student_id: req.params.id },
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name'],
        },
      ],
    });

    return res.json(checkins);
  }

  async store(req, res) {
    const { id } = req.params;

    const checkCheckin = await Checkin.findAndCountAll({
      where: { student_id: id },
    });

    const checkDate = await Checkin.findOne({
      where: { student_id: id },
      order: [['createdAt', 'DESC']],
    });

    const diffDays = differenceInDays(checkDate.createdAt, new Date());

    if (checkCheckin.count > 5 && diffDays < 7) {
      return res
        .status(401)
        .json({ error: 'Only 5 checkins allowed within 7 days' });
    }

    const checkin = await Checkin.create({
      student_id: id,
    });

    return res.json(checkin);
  }
}

export default new CheckinController();
