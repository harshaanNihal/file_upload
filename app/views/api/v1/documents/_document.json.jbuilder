json.id document.id
json.title document.title
json.description document.description

if document.file.present?
  json.attachment rails_blob_path(document.file)
end
json.file document.file


