// Simulazione API per test datagrid con supporto pagination, sorting e filtering

const mockData = [
  {
    id: 25983235,
    numero: "36f-2022",
    data: "07/12/2022",
    mittenteDataScadenza: "07/12/2022",
    destinatario: "test ventidue",
    oggetto: "Ordine 1345 Shop on-line",
    idStatoSdi: -1,
    stsAttivo: 1,
    totale: 366.1,
    pe_pagato: 200.0,
    mailed: 1,
  },
  {
    id: 25983236,
    numero: "35f-2022",
    data: "07/12/2022",
    mittenteDataScadenza: "07/12/2022",
    destinatario: "test ventuno",
    oggetto: "Ordine 1338 Shop on-line",
    idStatoSdi: -1,
    stsAttivo: 1,
    totale: 301.84,
    pe_pagato: 0,
    mailed: 0,
  },
  {
    id: 25983237,
    numero: "34f-2022",
    data: "07/12/2022",
    mittenteDataScadenza: "07/12/2022",
    destinatario: "test venti",
    oggetto: "Ordine 1335 Shop on-line",
    idStatoSdi: -1,
    stsAttivo: 1,
    totale: 451.9,
    pe_pagato: 451.9,
    mailed: 1,
  },
  {
    id: 25983238,
    numero: "33f-2022",
    data: "07/12/2022",
    mittenteDataScadenza: "07/12/2022",
    destinatario: "test diciannove",
    oggetto: "Ordine 1333 Shop on-line",
    idStatoSdi: -1,
    stsAttivo: 1,
    totale: 132.63,
    pe_pagato: 0,
    mailed: 0,
  },
  {
    id: 25983239,
    numero: "32f-2022",
    data: "07/12/2022",
    mittenteDataScadenza: "07/12/2022",
    destinatario: "test diciotto",
    oggetto: "Ordine 1332 Shop on-line",
    idStatoSdi: -1,
    stsAttivo: 1,
    totale: 176.1,
    pe_pagato: 50.0,
    mailed: 1,
  },
  {
    id: 25983240,
    numero: "31f-2022",
    data: "07/12/2022",
    mittenteDataScadenza: "07/12/2022",
    destinatario: "test diciassette",
    oggetto: "Ordine 1331 Shop on-line",
    idStatoSdi: -1,
    stsAttivo: 1,
    totale: 417.1,
    pe_pagato: 0,
    mailed: 0,
  },
  {
    id: 25983241,
    numero: "30f-2022",
    data: "07/12/2022",
    mittenteDataScadenza: "07/12/2022",
    destinatario: "test sedici",
    oggetto: "Ordine 1330 Shop on-line",
    idStatoSdi: -1,
    stsAttivo: 1,
    totale: 395.8,
    pe_pagato: 0,
    mailed: 1,
  },
  {
    id: 25983242,
    numero: "29f-2022",
    data: "07/12/2022",
    mittenteDataScadenza: "07/12/2022",
    destinatario: "test quindici",
    oggetto: "Ordine 1329 Shop on-line",
    idStatoSdi: -1,
    stsAttivo: 1,
    totale: 266.1,
    pe_pagato: 0,
    mailed: 0,
  },
  {
    id: 25983243,
    numero: "28f-2022",
    data: "07/12/2022",
    mittenteDataScadenza: "07/12/2022",
    destinatario: "test quattordici",
    oggetto: "Ordine 1327 Shop on-line",
    idStatoSdi: -1,
    stsAttivo: 1,
    totale: 536.0,
    pe_pagato: 0,
    mailed: 1,
  },
  {
    id: 25983244,
    numero: "27f-2022",
    data: "07/12/2022",
    mittenteDataScadenza: "07/12/2022",
    destinatario: "test tredici",
    oggetto: "Ordine 1326 Shop on-line",
    idStatoSdi: -1,
    stsAttivo: 1,
    totale: 160.0,
    pe_pagato: 0,
    mailed: 0,
  },
  {
    id: 25983245,
    numero: "26f-2022",
    data: "07/12/2022",
    mittenteDataScadenza: "07/12/2022",
    destinatario: "test dodici",
    oggetto: "Ordine 1325 Shop on-line",
    idStatoSdi: -1,
    stsAttivo: 1,
    totale: 176.1,
    pe_pagato: 0,
    mailed: 1,
  },
  {
    id: 25983246,
    numero: "25f-2022",
    data: "06/12/2022",
    mittenteDataScadenza: "06/12/2022",
    destinatario: "test undici",
    oggetto: "Ordine 1324 Shop on-line",
    idStatoSdi: 1,
    stsAttivo: 0,
    totale: 289.5,
    pe_pagato: 289.5,
    mailed: 1,
  },
  {
    id: 25983247,
    numero: "24f-2022",
    data: "06/12/2022",
    mittenteDataScadenza: "06/12/2022",
    destinatario: "test dieci",
    oggetto: "Ordine 1323 Shop on-line",
    idStatoSdi: 1,
    stsAttivo: 0,
    totale: 445.2,
    pe_pagato: 445.2,
    mailed: 1,
  },
  {
    id: 25983248,
    numero: "23f-2022",
    data: "05/12/2022",
    mittenteDataScadenza: "05/12/2022",
    destinatario: "test nove",
    oggetto: "Ordine 1322 Shop on-line",
    idStatoSdi: -2,
    stsAttivo: 0,
    totale: 567.8,
    pe_pagato: 0,
    mailed: 0,
  },
  {
    id: 25983249,
    numero: "22f-2022",
    data: "05/12/2022",
    mittenteDataScadenza: "05/12/2022",
    destinatario: "test otto",
    oggetto: "Ordine 1321 Shop on-line",
    idStatoSdi: -1,
    stsAttivo: 1,
    totale: 123.45,
    pe_pagato: 0,
    mailed: 1,
  },
];

// Genera altri dati per test pagination
for (let i = 16; i <= 93; i++) {
  mockData.push({
    id: 25983235 + i,
    numero: `${i}f-2022`,
    data: "05/12/2022",
    mittenteDataScadenza: "05/12/2022",
    destinatario: `test cliente ${i}`,
    oggetto: `Ordine 13${i} Shop on-line`,
    idStatoSdi: i % 3 === 0 ? 1 : i % 7 === 0 ? -2 : -1,
    stsAttivo: i % 3 !== 0 ? 1 : 0,
    totale: Math.round((Math.random() * 1000 + 100) * 100) / 100,
    pe_pagato:
      i % 3 === 0 ? Math.round((Math.random() * 1000 + 100) * 100) / 100 : 0,
    mailed: i % 4 === 0 ? 1 : 0,
  });
}

export const fetchGridData = async (params = {}) => {
  const {
    pagina = 1,
    numeroRigheXPagina = 30,
    ordinamentoNomeColonna = null,
    ordinamentoSortType = "asc",
    filtraPer = null,
    valoreFiltraPer = null,
  } = params;

  // Simula delay API
  await new Promise((resolve) => setTimeout(resolve, 300));

  let filteredData = [...mockData];

  // Applica filtro se specificato
  if (filtraPer && valoreFiltraPer && valoreFiltraPer !== "") {
    filteredData = filteredData.filter((item) =>
      String(item[filtraPer])
        .toLowerCase()
        .includes(String(valoreFiltraPer).toLowerCase())
    );
  }

  // Applica sorting
  if (ordinamentoNomeColonna) {
    filteredData.sort((a, b) => {
      let aVal = a[ordinamentoNomeColonna];
      let bVal = b[ordinamentoNomeColonna];

      if (typeof aVal === "string") {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }

      if (ordinamentoSortType === "desc") {
        return aVal < bVal ? 1 : aVal > bVal ? -1 : 0;
      } else {
        return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
      }
    });
  }

  // Applica pagination
  const startIndex = (pagina - 1) * numeroRigheXPagina;
  const endIndex = startIndex + numeroRigheXPagina;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  return {
    docs: paginatedData,
    pagina,
    pagine: Math.ceil(filteredData.length / numeroRigheXPagina),
    numRigheXPagina: numeroRigheXPagina,
    totRecord: filteredData.length,
  };
};
