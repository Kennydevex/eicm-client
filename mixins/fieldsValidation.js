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

export const permission_validation = {
  data() {
    return {
      permissionFormValidation: {
        name: [
          {
            required: true,
            message: "Obrigatório a intrução de uma designação",
            trigger: "blur"
          }
        ]
      }
    };
  }
};

export const charge_validation = {
  data() {
    return {
      chargeFormValidation: {
        name: [
          {
            required: true,
            message: "Campo necessário",
            trigger: "blur"
          }
        ],

        description: [
          {
            required: true,
            message: "Campo necessário",
            trigger: "blur"
          }
        ],

        section: [
          {
            required: true,
            message: "Campo necessário",
            trigger: "change"
          }
        ]
      }
    };
  }
};

export const discipline_validation = {
  data() {
    return {
      disciplineFormValidation: {
        name: [
          {
            required: true,
            message: "Campo necessário",
            trigger: "blur"
          }
        ],

        description: [
          {
            required: true,
            message: "Campo necessário",
            trigger: "blur"
          }
        ],

        type: [
          {
            required: true,
            message: "Campo necessário",
            trigger: "change"
          }
        ]
      }
    };
  }
};

export const departament_validation = {
  data() {
    return {
      departamentFormValidation: {
        name: [
          {
            required: true,
            message: "Campo necessário",
            trigger: "blur"
          }
        ],

        description: [
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

export const family_validation = {
  data() {
    return {
      familyFormValidation: {
        name: [
          {
            required: true,
            message: "Campo necessário",
            trigger: "blur"
          }
        ],

        description: [
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

export const outcome_validation = {
  data() {
    return {
      outcomeFormValidation: {
        name: [
          {
            required: true,
            message: "Campo necessário",
            trigger: "blur"
          }
        ],

        description: [
          {
            required: true,
            message: "Campo necessário",
            trigger: "blur"
          }
        ],

        type: [
          {
            required: true,
            message: "Campo necessário",
            trigger: "change"
          }
        ]
      }
    };
  }
};

export const employee_validation = {
  data() {
    return {
      employeeFormValidation: {
        "person.name": [
          {
            required: true,
            message: "Campo necessário",
            trigger: "blur"
          }
        ],

        email: [{ type: "email", message: "Email inváldo", trigger: "blur" }],

        ic: [
          {
            required: true,
            message: "Campo necessário",
            trigger: "blur"
          }
        ],

        "charges.0.encumbrance.charge_id": [
          {
            required: true,
            type: "number",
            message: "Campo necessário",
            trigger: "change"
          }
        ],

        "charges.0.encumbrance.activity_begin": [
          {
            required: true,
            message: "Campo necessário",
            trigger: "change"
            // Aqui removeu-se o type: 'date' para impedir um erro
          }
        ],

        "person.user.email": [
          {
            required: true,
            message: "Campo necessário",
            trigger: "blur"
          },
          { type: "email", message: "Email inváldo", trigger: "blur" }
        ],

        "person.user.name": [
          {
            required: true,
            message: "Campo necessário",
            trigger: "blur"
          }
        ],

        "person.user.password": [
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

export const course_validation = {
  data() {
    return {
      courseFormValidation: {
        name: [
          {
            required: true,
            message: "Campo necessário",
            trigger: "blur"
          }
        ],
        summary: [
          {
            required: true,
            message: "Campo necessário",
            trigger: "blur"
          }
        ],

        family_id: [
          {
            required: true,
            type: "number",

            message: "Campo necessário",
            trigger: "change"
          },
          { type: "number", message: "numero", trigger: "change" }
        ],

        release: [
          {
            required: true,
            // type: "date",
            message: "Campo necessário",
            trigger: "change"
          }
        ],

        type: [
          {
            required: true,

            message: "Campo necessário",
            trigger: "change"
          }
        ],

        departament_id: [
          {
            required: true,
            type: "number",

            message: "Campo necessário",
            trigger: "change"
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

export const category_validation = {
  data() {
    return {
      categoryFormValidation: {
        name: [
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

export const tag_validation = {
  data() {
    return {
      tagFormValidation: {
        name: [
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

export const article_validation = {
  data() {
    return {
      articleFormValidation: {
        title: [
          {
            required: true,
            message: "Campo necessário",
            trigger: "blur"
          }
        ],

        summary: [
          {
            required: true,
            message: "Campo necessário",
            trigger: "blur"
          }
        ],

        content: [
          {
            required: true,
            message: "Campo necessário",
            trigger: "blur"
          }
        ],
        category_id: [
          {
            required: true,
            type: "number",
            message: "Campo necessário",
            trigger: "change"
          }
        ]
      }
    };
  }
};

export const partner_validation = {
  data() {
    return {
      partnerFormValidation: {
        name: [
          {
            required: true,
            message: "Campo necessário",
            trigger: "blur"
          }
        ],

        link: [
          {
            type: "url",
            message: "Insira um URL Válido (Ex: https://www.exemplo.cv)",
            trigger: "blur"
          }
        ]
      }
    };
  }
};

export const testimonial_validation = {
  data() {
    return {
      testimonialFormValidation: {
        name: [
          {
            required: true,
            message: "Campo necessário",
            trigger: "blur"
          }
        ],

        type: [
          {
            required: true,
            message: "Campo necessário",
            trigger: "change"
          }
        ],

        message: [
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

export const mural_validation = {
  data() {
    return {
      muralFormValidation: {
        designation: [
          {
            required: true,
            message: "Campo necessário",
            trigger: "blur"
          }
        ],

        description: [
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

export const guideline_validation = {
  data() {
    return {
      guidelineFormValidation: {
        name: [
          {
            required: true,
            message: "Campo necessário",
            trigger: "blur"
          }
        ],

        description: [
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

export const mark_validation = {
  data() {
    return {
      markFormValidation: {
        designation: [
          {
            required: true,
            message: "Campo necessário",
            trigger: "blur"
          }
        ],

        content: [
          {
            required: true,
            message: "Campo necessário",
            trigger: "blur"
          }
        ],

        begin: [
          {
            required: true,
            message: "Campo necessário",
            trigger: "change"
          }
        ]
      }
    };
  }
};

export const slider_validation = {
  data() {
    return {
      sliderFormValidation: {
        title: [
          {
            required: true,
            message: "Campo necessário",
            trigger: "blur"
          }
        ],

        link: [
          {
            required: true,
            message: "Campo necessário",
            trigger: "blur"
          },
          {
            type: "url",
            message: "Insira um URL Válido (Ex: https://www.exemplo.cv)",
            trigger: "blur"
          }
        ],

        description: [
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
            // type: "date",
            trigger: "change"
          }
        ],

        end: [
          {
            required: true,
            message: "Insira a data de fim",
            // type: "date",
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
      },

      attributionValidation: {
        "attribution.discipline_id": [
          {
            required: true,
            type: "number",
            message: "Insira uma disciplina aqui",
            trigger: "change"
          }
        ],

        "attribution.workload": [
          {
            type: "integer",
            message: "Carga horária tem de ser numero",
            trigger: "blur"
          },
          {
            required: true,
            type: "integer",
            message: "Insira uma carga horária",
            trigger: "blur"
          }
        ]
      }
    };
  }
};
