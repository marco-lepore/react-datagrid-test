import React, { Component } from "react";
import styled from "styled-components";
import TanStackExample from "./examples/TanStack.jsx";
import MUIXDataGridExample from "./examples/MUIXDataGrid.jsx";

const AppContainer = styled.div`
  min-height: 100vh;
  height: 100vh;
  width: 100%;
  padding: 20px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f5f5f5;
`;

const GridSelector = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  color: #666;
  margin-bottom: 40px;
  font-size: 16px;
`;

const GridList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
`;

const GridButton = styled.button`
  padding: 20px;
  border: 2px solid #ddd;
  border-radius: 8px;
  background: white;
  color: #333;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 16px;
  font-weight: 500;

  &:hover:not(:disabled) {
    border-color: #007bff;
    background-color: #f8f9fa;
    color: #333;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 123, 255, 0.15);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background-color: #f8f8f8;
    color: #666;
  }
`;

const ComingSoon = styled.span`
  display: block;
  font-size: 12px;
  color: #888;
  margin-top: 5px;
`;

const GridContainer = styled.div`
  max-width: 1200px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const GridHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 20px 0;
  border-bottom: 2px solid #eee;
`;

const BackButton = styled.button`
  padding: 10px 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  color: #333;
  cursor: pointer;
  margin-right: 20px;
  font-size: 14px;

  &:hover {
    background-color: #f8f9fa;
    border-color: #007bff;
    color: #333;
  }
`;

const GridTitle = styled.h2`
  color: #333;
  margin: 0;
`;

const ErrorContainer = styled.div`
  text-align: center;
  padding: 40px;
  background: white;
  border-radius: 8px;
  border: 2px solid #dc3545;
  margin: 20px auto;
  max-width: 500px;
`;

const ErrorTitle = styled.h2`
  color: #dc3545;
  margin-bottom: 10px;
`;

const ErrorMessage = styled.p`
  color: #666;
  margin-bottom: 20px;
`;

class App extends Component {
  constructor(props) {
    super(props);

    const urlHash = window.location.hash.substring(1);

    this.state = {
      selectedGrid: urlHash || null,
    };

    this.handleHashChange = this.handleHashChange.bind(this);
  }

  componentDidMount() {
    window.addEventListener("hashchange", this.handleHashChange);
  }

  componentWillUnmount() {
    window.removeEventListener("hashchange", this.handleHashChange);
  }

  handleHashChange = () => {
    const urlHash = window.location.hash.substring(1);
    this.setState({ selectedGrid: urlHash || null });
  };

  selectGrid = (gridName) => {
    window.location.hash = gridName;
    this.setState({ selectedGrid: gridName });
  };

  goBack = () => {
    window.location.hash = "";
    this.setState({ selectedGrid: null });
  };

  renderGridSelector = () => {
    const grids = [
      { name: "TanStack", label: "TanStack Table", available: true },
      { name: "AGGrid", label: "AG Grid", available: false },
      { name: "MUIXDataGrid", label: "MUI X DataGrid", available: true },
      { name: "DevExtreme", label: "DevExtreme DataGrid", available: false },
      { name: "GridJs", label: "Grid.js", available: false },
      { name: "Adazzle", label: "Adazzle React Data Grid", available: false },
    ];

    return (
      <GridSelector>
        <Title>DataGrid Libraries Comparison</Title>
        <Subtitle>Seleziona una libreria per testare le funzionalità:</Subtitle>
        <GridList>
          {grids.map((grid) => (
            <GridButton
              key={grid.name}
              onClick={() => this.selectGrid(grid.name)}
              disabled={!grid.available}
            >
              {grid.label}
              {!grid.available && <ComingSoon>(Non Implementato)</ComingSoon>}
            </GridButton>
          ))}
        </GridList>
      </GridSelector>
    );
  };

  renderSelectedGrid = () => {
    const { selectedGrid } = this.state;

    let GridExample = null;

    // Carica l'esempio della griglia selezionata
    if (selectedGrid === "TanStack") {
      GridExample = TanStackExample;
    } else if (selectedGrid === "MUIXDataGrid") {
      GridExample = MUIXDataGridExample;
    }

    if (!GridExample) {
      return (
        <ErrorContainer>
          <ErrorTitle>Errore</ErrorTitle>
          <ErrorMessage>
            Impossibile caricare l'esempio per {selectedGrid}
          </ErrorMessage>
          <BackButton onClick={this.goBack}>← Torna alla selezione</BackButton>
        </ErrorContainer>
      );
    }

    return (
      <GridContainer>
        <GridHeader>
          <BackButton onClick={this.goBack}>← Torna alla selezione</BackButton>
          <GridTitle>{selectedGrid} DataGrid Test</GridTitle>
        </GridHeader>
        <GridExample />
      </GridContainer>
    );
  };

  render() {
    const { selectedGrid } = this.state;

    return (
      <AppContainer>
        {selectedGrid ? this.renderSelectedGrid() : this.renderGridSelector()}
      </AppContainer>
    );
  }
}

export default App;
