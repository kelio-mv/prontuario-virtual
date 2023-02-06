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
        "AC",
        "AL",
        "AP",
        "AM",
        "BA",
        "CE",
        "DF",
        "ES",
        "GO",
        "MA",
        "MT",
        "MS",
        "MG",
        "PA",
        "PB",
        "PR",
        "PE",
        "PI",
        "RJ",
        "RN",
        "RS",
        "RO",
        "RR",
        "SC",
        "SP",
        "SE",
        "TO",
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
