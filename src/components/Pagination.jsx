export default function Pagination({ index, setCurrentPage, currentPage }) {
  if (index < 0 || isNaN(index)) index = 1;
  const pages = new Array(index).fill().map((_, i) => i + 1);

  function pageCountComponent(page, i) {
    return (
      <div
        key={i}
        className={
          page === currentPage
            ? "bg-main_bg_color rounded text-main_color"
            : null
        }
      >
        <a
          key={page}
          className="m-2"
          onClick={() => {
            setCurrentPage(page);
          }}
        >
          {page}
        </a>
      </div>
    );
  }

  return (
    <nav className="bg-white h-16 flex justify-center items-center text-lg cursor-pointer w-[300px] mt-3 mb-2">
      <span
        onClick={() => setCurrentPage(1)}
        className="text-3xl rounded hover:bg-main_bg_color"
      >
        «
      </span>
      <span
        className="text-3xl m-3 rounded hover:bg-main_bg_color"
        onClick={currentPage > 1 ? () => setCurrentPage(currentPage - 1) : null}
      >
        ‹
      </span>
      {index < 5
        ? pages.map((page, i) => {
            return pageCountComponent(page, i);
          })
        : currentPage >= index - 2
        ? pages.slice(index - 5, index).map((page, i) => {
            return pageCountComponent(page, i);
          })
        : currentPage < 4
        ? pages.slice(0, 5).map((page, i) => {
            return pageCountComponent(page, i);
          })
        : pages.slice(currentPage - 3, currentPage + 2).map((page, i) => {
            return pageCountComponent(page, i);
          })}
      {index > 5 && currentPage < index - 2 ? <span>...</span> : null}
      <span
        className="text-3xl  m-3 rounded hover:bg-main_bg_color"
        onClick={
          currentPage < index ? () => setCurrentPage(currentPage + 1) : null
        }
      >
        ›
      </span>
      <span
        onClick={() => setCurrentPage(index)}
        className="text-3xl rounded hover:bg-main_bg_color"
      >
        »
      </span>
    </nav>
  );
}
