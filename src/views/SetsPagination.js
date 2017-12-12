import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import '../styles/SetsPagination.css';

export default class SetsPagination extends React.Component {

  checkPrevious() {
    console.log('hey');
    if(this.props.activePageNum === 1) return 'disabled';
    else return '';
  }

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
            <PaginationItem className={this.checkPrevious()}>
              <PaginationLink previous href="#" />
            </PaginationItem>
            {pageNumArr.map((page, idx) =>
              <PageNumber key={idx} pageIndex={page} onPageClick={this.props.onPageClick} activePageNum={this.props.activePageNum} />
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

  //TODO: should only call one time
  checkActivePage() {
    console.log('Active Page: ' + this.props.activePageNum);
    if (this.props.pageIndex === this.props.activePageNum) return 'active';
    else return '';
  }

  render() {
    return (
      <PaginationItem className={this.checkActivePage()}>
        <PaginationLink href="#" onClick={this.handleClick}>
          {this.props.pageIndex}
        </PaginationLink>
      </PaginationItem>
    );
  }
}