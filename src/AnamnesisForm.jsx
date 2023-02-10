import TextArea from "./utils/TextArea";
import Select from "./utils/Select";
import allOptions from "./options";

export default function AnamnesisForm(props) {
  const options = allOptions.anamnese;

  return (
    <div id="anamnesis-form">
      {/* Identificação */}
      <section>
        <h2>Identificação</h2>
        <TextArea
          label="Queixa Principal"
          value={props.atendimento.queixaPrincipal}
          onChange={(value) =>
            props.onChange({ atendimento: { ...props.atendimento, queixaPrincipal: value } })
          }
        />
        <TextArea
          label="Sintomas"
          value={props.atendimento.sintomas}
          onChange={(value) =>
            props.onChange({ atendimento: { ...props.atendimento, sintomas: value } })
          }
        />
      </section>

      {/* Histórico da Doença */}
      <section>
        <h2>Histórico da Doença </h2>
        <TextArea
          label="Início"
          value={props.historicoDoenca.inicio}
          onChange={(value) =>
            props.onChange({ historicoDoenca: { ...props.historicoDoenca, inicio: value } })
          }
        />
        <TextArea
          label="Frequência"
          value={props.historicoDoenca.frequencia}
          onChange={(value) =>
            props.onChange({ historicoDoenca: { ...props.historicoDoenca, frequencia: value } })
          }
        />
        <TextArea
          label="Intensidade"
          value={props.historicoDoenca.intensidade}
          onChange={(value) =>
            props.onChange({ historicoDoenca: { ...props.historicoDoenca, intensidade: value } })
          }
        />
        <TextArea
          label="Tratamentos anteriores"
          value={props.historicoDoenca.tratamentosAnteriores}
          onChange={(value) =>
            props.onChange({
              historicoDoenca: { ...props.historicoDoenca, tratamentosAnteriores: value },
            })
          }
        />
        <TextArea
          label="Medicamentos"
          value={props.historicoDoenca.medicamentos}
          onChange={(value) =>
            props.onChange({
              historicoDoenca: { ...props.historicoDoenca, medicamentos: value },
            })
          }
        />
      </section>

      {/* Histórico Pessoal */}
      <section>
        <h2>Histórico Pessoal</h2>
        <TextArea
          label="Infância"
          value={props.historicoPessoal.infancia}
          onChange={(value) =>
            props.onChange({
              historicoPessoal: { ...props.historicoPessoal, infancia: value },
            })
          }
        />
        <TextArea
          label="Rotina"
          value={props.historicoPessoal.rotina}
          onChange={(value) =>
            props.onChange({
              historicoPessoal: { ...props.historicoPessoal, rotina: value },
            })
          }
        />
        <TextArea
          label="Vícios"
          value={props.historicoPessoal.vicios}
          onChange={(value) =>
            props.onChange({
              historicoPessoal: { ...props.historicoPessoal, vicios: value },
            })
          }
        />
        <TextArea
          label="Hobbies"
          value={props.historicoPessoal.hobbies}
          onChange={(value) =>
            props.onChange({
              historicoPessoal: { ...props.historicoPessoal, hobbies: value },
            })
          }
        />
        <TextArea
          label="Trabalho"
          value={props.historicoPessoal.trabalho}
          onChange={(value) =>
            props.onChange({
              historicoPessoal: { ...props.historicoPessoal, trabalho: value },
            })
          }
        />
        <TextArea
          label="História Patológica Pregressa"
          value={props.historicoPessoal.hpp}
          onChange={(value) =>
            props.onChange({
              historicoPessoal: { ...props.historicoPessoal, hpp: value },
            })
          }
        />
      </section>

      {/* Histórico Familiar */}
      <section>
        <h2>Histórico Familiar</h2>
        <TextArea
          label="Pais"
          value={props.historicoFamiliar.pais}
          onChange={(value) =>
            props.onChange({
              historicoFamiliar: { ...props.historicoFamiliar, pais: value },
            })
          }
        />
        <TextArea
          label="Irmãos"
          value={props.historicoFamiliar.irmaos}
          onChange={(value) =>
            props.onChange({
              historicoFamiliar: { ...props.historicoFamiliar, irmaos: value },
            })
          }
        />
        <TextArea
          label="Cônjuge"
          value={props.historicoFamiliar.conjuge}
          onChange={(value) =>
            props.onChange({
              historicoFamiliar: { ...props.historicoFamiliar, conjuge: value },
            })
          }
        />
        <TextArea
          label="Filhos"
          value={props.historicoFamiliar.filhos}
          onChange={(value) =>
            props.onChange({
              historicoFamiliar: { ...props.historicoFamiliar, filhos: value },
            })
          }
        />
        <TextArea
          label="História Patológica Pregressa"
          value={props.historicoFamiliar.hpp}
          onChange={(value) =>
            props.onChange({
              historicoFamiliar: { ...props.historicoFamiliar, hpp: value },
            })
          }
        />
      </section>

      <section>
        <h2>Exame Psíquico</h2>
        <TextArea
          label="Aparência"
          value={props.examePsiquico.aparencia}
          onChange={(value) =>
            props.onChange({
              examePsiquico: { ...props.examePsiquico, aparencia: value },
            })
          }
        />
        <TextArea
          label="Comportamento"
          value={props.examePsiquico.comportamento}
          onChange={(value) =>
            props.onChange({
              examePsiquico: { ...props.examePsiquico, comportamento: value },
            })
          }
        />
        <Select
          label="Atitude"
          multipleSelection={false}
          options={options.examePsiquico.atitude}
          selected={props.examePsiquico.atitude}
          onChange={(selected) =>
            props.onChange({ examePsiquico: { ...props.examePsiquico, atitude: selected } })
          }
        />
        <TextArea
          label="Memória"
          value={props.examePsiquico.memoria}
          onChange={(value) =>
            props.onChange({
              examePsiquico: { ...props.examePsiquico, memoria: value },
            })
          }
        />
        <TextArea
          label="Inteligência"
          value={props.examePsiquico.inteligencia}
          onChange={(value) =>
            props.onChange({
              examePsiquico: { ...props.examePsiquico, inteligencia: value },
            })
          }
        />
        <Select
          label="Sensopercepção"
          multipleSelection={false}
          options={options.examePsiquico.sensopercepcao}
          selected={props.examePsiquico.sensopercepcao}
          onChange={(selected) =>
            props.onChange({ examePsiquico: { ...props.examePsiquico, sensopercepcao: selected } })
          }
        />
        <Select
          label="Pensamento"
          multipleSelection={true}
          options={options.examePsiquico.pensamento}
          selected={props.examePsiquico.pensamento}
          onChange={(selected) =>
            props.onChange({ examePsiquico: { ...props.examePsiquico, pensamento: selected } })
          }
          noBorder
        />
        <Select
          label="Conteúdo"
          multipleSelection={true}
          options={options.examePsiquico.conteudoPensamento}
          selected={props.examePsiquico.conteudoPensamento}
          onChange={(selected) =>
            props.onChange({
              examePsiquico: { ...props.examePsiquico, conteudoPensamento: selected },
            })
          }
          noBorder={props.examePsiquico.conteudoPensamento.includes("Outros")}
        />
        {props.examePsiquico.conteudoPensamento.includes("Outros") && (
          <TextArea
            value={props.examePsiquico.conteudoPensamentoOutros}
            onChange={(value) => {
              props.onChange({
                examePsiquico: { ...props.examePsiquico, conteudoPensamentoOutros: value },
              });
            }}
          />
        )}
        <TextArea
          label="Afetividade"
          value={props.examePsiquico.afetividade}
          onChange={(value) =>
            props.onChange({
              examePsiquico: { ...props.examePsiquico, afetividade: value },
            })
          }
        />
        <Select
          label="Humor"
          multipleSelection={true}
          options={options.examePsiquico.humor}
          selected={props.examePsiquico.humor}
          onChange={(selected) =>
            props.onChange({ examePsiquico: { ...props.examePsiquico, humor: selected } })
          }
          noBorder={props.examePsiquico.humor.includes("Outros")}
        />
        {props.examePsiquico.humor.includes("Outros") && (
          <TextArea
            value={props.examePsiquico.humorOutros}
            onChange={(value) => {
              props.onChange({
                examePsiquico: { ...props.examePsiquico, humorOutros: value },
              });
            }}
          />
        )}
        <Select
          label="Consciência da Doença"
          multipleSelection={false}
          options={options.examePsiquico.conscienciaDoenca}
          selected={props.examePsiquico.conscienciaDoenca}
          onChange={(selected) =>
            props.onChange({
              examePsiquico: { ...props.examePsiquico, conscienciaDoenca: selected },
            })
          }
        />
      </section>

      <section>
        <h2>Hipótese Diagnóstica</h2>
        <TextArea
          value={props.hipoteseDiagnostica}
          onChange={(value) => props.onChange({ hipoteseDiagnostica: value })}
        />
      </section>
    </div>
  );
}
