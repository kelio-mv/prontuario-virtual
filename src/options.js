const options = {
  // Cadastro
  cadastro: {
    genero: ["Masculino", "Feminino"],
    escolaridade: [
      "Ensino Fundamental incompleto",
      "Ensino Fundamental",
      "Ensino Médio",
      "Ensino Superior",
      "Pós-graduação",
      "Mestrado",
      "Doutorado",
      "Pós-doutorado",
    ],
    estadoCivil: ["Solteiro", "Casado", "Separado", "Divorciado", "Viúvo"],
    endereco: {
      estado: [
        "Acre",
        "Alagoas",
        "Amapá",
        "Amazonas",
        "Bahia",
        "Ceará",
        "Distrito Federal",
        "Espírito Santo",
        "Goiás",
        "Maranhão",
        "Mato Grosso",
        "Mato Grosso do Sul",
        "Minas Gerais",
        "Pará",
        "Paraíba",
        "Paraná",
        "Pernambuco",
        "Piauí",
        "Rio de Janeiro",
        "Rio Grande do Norte",
        "Rio Grande do Sul",
        "Rondônia",
        "Roraima",
        "Santa Catarina",
        "São Paulo",
        "Sergipe",
        "Tocantins",
      ],
    },
  },
  // Anamnese
  anamnese: {
    examePsiquico: {
      atitude: ["Cooperativa", "Resistente", "Indiferente"],
      sensopercepcao: ["Normal", "Alucinação"],
      pensamento: ["Acelerado", "Retardado", "Fuga", "Bloqueio", "Prolixo", "Repetição"],
      conteudoPensamento: ["Obsessões", "Hipocondrias", "Fobias", "Delírios", "Outros"],
      humor: ["Normal", "Exaltado", "Baixa de humor", "Quebra súbita", "Outros"],
      conscienciaDoenca: ["Sim", "Não", "Parcial"],
    },
  },
};

export default options;
