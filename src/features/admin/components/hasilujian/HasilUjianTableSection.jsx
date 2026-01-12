import DataTables from "../DataTables";
import Pagination from "../Pagination";

const HasilUjianTableSection = ({
  columns,
  data,
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  onDelete,
}) => {
  return (
    <>
      <DataTables columns={columns} data={data} onDelete={onDelete} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={onPageChange}
        onItemsPerPageChange={onItemsPerPageChange}
      />
    </>
  );
};

export default HasilUjianTableSection;
