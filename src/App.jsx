import { useState } from "react";
import HomePage from "./HomePage";
import MainPage from "./MainPage";

export default function App() {
  const [currentPage, setCurrentPage] = useState("Home");

  return (
    <>
      {currentPage === "Home" && <HomePage onAuth={() => setCurrentPage("Main")} />}
      {currentPage === "Main" && <MainPage />}
    </>
  );
}

// Permitir alteração de foto de perfil e de cor
// Verificar comportamento após a expiração do token
// Deletar pacientes
// Adicionar opção de anexar documentos no paciente
// Tornar pago (R$ 20 / mes)

// Tornar cidade um DropdownSelect (opcional)
// Requisitos:
// - Caixa de pesquisa nativa opcional para filtragem (tanto em cidade como estado)
// - Pesquisa lowercase sem acentos
// - Desabilitar caixa de cidade até que o estado seja selecionado
// - Ao trocar estado, redefinir a caixa cidade
