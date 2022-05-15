json.id document.id
json.title document.title
json.description document.description

if document.file.present?
  json.attachment rails_blob_path(document.file)
end
json.file document.file
json.file_name document.file_name
json.file_size document.file_size
json.file_type document.file_type
json.file_url document.file_url


