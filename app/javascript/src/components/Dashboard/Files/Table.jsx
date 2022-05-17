import React, { useState } from "react";
import { Eye, Download, Share, Delete } from "@bigbinary/neeto-icons";

import { Table as NeetoUITable } from "@bigbinary/neetoui";

import { NOTES_TABLE_COLUMN_DATA } from "./constants";
import { toast } from "react-toastify";
import { destroyFile } from "./action";

const Icon = ({classNames, IconType, ...props}) => (<IconType className={`cursor-pointer ${classNames}`} size="30" {...props}/>)

const copyToClipboard = str => {
  if (navigator && navigator.clipboard && navigator.clipboard.writeText)
  toast(`LINK: ${str} copied to clipboard`)
    return navigator.clipboard.writeText(str);
  return Promise.reject('The Clipboard API is not available.');
};

const Table = ({ files = [], fetchFiles }) => {
  const [showEditFile, setShowEditFile] = useState(false);
  const [selectedFile, setSelectedFile] = useState({});

  const actions = {
    title: "Actions",
    render: props => {
      return (
        <div className="flex flex-row justify-around">
        {props.file_url && (
          <>

          <a href={props.file_url}>
          <Icon IconType={Eye} />
        </a>

        <a href={props.file_url} download>
          <Icon IconType={Download} />
        </a>
          </>)
        }

        {props.tiny_url && <Icon IconType={Share} onClick={() =>copyToClipboard(props.tiny_url) } />}
        <Icon IconType={Delete} onClick={() => handleDelete(props.id)} />
        </div>
      );
    },
    key: "file_type",
    width: "12%",
  }



  const ColumnData = [...NOTES_TABLE_COLUMN_DATA, actions]

  const handleDelete = async (id) => {
    try {
      await destroyFile(id);
      toast.success('File Deleted')
      fetchFiles();
    } catch (error) {
      toast.error(error);
    }
  }

  return (
    <>
      <div className="files-table-height w-full">
        <NeetoUITable
          rowData={files}
          columnData={ColumnData}
          allowRowClick={false}
        />
      </div>
    </>
  );
};

export default Table;
