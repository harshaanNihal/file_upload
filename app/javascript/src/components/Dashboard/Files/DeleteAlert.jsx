import React, { useState } from "react";
import { Alert } from "@bigbinary/neetoui";
import { destroyFile } from "./action";

const DeleteAlert = ({
  refetch,
  onClose,
  selectedFileIds,
  setSelectedFileIds,
}) => {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await destroyFile({ ids: selectedFileIds });
      onClose();
      setSelectedFileIds([]);
      refetch();
    } catch (error) {
      logger.error(error);
      setDeleting(false);
    }
  };

  return (
    <Alert
      isOpen
      onSubmit={handleDelete}
      onClose={onClose}
      message="Are you sure you want to continue? This cannot be undone."
      title={`Delete ${selectedFileIds.length} ${selectedFileIds.length > 1 ? "files" : "file"
      }?`}
      isSubmitting={deleting}
    />
  );
};

export default DeleteAlert;
