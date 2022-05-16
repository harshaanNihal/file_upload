import React, { useState } from "react";
import { Eye, Download, Share, Delete } from "@bigbinary/neeto-icons";

import { Table as NeetoUITable } from "@bigbinary/neetoui";

import { NOTES_TABLE_COLUMN_DATA } from "./constants";
import EditFilePane from "./Pane/Edit";
import { toast } from "react-toastify";
import { destroyFile } from "./action";

const Icon = ({classNames, IconType, ...props}) => (<IconType className={`cursor-pointer ${classNames}`} size="30" {...props}/>)

const Table = ({ files = [], fetchFiles }) => {
  const [showEditFile, setShowEditFile] = useState(false);
  const [selectedFile, setSelectedFile] = useState({});

  const actions = {
    title: "Actions",
    render: props => {
      console.log(props)
      return (
        <div className="flex flex-row justify-around">
        <Icon IconType={Eye} />
        <Icon IconType={Download} />
        <Icon IconType={Share} />
        <Icon IconType={Delete} onClick={() => handleDelete(props.id)} />
        </div>
      );
    },
    key: "file_type",
    width: "12%",
  }



  const ColumnData = [...NOTES_TABLE_COLUMN_DATA, actions]

  const handleDelete = async (id) => {
    console.log(id)
    try {
      await destroyFile(id);
      toast.success('File Deleted')
      refetch();
      onClose();
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
      {/* <EditFilePane
        showPane={showEditFile}
        setShowPane={setShowEditFile}
        fetchFiles={fetchFiles}
        file={selectedFile}
      /> */}
    </>
  );
};

export default Table;
