export const user_validation = {
  data() {
    return {
      userFormValidation: {
        "person.name": [
          {
            required: true,
            message: "Campo necessário",
            trigger: "blur"
          }
        ],

        name: [
          {
            required: true,
            message: "Campo necessário",
            trigger: "blur"
          }
        ],
        email: [
          {
            required: true,
            message: "Campo necessário",
            trigger: "blur"
          },
          { type: "email", message: "Email inváldo", trigger: "blur" }
        ],

        username: [
          {
            required: true,
            message: "Campo necessário",
            trigger: "blur"
          }
        ],

        password: [
          {
            required: true,
            message: "Campo necessário",
            trigger: "change"
          },
          {
            type: "string",
            min: 8,
            message: "A palavra passe deve ter no mínimo 8 caracteres",
            trigger: "blur"
          }
        ]
      }
    };
  }
};
