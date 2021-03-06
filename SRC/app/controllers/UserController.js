import User from '../models/User';

class UserController {
  async store(req, res) {
    const userExists = await User.findOne({ where: { email: req.body.email } });
    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const { id, name, email, provider } = await User.create(req.body);
    return res.json({ id, name, email, provider });
  }

  async update(req, res) {
    const { email, oldPasswors } = req.body;
    const user = await User.findByPk(req.userID);
    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } });
      if (userExists) {
        return res.status(400).json({ error: 'User already exists' });
      }
    }

    if (!(await user.checkPassword(oldPasswors))) {
      return res.status(401).json({ error: 'Password does not mach' });
    }

    return res.json({ ok: true });
  }
}
export default new UserController();
