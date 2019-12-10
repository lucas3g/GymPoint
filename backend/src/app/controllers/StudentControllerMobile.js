import Student from '../models/Student';

class StudentControllerMobile {
  async show(req, res) {
    const student = await Student.findByPk(req.params.id);

    return res.json({ student });
  }
}

export default new StudentControllerMobile();
