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

export const school_validation = {
  data() {
    return {
      schoolFormValidation: {
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

        abbr: [
          {
            required: true,
            message: "Campo necessário",
            trigger: "blur"
          }
        ]
      }
    };
  }
};

export const mult_form_validation = {
  data() {
    return {
      contactValidation: {
        contact: [
          {
            required: true,
            message: "Insira um contacto",
            trigger: "blur"
          }
        ],

        email: [
          {
            required: true,
            message: "Insira um email",
            trigger: "blur"
          },
          { type: "email", message: "Email inválido", trigger: "blur" }
        ]
      },

      markValidation: {
        designation: [
          {
            required: true,
            message: "Insira uma desiguinação",
            trigger: "blur"
          }
        ],

        begin: [
          {
            required: true,
            message: "Insira a data de inicio",
            type: "date",
            trigger: "change"
          }
        ],

        end: [
          {
            required: true,
            message: "Insira a data de fim",
            type: "date",
            trigger: "change"
          }
        ],

        content: [
          {
            required: true,
            message: "Descreva este marco",
            trigger: "blur"
          }
        ]
      },

      guidelineValidation: {
        name: [
          {
            required: true,
            message: "Insira o nome",
            trigger: "blur"
          }
        ],

        icon: [
          {
            required: true,
            message: "Insira um icone",
            trigger: "blur"
          }
        ],

        description: [
          {
            required: true,
            message: "Apresente uma descrição",
            trigger: "blur"
          }
        ]
      },

      muralValidation: {
        designation: [
          {
            required: true,
            message: "Insira o nome",
            trigger: "blur"
          }
        ],

        icon: [
          {
            required: true,
            message: "Insira um icone",
            trigger: "blur"
          }
        ],

        description: [
          {
            required: true,
            message: "Apresente uma descrição",
            trigger: "blur"
          }
        ]
      }
    };
  }
};
