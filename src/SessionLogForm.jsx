import TextArea from "./utils/TextArea";
// Stylesheets in App.css

export default function SessionLogForm(props) {
  return (
    <>
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
    </>
  );
}
