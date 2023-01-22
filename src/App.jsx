import "./App.css";

export default function App() {
  const patients = [
    { name: "Késsia Laíse Alves Minervino" },
    { name: "Kélio Josué Alves Minervino" },
    { name: "Carlos Vinicius Alves Minervino" },
    { name: "Carlos Vinicius Alves Minervino" },
  ];

  return (
    <>
      <header id="header">
        <img src="profile-picture.png" alt="profile picture" />
      </header>

      <div id="inputs-container">
        <div className="item">
          <div className="input-container name-filter">
            <img src="search.png" alt="search patient" />
            <input type="text" placeholder="Pesquisar..." />
          </div>
        </div>
        <div className="item">
          <div className="input-container add-patient">
            <img src="add-patient.png" alt="add patient" />
            <p>Novo Paciente</p>
          </div>
        </div>
        <div className="item">
          <div className="input-container import-export">
            <div>Importar</div>
            <div>Exportar</div>
          </div>
        </div>
      </div>

      <main id="main">
        {patients.map((patient) => (
          <div className="row">
            <img src="patient-picture.png" alt="patient picture" />
            <p className="name">{patient.name}</p>
            <div className="grow"></div>
            <div className="input-container">Anamnese</div>
            <div className="input-container">Evolução</div>
          </div>
        ))}
      </main>
    </>
  );
}
