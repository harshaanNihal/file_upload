import React from "react";
import * as yup from "yup";

const NOTES_FORM_INITIAL_FORM_VALUES = {
  title: "",
  description: "",
};

const NOTES_FORM_VALIDATION_SCHEMA = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
});

const bytesToSize = (bytes) => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (bytes === 0) return 'n/a'
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10)
  if (i === 0) return `${bytes} ${sizes[i]})`
  return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`
}

const NOTES_TABLE_COLUMN_DATA = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    width: "15%",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    width: "25%",
  },
  {
    title: "File Name",
    dataIndex: "file_name",
    key: "file_name",
    width: "10%",
  },
  {
    title: "File Size",
    dataIndex: "file_size",
    key: "file_size",
    width: "10%",
    render:file_size => bytesToSize(file_size)
  },
  {
    title: "File Type",
    dataIndex: "file_type",
    key: "file_type",
    width: "10%",
  }
];

export {
  NOTES_FORM_INITIAL_FORM_VALUES,
  NOTES_FORM_VALIDATION_SCHEMA,
  NOTES_TABLE_COLUMN_DATA,
};
