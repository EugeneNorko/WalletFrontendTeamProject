import { useMedia } from 'react-use';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { fixDate } from 'helpers/fixDate';
import { useGetTransactionsQuery } from '../../redux/transactionsSlice';
import { PaginatedItems } from '../pagination/pagination';

import {
  TableWrapper,
  TableHeadItem,
  DataItem,
  TableHead,
  Data,
  DataSum,
  DataComment,
  DataMob,
  DataItemMob,
  HeadItemMob,
} from './transactionsTable.styled';
import './pagination.css';
export function TransactionsTable() {
  const isMobile = useMedia('(max-width: 767px)');
  const [itemOffset, setItemOffset] = useState(0);

  const { data } = useGetTransactionsQuery(itemOffset);

  if (!data) {
    return;
  }

  let { transactions, length } = data;
  const itemsPerPage = 5;
  const pageCount = Math.ceil(length / itemsPerPage);
  // зробити що коли менше нуля кількість сторінок то не рендерить пагінацію

  const handlePageClick = event => {
    setItemOffset(event.selected);
  };

  return (
    <>
      <TableWrapper>
        {!isMobile && (
          <>
            <thead>
              <TableHead>
                <TableHeadItem>Date</TableHeadItem>
                <TableHeadItem>Type</TableHeadItem>
                <TableHeadItem>Category</TableHeadItem>
                <TableHeadItem>Comment</TableHeadItem>
                <TableHeadItem>Sum</TableHeadItem>
                <TableHeadItem>Balance</TableHeadItem>
              </TableHead>
            </thead>
            <tbody>
              {transactions.map(
                ({ _id, date, type, category, comment, sum, balance }) => (
                  <Data key={_id}>
                    <DataItem>{fixDate(date)}</DataItem>
                    <DataItem>{type === true ? '+' : '-'}</DataItem>
                    <DataItem style={{ textAlign: 'left' }}>
                      {category}
                    </DataItem>
                    <DataItem style={{ textAlign: 'left' }}>
                      <DataComment>{comment}</DataComment>
                    </DataItem>
                    <DataItem style={{ textAlign: 'right', fontWeight: '700' }}>
                      <DataSum type={type.toString()}>{sum}</DataSum>
                    </DataItem>
                    <DataItem style={{ textAlign: 'right' }}>
                      {balance}
                    </DataItem>
                  </Data>
                )
              )}
            </tbody>
          </>
        )}
      </TableWrapper>

      <ReactPaginate
        breakLabel="..."
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel={'← Previous'}
        nextLabel={'Next →'}
        renderOnZeroPageCount={null}
        containerClassName={'pagination'}
        previousLinkClassName={'pagination__link'}
        nextLinkClassName={'pagination__link'}
        disabledClassName={'pagination__link--disabled'}
        activeClassName={'pagination__link--active'}
      />

      {/*        
        marginPagesDisplayed={2}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active" */}

      {isMobile && (
        <>
          {transactions.map(
            ({ _id, date, type, category, comment, sum, balance }) => (
              <DataMob key={_id} type={type.toString()}>
                <DataItemMob>
                  <HeadItemMob>Date</HeadItemMob>
                  {fixDate(date)}
                </DataItemMob>
                <DataItemMob>
                  <HeadItemMob>Type</HeadItemMob>
                  {type === true ? '+' : '-'}
                </DataItemMob>
                <DataItemMob>
                  <HeadItemMob>Category</HeadItemMob>
                  {category}
                </DataItemMob>
                <DataItemMob>
                  <HeadItemMob>Comment</HeadItemMob>
                  <DataComment>{comment}</DataComment>
                </DataItemMob>
                <DataItemMob style={{ fontWeight: '700' }}>
                  <HeadItemMob>Sum</HeadItemMob>
                  <DataSum type={type.toString()}>{sum}</DataSum>
                </DataItemMob>
                <DataItemMob>
                  <HeadItemMob>Balance</HeadItemMob>
                  {balance}
                </DataItemMob>
              </DataMob>
            )
          )}
        </>
      )}
    </>
  );
}
