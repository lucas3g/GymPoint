// import { differenceInDays } from 'date-fns';
import { Op } from 'sequelize';
import moment from 'moment';
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

    const checkDate = await Checkin.findAll({
      where: {
        student_id: id,
        createdAt: {
          [Op.gte]: moment()
            .subtract(7, 'days')
            .toDate(),
        },
      },
    });
    // console.log(checkDate);
    if (checkDate.length >= 5) {
      return res
        .status(401)
        .json({ error: 'Only 5 checkins allowed within 7 days', checkDate });
    }

    const checkin = await Checkin.create({
      student_id: id,
    });

    return res.json({ checkin });
  }
}

export default new CheckinController();
