import React from "react";

import { Pane, Typography } from "@bigbinary/neetoui";

import Form from "./Form";

export default function EditFilePane({
  fetchFiles,
  showPane,
  setShowPane,
  file,
}) {
  const onClose = () => setShowPane(false);

  return (
    <Pane isOpen={showPane} onClose={onClose}>
      <Pane.Header>
        <Typography style="h2" weight="semibold">
          Edit File
        </Typography>
      </Pane.Header>
      <Form isEdit={false} onClose={onClose} refetch={fetchFiles} fileData={file} />
    </Pane>
  );
}
