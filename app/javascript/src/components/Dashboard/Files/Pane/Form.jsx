import React, { useState } from "react";

import { Formik, Form } from "formik";
import { Button, Pane, Input as InputOG } from "@bigbinary/neetoui";
import { Input, Textarea } from "@bigbinary/neetoui/formik";

import { NOTES_FORM_VALIDATION_SCHEMA } from "../constants";
import { createFile, destroyFile, updateFile } from "../action";
import { toast } from "react-toastify";

export default function FileForm({ onClose, refetch, fileData, isEdit }) {
  const [submitted, setSubmitted] = useState(false);
  const [selectedFile, setSelectedFile] = useState();

  const handleSubmit = async values => {
    event.preventDefault()
    let formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('fileName', selectedFile.name);
    formData.append('description', values.description);
    formData.append('title', values.title);
    try {
      if (isEdit) {
        // await updateFile(fileData.id, formData);
      } else {
        await createFile(formData);
      }
      refetch();
      onClose();
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <Formik
      initialValues={fileData}
      onSubmit={handleSubmit}
      validateOnBlur={submitted}
      validateOnChange={submitted}
      validationSchema={NOTES_FORM_VALIDATION_SCHEMA}
    >
      {({ isSubmitting }) => (
        <Form className="w-full">
          <Pane.Body className="space-y-6">
            <Input
              label="Title"
              name="title"
              className="w-full flex-grow-0"
              required
            />
            <Textarea
              label="Description"
              name="description"
              className="w-full flex-grow-0"
              rows={8}
              required
            />
            <input
              label="File"
              name="file"
              type="file"
              onChange={(event) => {
                setSelectedFile(event.currentTarget.files[0]);
              }}
              className="w-full flex-grow-0"
              required
            />
            {selectedFile && selectedFile.name && (
              <div className="flex flex-col items-center justify-center">
                {selectedFile.name}
              </div>
            )}


          </Pane.Body>
          <Pane.Footer>
            <Button
              type="submit"
              label={isEdit ? "Update" : "Save Changes"}
              size="large"
              style="primary"
              className="mr-3"
              disabled={isSubmitting}
              loading={isSubmitting}
              onClick={() => setSubmitted(true)}
            />
            {isEdit && (<Button
              label={"Delete"}
              size="large"
              style="primary"
              className="mr-3"
              disabled={isSubmitting}
              loading={isSubmitting}
              onClick={() => {setSubmitted(true)
                // handleDelete()
              }}
            />)}

            <Button
              onClick={onClose}
              label="Cancel"
              size="large"
              style="text"
            />
          </Pane.Footer>
        </Form>
      )}
    </Formik>
  );
}
