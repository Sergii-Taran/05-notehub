import ReactPaginateImport from 'react-paginate';

import css from './Pagination.module.css';

const ReactPaginate =
  (ReactPaginateImport as any).default || ReactPaginateImport;

type Props = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({ page, totalPages, onPageChange }: Props) {
  return (
    <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      forcePage={page - 1}
      onPageChange={(selectedItem: any) => {
        onPageChange(selectedItem.selected + 1);
      }}
      containerClassName={css.pagination}
      activeClassName={css.active}
      previousLabel="←"
      nextLabel="→"
      breakLabel="..."
    />
  );
}
