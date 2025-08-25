import React, { Component } from "react";
import styled from "styled-components";

const FooterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 8px 16px;
  background: white;
  border-top: 1px solid #e5e5e5;
  font-size: 13px;
  color: #666;
  min-height: 40px;
  flex-shrink: 0;
`;

const PageInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const PageButton = styled.button`
  width: 24px;
  height: 24px;
  border: 1px solid #ccc;
  background: ${(props) => (props.$active ? "#e9ecef" : "#f8f9fa")};
  color: #333;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  border-radius: 3px;
  font-size: 12px;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  margin: 0 1px;

  &:hover:not(:disabled) {
    background: ${(props) => (props.$active ? "#dee2e6" : "#e9ecef")};
    border-color: #aaa;
  }
`;

const PageInput = styled.input`
  width: 40px;
  height: 24px;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 2px;
  font-size: 12px;
  padding: 0;
`;

class PaginationFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputPage: props.currentPage || 1,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentPage !== this.props.currentPage) {
      this.setState({ inputPage: this.props.currentPage || 1 });
    }
  }

  handlePageInputChange = (e) => {
    this.setState({ inputPage: e.target.value });
  };

  handlePageInputKeyPress = (e) => {
    if (e.key === "Enter") {
      const page = parseInt(this.state.inputPage);
      if (page >= 1 && page <= this.props.totalPages) {
        this.props.onPageChange(page);
      } else {
        this.setState({ inputPage: this.props.currentPage });
      }
    }
  };

  render() {
    const { currentPage = 1, totalPages = 1, onPageChange } = this.props;

    return (
      <FooterContainer>
        <PageInfo>
          <span style={{ marginRight: "8px", fontSize: "12px" }}>pagina</span>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNum) => (
              <PageButton
                key={pageNum}
                $active={currentPage === pageNum}
                onClick={() => onPageChange && onPageChange(pageNum)}
              >
                {pageNum}
              </PageButton>
            )
          )}
        </PageInfo>
      </FooterContainer>
    );
  }
}

export default PaginationFooter;
