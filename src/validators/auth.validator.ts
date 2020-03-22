import { Request } from 'express';

export default {
  signupValidation: (req: Request) => {
    const { name, email, password } = req.body;

    if (!name) {
      return {
        error: 'Missing \'name\' field.',
        statusCode: 400,
      };
    }

    if (!email) {
      return {
        error: 'Missing \'email\' field.',
        statusCode: 400,
      };
    }

    if (!password) {
      return {
        error: 'Missing \'password\' field.',
        statusCode: 400,
      };
    }

    return {
      error: null,
    };
  },

  loginValidation: (req: Request) => {
    const { email, password } = req.body;

    if (!email) {
      return {
        error: 'Missing \'email\' field.',
        statusCode: 400,
      };
    }

    if (!password) {
      return {
        error: 'Missing \'password\' field.',
        statusCode: 400,
      };
    }

    return {
      error: null,
    };
  },
};
