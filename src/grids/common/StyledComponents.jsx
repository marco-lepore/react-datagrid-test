import styled, { createGlobalStyle } from "styled-components";

// CSS variabili globali per consistency tra tutti i datagrid
export const GridGlobalStyles = createGlobalStyle`
  :root {
    --grid-row-height: 48px;
    --grid-border-color: #e5e5e5;
    --grid-header-bg: #fafafa;
    --grid-row-even: #ffffff;
    --grid-row-odd: #f8f8f8;
    --grid-text-color: #333333;
    --grid-text-secondary: #666666;
    --grid-font-size-cell: 13px;
    --grid-font-size-header: 12px;
    --grid-padding: 12px;
    --grid-font-family: 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif;
  }
`;

export const TableContainer = styled.div`
  background: repeating-linear-gradient(
    180deg,
    var(--grid-row-even) 0px,
    var(--grid-row-even) var(--grid-row-height),
    var(--grid-border-color) var(--grid-row-height),
    var(--grid-border-color) calc(var(--grid-row-height) + 0.667px),
    var(--grid-row-odd) calc(var(--grid-row-height) + 0.667px),
    var(--grid-row-odd) calc(var(--grid-row-height) * 2 + 0.667px),
    var(--grid-border-color) calc(var(--grid-row-height) * 2 + 0.667px),
    var(--grid-border-color) calc(var(--grid-row-height) * 2 + 1.334px)
  );
  border: 1px solid var(--grid-border-color);
  border-radius: 4px;
  font-family: var(--grid-font-family);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const TableWrapper = styled.div`
  flex: 1;
  overflow: auto;
  position: relative;
`;

export const Table = styled.table`
  width: ${(props) => props.$width || "100%"};
  border-collapse: separate;
  border-spacing: 0;
  table-layout: fixed;
  min-width: ${(props) => props.$width || "max-content"};
`;

export const TableHeader = styled.thead`
  background-color: var(--grid-header-bg);
  position: sticky;
  top: 0;
  z-index: 20;
`;

export const TableRow = styled.tr`
  height: var(--grid-row-height);
  border-bottom: 1px solid var(--grid-border-color);

  &:nth-child(even) {
    background-color: var(--grid-row-even);
  }

  &:nth-child(odd) {
    background-color: var(--grid-row-odd);
  }

  &:hover {
    background-color: #f0f8ff;
  }
`;

export const TableHeaderCell = styled.th`
  padding: 0 var(--grid-padding);
  font-size: var(--grid-font-size-header);
  font-weight: 500;
  color: var(--grid-text-color);
  font-family: var(--grid-font-family);
  text-align: ${(props) => props.$align || "left"};
  cursor: ${(props) => (props.$sortable ? "pointer" : "default")};
  user-select: none;
  white-space: nowrap;
  width: ${(props) => (props.$width ? `${props.$width}px` : "120px")};
  min-width: ${(props) => (props.$width ? `${props.$width}px` : "120px")};
  position: ${(props) => (props.$pinned ? "sticky" : "static")};
  left: ${(props) =>
    props.$pinnedPosition !== undefined
      ? `${props.$pinnedPosition}px`
      : "auto"};
  background-color: var(--grid-header-bg);
  z-index: ${(props) => (props.$pinned ? 30 : 20)};
  border-right: ${(props) =>
    props.$isLastPinned ? "1px solid var(--grid-border-color)" : "none"};
  border-bottom: 1px solid var(--grid-border-color);

  &:hover {
    background-color: ${(props) =>
      props.$sortable ? "#f0f0f0" : "var(--grid-header-bg)"};
  }
`;

export const TableCell = styled.td`
  padding: 0 var(--grid-padding);
  font-size: var(--grid-font-size-cell);
  color: var(--grid-text-color);
  font-family: var(--grid-font-family);
  text-align: ${(props) => props.$align || "left"};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: ${(props) => (props.$width ? `${props.$width}px` : "120px")};
  min-width: ${(props) => (props.$width ? `${props.$width}px` : "120px")};
  position: ${(props) => (props.$pinned ? "sticky" : "static")};
  left: ${(props) =>
    props.$pinnedPosition !== undefined
      ? `${props.$pinnedPosition}px`
      : "auto"};
  background-color: inherit;
  z-index: ${(props) => (props.$pinned ? 10 : 1)};
  border-right: ${(props) =>
    props.$isLastPinned ? "1px solid var(--grid-border-color)" : "none"};
  border-bottom: 1px solid var(--grid-border-color);
`;

export const SortIndicator = styled.span`
  margin-left: 8px;
  opacity: 0.7;
`;

export const FakeRowsBackground = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const GridContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const GridContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
`;

export const LoadingContainer = styled.div`
  padding: 40px;
  text-align: center;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const RowClickable = styled(TableRow)`
  cursor: ${(props) => (props.$clickable ? "pointer" : "default")};
`;

export const ExampleContainer = styled.div`
  height: calc(100vh - 124px);
  display: flex;
  flex-direction: column;
`;

export const InfoPanel = styled.div`
  margin-bottom: 20px;
  padding: 16px;
  background: white;
  color: black;
  border-radius: 4px;
  flex-shrink: 0;
`;

export const GridWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
`;
