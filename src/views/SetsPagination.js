import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import '../styles/SetsPagination.css';

export default class SetsPagination extends React.Component {

  render() {
    const totalPages = this.props.length;
    const pageNumArr = [];
    for(let i=0; i<totalPages; i++) {
      pageNumArr[i] = i+1;
    }

    return (
      <div className="col">
        <div className="float-right">
          <Pagination className="pagers">
            <PaginationItem>
              <PaginationLink previous href="#" />
            </PaginationItem>
            {pageNumArr.map((page, idx) =>
              <PageNumber key={idx} pageIndex={page} onPageClick={this.props.onPageClick} />
              )}
            <PaginationItem>
              <PaginationLink next href="#" />
            </PaginationItem>
          </Pagination>
        </div>
      </div>
    );
  }
}


class PageNumber extends React.Component {
  handleClick = () => {
    this.props.onPageClick(this.props.pageIndex);
  }

  render() {
    return (
      <PaginationItem>
        <PaginationLink href="#" onClick={this.handleClick}>
          {this.props.pageIndex}
        </PaginationLink>
      </PaginationItem>
    );
  }
}