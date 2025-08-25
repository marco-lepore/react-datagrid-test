import React, { Component } from "react";
import MUIXDataGridComponent from "../grids/MUIXDataGrid.jsx";
import { fetchGridData } from "../api/mockApi.js";
import StatusBadge from "./common/StatusBadge.jsx";
import NumberFormatter from "./common/NumberFormatter.jsx";
import StarToggle from "./common/StarToggle.jsx";
import CheckboxCell from "./common/CheckboxCell.jsx";
import { User, Mail, MoreVertical } from "lucide-react";
import {
  ExampleContainer,
  InfoPanel,
  GridWrapper,
} from "../grids/common/StyledComponents.jsx";

class MUIXDataGridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      loading: false,
      paginationData: {
        pagina: 1,
        pagine: 1,
        numRigheXPagina: 30,
        totRecord: 0,
      },
      sortingState: [],
      selectedRows: new Set(),
      filterValue: "",
    };

    // Configurazione griglia secondo il pattern gridSetup
    this.gridSetup = {
      columns: [
        { name: "checkbox", title: " " },
        { name: "star", title: " " },
        { name: "numero", title: "Numero" },
        { name: "data", title: "Data" },
        { name: "mittenteDataScadenza", title: "Scadenza" },
        { name: "destinatario", title: "Cliente" },
        { name: "oggetto", title: "Causale" },
        { name: "idStatoSdi", title: "Stato Invio Sdi" },
        { name: "stsAttivo", title: "STS" },
        { name: "totale", title: "Importo" },
        { name: "alSaldo", title: "Al Saldo" },
        { name: "mailed", title: "Inviata" },
        { name: "rowActions", title: " " },
      ],
      hiddenColumnNames: [],
      columnExtensions: [
        {
          columnName: "checkbox",
          width: 50,
          align: "center",
          sortingEnabled: false,
        },
        {
          columnName: "star",
          width: 50,
          align: "center",
          sortingEnabled: false,
        },
        {
          columnName: "numero",
          width: 120,
          align: "left",
          sortingEnabled: true,
        },
        { columnName: "data", width: 110, align: "left", sortingEnabled: true },
        {
          columnName: "mittenteDataScadenza",
          width: 110,
          align: "left",
          sortingEnabled: true,
        },
        { columnName: "destinatario", align: "left", sortingEnabled: true },
        { columnName: "oggetto", align: "left", sortingEnabled: true },
        {
          columnName: "idStatoSdi",
          width: 140,
          align: "left",
          sortingEnabled: false,
        },
        {
          columnName: "stsAttivo",
          width: 80,
          align: "center",
          sortingEnabled: false,
        },
        {
          columnName: "totale",
          width: 120,
          align: "right",
          sortingEnabled: true,
        },
        {
          columnName: "alSaldo",
          width: 120,
          align: "right",
          sortingEnabled: false,
        },
        {
          columnName: "mailed",
          width: 80,
          align: "center",
          sortingEnabled: false,
        },
        {
          columnName: "rowActions",
          width: 60,
          align: "center",
          sortingEnabled: false,
        },
      ],
      formattedComponent: [
        { name: ["checkbox"], component: this.renderCheckbox },
        { name: ["star"], component: this.renderStar },
        { name: ["idStatoSdi"], component: this.renderStatoInvio },
        { name: ["destinatario"], component: this.renderDestinatario },
        { name: ["stsAttivo"], component: this.renderSts },
        { name: ["totale"], component: this.renderImporto },
        { name: ["alSaldo"], component: this.renderAlSaldo },
        { name: ["mailed"], component: this.renderMailed },
        { name: ["rowActions"], component: this.renderRowActions },
      ],
      leftColumns: ["checkbox", "star", "numero"],
      defaultSorting: [{ columnName: "data", direction: "desc" }],
    };
  }

  componentDidMount() {
    this.loadData();

    // Applica default sorting se presente
    if (this.gridSetup.defaultSorting?.length > 0) {
      const defaultSort = this.gridSetup.defaultSorting[0];
      this.setState({
        sortingState: [
          {
            id: defaultSort.columnName,
            desc: defaultSort.direction === "desc",
          },
        ],
      });
    }
  }

  loadData = async () => {
    this.setState({ loading: true });

    try {
      const { paginationData, sortingState, filterValue } = this.state;

      // Prepara parametri API
      const params = {
        pagina: paginationData.pagina,
        numeroRigheXPagina: paginationData.numRigheXPagina,
      };

      // Aggiungi ordinamento se presente
      if (sortingState.length > 0) {
        const sort = sortingState[0];
        params.ordinamentoNomeColonna = sort.id;
        params.ordinamentoSortType = sort.desc ? "desc" : "asc";
      }

      // Aggiungi filtro se presente
      if (filterValue) {
        params.filtraPer = "destinatario";
        params.valoreFiltraPer = filterValue;
      }

      const response = await fetchGridData(params);

      // Aggiorna solo dopo che i nuovi dati sono disponibili
      this.setState({
        data: response.docs,
        loading: false,
        paginationData: {
          pagina: response.pagina,
          pagine: response.pagine,
          numRigheXPagina: response.numRigheXPagina,
          totRecord: response.totRecord,
        },
      });
    } catch (error) {
      console.error("Errore nel caricamento dati:", error);
      this.setState({ loading: false });
    }
  };

  handlePageChange = (newPage) => {
    this.setState(
      (prevState) => ({
        paginationData: {
          ...prevState.paginationData,
          pagina: newPage,
        },
      }),
      this.loadData
    );
  };

  handleSortingChange = (newSorting) => {
    this.setState({ sortingState: newSorting }, this.loadData);
  };

  handleRowClick = (row) => {
    console.log("Row clicked:", row);
  };

  // Custom renderers per le colonne
  renderCheckbox = (row) => {
    const { selectedRows } = this.state;

    return (
      <CheckboxCell
        checked={selectedRows.has(row.id)}
        onChange={(checked) => this.handleRowSelect(row.id, checked)}
      />
    );
  };

  renderStar = () => {
    return <StarToggle />;
  };

  renderStatoInvio = (row) => {
    return <StatusBadge idStatoSdi={row.idStatoSdi} />;
  };

  renderDestinatario = (row) => {
    return <span>{row.destinatario}</span>;
  };

  renderImporto = (row) => {
    return <NumberFormatter value={row.totale} />;
  };

  renderAlSaldo = (row) => {
    const alSaldo = row.totale - row.pe_pagato;

    if (alSaldo <= 0) {
      return <span style={{ color: "green", fontWeight: "500" }}>Pagata</span>;
    }

    return (
      <span style={{ color: "red", fontWeight: "500" }}>
        -<NumberFormatter value={alSaldo} />
      </span>
    );
  };

  renderSts = (row) => {
    return (
      <div style={{ textAlign: "center" }}>
        {row.stsAttivo === 1 ? <User size={16} color="#666" /> : ""}
      </div>
    );
  };

  renderMailed = (row) => {
    return (
      <div style={{ textAlign: "center" }}>
        {row.mailed === 1 ? (
          <Mail size={16} color="orange" />
        ) : (
          <Mail size={16} color="rgba(118, 149, 162, 0.4)" />
        )}
      </div>
    );
  };

  renderRowActions = (row) => {
    return (
      <div style={{ textAlign: "center" }}>
        <button
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "4px",
            borderRadius: "4px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={(e) => {
            e.stopPropagation();
            this.handleRowActions(row);
          }}
        >
          <MoreVertical size={16} color="#666" />
        </button>
      </div>
    );
  };

  // Gestori eventi
  handleSelectAll = (checked) => {
    const { data } = this.state;
    const newSelected = new Set();

    if (checked) {
      data.forEach((row) => newSelected.add(row.id));
    }

    this.setState({ selectedRows: newSelected });
  };

  handleRowSelect = (rowId, checked) => {
    const { selectedRows } = this.state;
    const newSelected = new Set(selectedRows);

    if (checked) {
      newSelected.add(rowId);
    } else {
      newSelected.delete(rowId);
    }

    this.setState({ selectedRows: newSelected });
  };

  handleRowActions = (row) => {
    console.log("Row actions clicked for:", row);
  };

  render() {
    const { data, loading, paginationData, sortingState } = this.state;

    return (
      <ExampleContainer>
        <InfoPanel>
          <h3>MUI X DataGrid Pro</h3>
          <p>
            Implementazione con MUI X DataGrid Pro usando la configurazione
            gridSetup di Fattura24. Supporta colonne bloccate, ordinamento,
            selezione e custom renderers con funzionalità enterprise.
          </p>
          <div style={{ marginTop: "12px" }}>
            <strong>Righe selezionate:</strong> {this.state.selectedRows.size} /{" "}
            {data.length}
            <br />
            <strong>Colonne bloccate:</strong>{" "}
            {this.gridSetup.leftColumns.join(", ")}
            <br />
            <strong>Ordinamento corrente:</strong>{" "}
            {sortingState.length > 0
              ? `${sortingState[0].id} ${sortingState[0].desc ? "desc" : "asc"}`
              : "nessuno"}
          </div>
        </InfoPanel>

        <GridWrapper>
          <MUIXDataGridComponent
            data={data}
            loading={loading}
            sorting={sortingState}
            onSortingChange={this.handleSortingChange}
            onRowClick={this.handleRowClick}
            gridSetup={this.gridSetup}
            currentPage={paginationData.pagina}
            totalPages={paginationData.pagine}
            totalRecords={paginationData.totRecord}
            pageSize={paginationData.numRigheXPagina}
            onPageChange={this.handlePageChange}
          />
        </GridWrapper>
      </ExampleContainer>
    );
  }
}

export default MUIXDataGridExample;
