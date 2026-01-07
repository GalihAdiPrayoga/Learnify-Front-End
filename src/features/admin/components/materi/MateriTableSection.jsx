import React from "react";
import DataTables from "../DataTables";
import Pagination from "../Pagination";

const MateriTableSection = ({
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
      <div className="mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={onPageChange}
          onItemsPerPageChange={onItemsPerPageChange}
        />
      </div>
    </>
  );
};

export default MateriTableSection;
