import DataTables from "../DataTables";
import Pagination from "../Pagination";

const SoalTableSection = ({
  columns,
  data,
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  onEdit,
  onDelete,
}) => {
  return (
    <>
      <DataTables
        columns={columns}
        data={data}
        onEdit={onEdit}
        onDelete={onDelete}
      />
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

export default SoalTableSection;
