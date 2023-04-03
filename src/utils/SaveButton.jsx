import { useContext } from "react";
import { ConnectionStateCtx } from "../MainPage";
import InputBox from "./InputBox";

export default function SaveButton(props) {
  // In this function the "no-connection" image needs to be preloaded, since it would only be
  // loaded when the connection is lost.
  const online = useContext(ConnectionStateCtx);
  new Image().src = "no-connection.png";

  return (
    <InputBox onClick={props.onClick} disabled={props.disabled || props.saving || !online}>
      {props.saving && <div className="loader" />}
      {!online && <img src="no-connection.png" />}
      Salvar
    </InputBox>
  );
}
