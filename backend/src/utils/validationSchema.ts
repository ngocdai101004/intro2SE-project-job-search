export const createUserValidationSchema = {
  email: {
    in: ["body"],
    isEmail: {
      errorMessage: "Username must be a valid email",
    },
    notEmpty: {
      errorMessage: "Username must not be empty",
    },
    isString: {
      errorMessage: "Username must be a string",
    },
  },
  password: {
    in: ["body"],
    isLength: {
      option: {
        min: 5,
        max: 30,
      },
      errorMessage: "Password must be between 5  and 30 characters",
    },
    notEmpty: {
      errorMessage: "Password must not be empty",
    },
    isString: {
      errorMessage: "Password must be a string",
    },
    matches: {
      options: [/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/],
      errorMessage:
        "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
    },
  },
};
