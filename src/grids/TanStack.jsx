import React, { Component, useMemo } from "react";
import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronUp, ChevronDown } from "lucide-react";
import {
  GridGlobalStyles,
  TableContainer,
  TableWrapper,
  Table,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableCell,
  SortIndicator,
  GridContainer,
  GridContent,
  LoadingContainer,
  RowClickable,
} from "./common/StyledComponents.jsx";
import PaginationFooter from "./common/PaginationFooter.jsx";

const convertGridSetupToDatagridColumns = (gridSetup) => {
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

      // Colonna nel formato richeisto da TanStack Table
      const columnConfig = {
        id: column.name,
        accessorKey: column.name,
        header: () => column.title,
        enableSorting: extension.sortingEnabled !== false,
        size: extension.width,
        meta: {
          align: extension.align || "left",
        },
      };

      if (formatter) {
        columnConfig.cell = ({ row }) => formatter.component(row.original);
      } else {
        columnConfig.cell = ({ row }) => row.original[column.name] || "";
      }

      return columnConfig;
    });
};

const TanStackTable = (props) => {
  const {
    data,
    sorting,
    gridSetup,
    loading = false,
    onRowClick,
    currentPage,
    totalPages,
    totalRecords,
    pageSize,
    onPageChange,
    onSortingChange,
  } = props;

  const columns = useMemo(
    () => convertGridSetupToDatagridColumns(gridSetup),
    [gridSetup]
  );

  // Configurazione tabella, qui si possono definire vari comportamenti e callback, ad esempio quali sono le colonne bloccate
  // o che funzione chiamare al cambio di ordinamento.
  const table = useReactTable({
    data,
    columns: columns,
    state: {
      sorting,
      columnPinning: { left: gridSetup.leftColumns ?? [], right: [] },
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: (updater) => {
      const newSorting =
        typeof updater === "function" ? updater(sorting) : updater;
      if (onSortingChange) {
        onSortingChange(newSorting);
      }
    },
    manualSorting: true,
    enableSortingRemoval: false,
    sortDescFirst: true,
  });

  const showPagination = currentPage && totalPages && onPageChange;

  if (loading && data.length === 0) {
    return (
      <>
        <GridGlobalStyles />
        <TableContainer>
          <LoadingContainer>Caricamento...</LoadingContainer>
        </TableContainer>
      </>
    );
  }

  return (
    <GridContainer>
      <GridGlobalStyles />
      <GridContent>
        <TableContainer>
          <TableWrapper>
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHeaderCell
                          key={header.id}
                          $align={header.column.columnDef?.meta?.align}
                          $width={header.getSize()}
                          $sortable={header.column.getCanSort()}
                          $pinned={header.column.getIsPinned()}
                          $pinnedPosition={header.getStart()}
                          $isLastPinned={header.column.getIsLastColumn("left")}
                          onClick={() => {
                            if (header.column.getCanSort()) {
                              header.column.toggleSorting();
                            }
                          }}
                        >
                          {header.column.columnDef.header()}
                          {header.column.getCanSort() &&
                            header.column.getIsSorted() && (
                              <SortIndicator>
                                {header.column.getIsSorted() === "asc" ? (
                                  <ChevronUp size={14} />
                                ) : (
                                  <ChevronDown size={14} />
                                )}
                              </SortIndicator>
                            )}
                        </TableHeaderCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <RowClickable
                    key={row.id}
                    onClick={() => onRowClick && onRowClick(row.original)}
                    $clickable={!!onRowClick}
                  >
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <TableCell
                          key={cell.id}
                          $align={cell.column.columnDef?.meta?.align}
                          $width={cell.column.getSize()}
                          $pinned={cell.column.getIsPinned()}
                          $pinnedPosition={cell.column.getStart()}
                          $isLastPinned={cell.column.getIsLastColumn("left")}
                        >
                          {typeof cell.column.columnDef.cell === "function"
                            ? cell.column.columnDef.cell({ row })
                            : cell.getValue?.() || ""}
                        </TableCell>
                      );
                    })}
                  </RowClickable>
                ))}
              </tbody>
            </Table>
          </TableWrapper>
        </TableContainer>
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

export default TanStackTable;
