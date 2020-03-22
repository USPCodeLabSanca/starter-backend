import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { User } from '../models/user.model';
import AuthValidator from '../validators/auth.validator';

const { env } = process;
const SALT_ROUNDS: number = +(env.SALT_ROUNDS || 10);
const JWT_SECRET: string = env.JWT_SECRET || 'secret';

export default {
  signup: async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    const validation = AuthValidator.signupValidation(req);
    if (validation.error) {
      return res.status(validation.statusCode).json(validation);
    }

    const salt = bcrypt.genSaltSync(SALT_ROUNDS);
    const hash = bcrypt.hashSync(password, salt);

    try {
      const newUser: any = await (new User({ name, email, password: hash })).save();

      const token = jwt.sign({ id: newUser.id, email: newUser.email }, JWT_SECRET);

      return res.status(200).json({
        name: newUser.name,
        token,
      });
    } catch (err) {
      return res.status(400).json(err);
    }
  },

  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const validation = AuthValidator.loginValidation(req);
    if (validation.error) {
      return res.status(validation.statusCode).json(validation);
    }

    try {
      const user: any = await User.findOne({ email });

      if (!bcrypt.compareSync(password, user.password)) {
        return res.status(400).json({
          error: 'Incorrect password.',
          statusCode: 400,
        });
      }

      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);

      return res.status(200).json({
        name: user.name,
        token,
      });
    } catch (err) {
      return res.status(400).json(err);
    }
  },
};
