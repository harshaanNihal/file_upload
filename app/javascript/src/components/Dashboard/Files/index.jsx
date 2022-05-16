import React, { useState, useEffect } from "react";

import EmptyFilesListImage from "images/EmptyFilesList";
import { Button, PageLoader } from "@bigbinary/neetoui";
import { Container, Header, SubHeader } from "@bigbinary/neetoui/layouts";


import NewFilePane from "./Pane/Create";
import Table from "./Table";
import { toast } from "react-toastify";
import { getFiles } from "./action";
import EmptyState from "../../common/EmptyState";

const Files = () => {
  const [loading, setLoading] = useState(true);
  const [showNewFilePane, setShowNewFilePane] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      setLoading(true);
      const { data } = await getFiles();
      setFiles(data.files);
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <PageLoader />;
  }

  return (
    <Container>
      <Header
        title="Files"
        actionBlock={
          <Button
            onClick={() => setShowNewFilePane(true)}
            label="Add New File"
            icon="ri-add-line"
          />
        }
        searchProps={{
          value: searchTerm,
          onChange: e => setSearchTerm(e.target.value),
        }}
      />
      {files.length ? (
        <>
          <SubHeader />
          <Table
            files={files}
            fetchFiles={fetchFiles}
          />
        </>
      ) : (
        <EmptyState
          image={EmptyFilesListImage}
          title="Looks like you don't have any files!"
          subtitle="Add your files to send customized emails to them."
          primaryAction={() => setShowNewFilePane(true)}
          primaryActionLabel="Add New File"
        />
      )}
      <NewFilePane
        showPane={showNewFilePane}
        setShowPane={setShowNewFilePane}
        fetchFiles={fetchFiles}
      />
    </Container>
  );
};

export default Files;
