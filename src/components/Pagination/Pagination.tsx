import css from './Pagination.module.css';

type Props = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({ page, totalPages, onPageChange }: Props) {
  return (
    <div className={css.pagination}>
      <button onClick={() => onPageChange(page - 1)} disabled={page === 1}>
        Prev
      </button>

      <span>
        Page: {page} / {totalPages}
      </span>

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
      >
        Next
      </button>
    </div>
  );
}
