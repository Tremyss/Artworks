
const Pager = ({ page, totalPageCount, onPageChange }) => {

  return (
    <div id="pager-container">
      <button
        id="pager-previous-button"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      >
        Previous
      </button>
      <div id="pager-counter">Page:&nbsp;{page} &nbsp;of&nbsp; {totalPageCount}</div>
      <button
        id="pager-next-button"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPageCount}
      >
        Next
      </button>
    </div>
  )

}

export default Pager