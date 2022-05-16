import React from "react";

import { Pane, Typography } from "@bigbinary/neetoui";

import Form from "./Form";

import { NOTES_FORM_INITIAL_FORM_VALUES } from "../constants";

export default function NewFilePane({ fetchFiles, showPane, setShowPane }) {
  const onClose = () => setShowPane(false);

  return (
    <Pane isOpen={showPane} onClose={onClose}>
      <Pane.Header>
        <Typography style="h2" weight="semibold">
          Create a New File
        </Typography>
      </Pane.Header>
      <Form
        onClose={onClose}
        refetch={fetchFiles}
        fileData={NOTES_FORM_INITIAL_FORM_VALUES}
        isEdit={false}
      />
    </Pane>
  );
}
