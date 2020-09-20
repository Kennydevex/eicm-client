// jshint esversion:6

export default {
  attributes: {
    name: "Nome",
    lastname: "Apelido",
    username: "Utilizador",
    identification_card: "BI",
    nif: "NIF",
    password: "Palavra passe",
    password_confirmation: "Confirmação",
    display_name: "Rótulo",
    entity: "Entidade",
    abbr: "Abreviatura"
  },
  messages: {
    required: "Campo de preenchimento obrigatório",
    alpha: "Aceita-se apenas letras",
    alpha_spaces: "O nome não pode conter além de letras e espaços"
  },
  custom: {
    abbr: {
      alpha: () => "Abreviatura só pode ser letras"
    },

    title: {
      required: () => "É obrigatório introduzir um título numa publicação"
    },

    image: {
      image: () => "Selecione a rquivo do tipo imagem!!",
      required: () => "É obrigatório inserir uma imagem na publicação"
    },

    category: {
      required: () => "Escolha uma categoria!!"
    },

    opning: {
      before: () =>
        "Insira uma data válida. Aceita-se uma data anterior a data atual"
    },
    start: {
      before: () =>
        "Data de início de uma publicação não pode ser superior a 6 meses",
      after: () => "Data de início tem de ser depois da data atual"
    },

    start_date: {
      before: () => "Data de início tem de ser uma data anteriar a data atual",
      after: () => "Data de início tem de ser depois da data atual"
    },
    end_date: {
      before: () => "Esta data não pode ser depois da data atual",
      after: () => "Data de fim de serviço tem de depois da data de início"
    },

    birthdate: {
      before: () =>
        "Não sei a sua data de nascimento, mas, certamente que já nasceste",
      after: () => "Data exagerada",
      date_format: () => "Escolha um data válida"
    },

    end: {
      after: () => "Data de fim não pode ser menor nem igual a data de início"
    },

    //===============================================================
    name: {
      required: () => "É obrigatório introduzir um nome"
    },
    lastname: {
      required: () => "É obrigatório introduzir um apelido"
    },

    username: {
      required: () => "Insira um nome de utilizador"
    },

    password_confirmation: {
      confirmed: () => "Não coencidem"
    },

    subject: {
      required: () => "É obrigatório escolher um assunto"
    },

    otherSubject: {
      required_if: () => "Tem de especificar um assunto"
    },
    content: {
      required: () => "Nenhum comentário inserido"
    }
  }
};
