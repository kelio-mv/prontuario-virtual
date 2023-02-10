import TextArea from "./utils/TextArea";

export default function SessionLogForm(props) {
  // The class usage is due to the multiple forms displayed in the Medical Record
  return (
    <div className="session-log-form">
      <input
        type="date"
        value={props.data}
        onChange={(e) => props.onChange({ data: e.target.value })}
      />
      <TextArea
        label="Temas Abordados"
        value={props.temasAbordados}
        onChange={(value) => props.onChange({ temasAbordados: value })}
      />
      <TextArea
        label="Técnicas e Intervenções utilizadas"
        value={props.tecnicasUtilizadas}
        onChange={(value) => props.onChange({ tecnicasUtilizadas: value })}
      />
      <TextArea
        label="Planejamento para a Próxima Sessão"
        value={props.planejamentoProximaSessao}
        onChange={(value) => props.onChange({ planejamentoProximaSessao: value })}
      />
    </div>
  );
}
