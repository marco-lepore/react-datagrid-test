import React, { useMemo } from "react";
import { DataGridPro } from "@mui/x-data-grid-pro";
import {
  GridGlobalStyles,
  GridContainer,
  GridContent,
  LoadingContainer,
} from "./common/StyledComponents.jsx";
import PaginationFooter from "./common/PaginationFooter.jsx";

const convertGridSetupToMUIColumns = (gridSetup) => {
  const {
    columns,
    columnExtensions = [],
    formattedComponent = [],
    hiddenColumnNames = [],
  } = gridSetup;

  return columns
    .filter((col) => !hiddenColumnNames.includes(col.name))
    .map((column) => {
      const extension =
        columnExtensions.find((ext) => ext.columnName === column.name) || {};
      const formatter = formattedComponent.find((fc) =>
        fc.name.includes(column.name)
      );

      const columnConfig = {
        field: column.name,
        headerName: column.title,
        sortable: extension.sortingEnabled !== false,
        width: extension.width || 120,
        align: extension.align || "left",
        headerAlign: extension.align || "left",
      };

      if (formatter) {
        columnConfig.renderCell = (params) => formatter.component(params.row);
      }

      return columnConfig;
    });
};

const MUIXDataGridComponent = (props) => {
  const {
    data = [],
    loading = false,
    sorting = [],
    gridSetup,
    onSortingChange,
    onRowClick,
    currentPage,
    totalPages,
    totalRecords,
    pageSize,
    onPageChange,
  } = props;

  // Memorizza la configurazione delle colonne
  const columns = useMemo(() => {
    if (!gridSetup) return [];
    return convertGridSetupToMUIColumns(gridSetup);
  }, [gridSetup]);

  // Converte lo stato di ordinamento nel formato MUI
  const sortModel = useMemo(() => {
    if (!sorting || sorting.length === 0) return [];
    return sorting.map((sort) => ({
      field: sort.id,
      sort: sort.desc ? "desc" : "asc",
    }));
  }, [sorting]);

  // Ottiene le colonne bloccate
  const pinnedColumns = useMemo(() => {
    if (!gridSetup?.leftColumns) return {};
    return {
      left: gridSetup.leftColumns,
    };
  }, [gridSetup]);

  // Gestori eventi
  const handleSortModelChange = (newSortModel) => {
    console.log(newSortModel);
    if (onSortingChange) {
      const newSorting = newSortModel.map((sort) => ({
        id: sort.field,
        desc: sort.sort === "desc",
      }));
      onSortingChange(newSorting);
    }
  };

  const handleRowClick = (params) => {
    if (onRowClick) {
      onRowClick(params.row);
    }
  };

  const showPagination = currentPage && totalPages && onPageChange;

  if (loading && data.length === 0) {
    return (
      <>
        <GridGlobalStyles />
        <LoadingContainer>Caricamento...</LoadingContainer>
      </>
    );
  }

  if (!gridSetup) {
    return <div>Nessuna configurazione griglia fornita</div>;
  }

  return (
    <GridContainer>
      <GridGlobalStyles />
      <GridContent>
        <DataGridPro
          rows={data}
          columns={columns}
          loading={loading}
          sortModel={sortModel}
          sortingOrder={["desc", "asc"]}
          onSortModelChange={handleSortModelChange}
          onRowClick={handleRowClick}
          pinnedColumns={pinnedColumns}
          disableColumnMenu
          disableColumnSelector
          disableDensitySelector
          disableColumnFilter
          hideFooter
          rowHeight={48}
          sx={{
            flex: 1,
            minHeight: 0,
            border: "1px solid var(--grid-border-color)",
            borderRadius: "4px",
            fontFamily: "var(--grid-font-family)",
            /* Applica il gradient di sfondo delle righe fake come TanStack */
            "& .MuiDataGrid-main": {
              background: `repeating-linear-gradient(
                180deg,
                var(--grid-row-even) 0px,
                var(--grid-row-even) var(--grid-row-height),
                var(--grid-border-color) var(--grid-row-height),
                var(--grid-border-color) calc(var(--grid-row-height) + 0.667px),
                var(--grid-row-odd) calc(var(--grid-row-height) + 0.667px),
                var(--grid-row-odd) calc(var(--grid-row-height) * 2 + 0.667px),
                var(--grid-border-color) calc(var(--grid-row-height) * 2 + 0.667px),
                var(--grid-border-color) calc(var(--grid-row-height) * 2 + 1.334px)
              )`,
            },
            "& .MuiDataGrid-filler--pinnedLeft": {
              background: "transparent !important",
            },
            "& .MuiDataGrid-columnSeparator": {
              display: "none",
            },
            "& .MuiDataGrid-pinnedColumns": {
              boxShadow: "2px 0 4px rgba(0, 0, 0, 0.1)",
            },
            "& .MuiDataGrid-pinnedColumnsRight": {
              boxShadow: "-2px 0 4px rgba(0, 0, 0, 0.1)",
            },
            /* Corregge i colori alternati delle righe*/
            "& .MuiDataGrid-row:nth-of-type(even)": {
              backgroundColor: "var(--grid-row-even) !important",
            },
            "& .MuiDataGrid-row:nth-of-type(odd)": {
              backgroundColor: "var(--grid-row-odd) !important",
            },
            /* Corregge i colori alternati per le colonne bloccate */
            "& .MuiDataGrid-row:nth-of-type(even) .MuiDataGrid-cell--pinnedLeft":
              {
                backgroundColor: "var(--grid-row-even)",
              },
            "& .MuiDataGrid-row:nth-of-type(odd) .MuiDataGrid-cell--pinnedLeft":
              {
                backgroundColor: "var(--grid-row-odd)",
              },
            "& .MuiDataGrid-row:nth-of-type(even) .MuiDataGrid-cell--pinnedRight":
              {
                backgroundColor: "var(--grid-row-even)",
              },
            "& .MuiDataGrid-row:nth-of-type(odd) .MuiDataGrid-cell--pinnedRight":
              {
                backgroundColor: "var(--grid-row-odd)",
              },
            /* Applica la tipografia dei nostri styled components a celle e header */
            "& .MuiDataGrid-columnHeader": {
              fontSize: "var(--grid-font-size-header) !important",
              fontWeight: "500 !important",
              fontFamily: "var(--grid-font-family) !important",
            },
            "& .MuiDataGrid-cell": {
              fontSize: "var(--grid-font-size-cell) !important",
              fontFamily: "var(--grid-font-family) !important",
              padding: "0 var(--grid-padding) !important",
            },
            /* Centratura verticale specifica solo per elementi interattivi */
            "& .MuiDataGrid-cell:has(button), & .MuiDataGrid-cell:has(input[type='checkbox']), & .MuiDataGrid-cell:has(svg)":
              {
                display: "flex",
                alignItems: "center",
                "&.MuiDataGrid-cell--text-right": {
                  justifyContent: "flex-end",
                },
                "&.MuiDataGrid-cell--text-left": {
                  justifyContent: "flex-start",
                },

                "&.MuiDataGrid-cell--text-center": {
                  justifyContent: "center",
                },
              },
            /* Evita che i componenti custom prendano tutta l'altezza della cella */
            "& .MuiDataGrid-cell > * > *": {
              maxHeight: "none",
              height: "auto",
            },
          }}
        />
      </GridContent>

      {showPagination && (
        <PaginationFooter
          currentPage={currentPage}
          totalPages={totalPages}
          totalRecords={totalRecords}
          pageSize={pageSize}
          onPageChange={onPageChange}
        />
      )}
    </GridContainer>
  );
};

export default MUIXDataGridComponent;
