import { useContext } from "react";
import { ConnectionStateCtx } from "../MainPage";
import InputBox from "./InputBox";

export default function SaveButton(props) {
  const online = useContext(ConnectionStateCtx);

  return (
    <InputBox onClick={props.onClick} disabled={props.disabled || props.saving || !online}>
      {props.saving && <div className="loader" />}
      {!online && <img src="no-connection.png" />}
      Salvar
    </InputBox>
  );
}
