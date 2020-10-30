import React, { useState } from "react";
import axios from "axios";
import "./App.css";

import { AgGridColumn, AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

function App() {
  const [user, setUser] = useState("");
  const [repos, setRepos] = useState([]);

  async function getRepos() {
    if (user) {
      const result = await axios.get(`https://api.github.com/users/${user}/repos`);
      const repos = result.data.map(repo => ({
        nome: repo.name,
        criador: repo.owner.login,
        "data criação": repo.created_at,
        estrelas: repo.stargazers_count
      }))
      setRepos(repos)
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="containerInput">
          <input type="text" placeholder="Informe seu usuário" onChange={e => setUser(e.target.value)} />
          <div onClick={getRepos}>Buscar</div>
        </div>
        <div className="ag-theme-alpine" style={{ height: 400, width: 820 }}>
          <AgGridReact rowData={repos}>
            <AgGridColumn field="nome"></AgGridColumn>
            <AgGridColumn field="criador"></AgGridColumn>
            <AgGridColumn field="data criação"></AgGridColumn>
            <AgGridColumn field="estrelas"></AgGridColumn>
          </AgGridReact>
        </div>
      </header>
    </div >
  );
}

export default App;
