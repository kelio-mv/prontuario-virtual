import React from "react";
import InputBox from "./utils/InputBox";
import storage from "./storage";
import "./HomePage.css";

const gconfig = {
  CLIENT_ID: "868395197081-oesl4h2ukpvdfidobi31693t43ep9bvp.apps.googleusercontent.com",
  API_KEY: "AIzaSyBF_34fpjsU-arA1GZ_umk2aYqVH4R1goQ",
  DISCOVERY_DOC: "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
  SCOPES: "https://www.googleapis.com/auth/drive.appdata",
  tokenClient: null,
};

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gapiInited: false,
      gisInited: false,
    };
  }

  componentDidMount() {
    this.loadScript("https://apis.google.com/js/api.js", this.gapiLoaded);
    this.loadScript("https://accounts.google.com/gsi/client", this.gisLoaded);
  }

  loadScript(src, callback) {
    const script = document.createElement("script");
    script.onload = callback;
    script.src = src;
    document.body.appendChild(script);
    // script.async = true;
    // script.defer = true;
  }

  gapiLoaded = () => {
    gapi.load("client", this.initializeGapiClient);
  };

  gisLoaded = () => {
    gconfig.tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: gconfig.CLIENT_ID,
      scope: gconfig.SCOPES,
      callback: "",
    });
    this.setState({ gisInited: true });
  };

  initializeGapiClient = async () => {
    await gapi.client.init({
      apiKey: gconfig.API_KEY,
      discoveryDocs: [gconfig.DISCOVERY_DOC],
    });
    this.setState({ gapiInited: true });
  };

  handleAuthClick = () => {
    gconfig.tokenClient.callback = async (resp) => {
      if (resp.error !== undefined) {
        throw resp;
      }
      // Init storage, set bg-secondary color and go to the MainPage
      await storage.init();
      document.documentElement.style.setProperty("--bg-secondary", storage.data.profileColor);
      this.props.onAuth();
    };
    // Prompt the user to select a Google account, if there are multiple accounts saved or
    // if the user has not granted the necessary permissions yet.
    // Request the necessary permissions from the user, if they have not granted them yet
    gconfig.tokenClient.requestAccessToken({ prompt: "" });
  };

  render() {
    return (
      <div id="home-page">
        <img className="app-logo" src="favicon.png" />
        <h1>Prontuário Virtual</h1>
        {this.state.gapiInited && this.state.gisInited && (
          <InputBox className="auth-btn" onClick={this.handleAuthClick}>
            <img src="google-logo.png" />
            Entrar com o Google
          </InputBox>
        )}
      </div>
    );
  }
}

// Ao clicar em Entrar com o Google...
// Verifique se já existe um token
// Se existir, {func} verifique se ele não expirou.
// Se tiver expirado, faça o request de um novo token (usar refresh token dps?) {func}
// Se não tiver expirado, defina o token do tokenClient
// Se não existir: faça request de um novo token e salve-o, junto do seu time de expiração
// Ao fazer logout, apague o token
// Executar {func} ao fazer qualquer operação com a API

// function handleSignoutClick() {
//     const token = gapi.client.getToken();
//     if (token !== null) {
//       google.accounts.oauth2.revoke(token.access_token);
//       gapi.client.setToken("");
//       // document.getElementById("content").innerText = "";
//       // document.getElementById("authorize_button").innerText = "Authorize";
//       // document.getElementById("signout_button").style.visibility = "hidden";
//     }
//   }
