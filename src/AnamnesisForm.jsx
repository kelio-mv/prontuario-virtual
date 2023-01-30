import TextArea from "./TextArea";
import "./AnamnesisForm.css";

export default function AnamnesisForm(props) {
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
          label="Lar"
          value={props.historicoFamiliar.lar}
          onChange={(value) =>
            props.onChange({
              historicoFamiliar: { ...props.historicoFamiliar, lar: value },
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
        <p>...</p>
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
        <p>...</p>
        <TextArea
          label="Afetividade"
          value={props.examePsiquico.afetividade}
          onChange={(value) =>
            props.onChange({
              examePsiquico: { ...props.examePsiquico, afetividade: value },
            })
          }
        />
        <p>...</p>
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
