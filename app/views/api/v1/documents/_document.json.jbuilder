json.id document.id
json.title document.title
json.description document.description

if document.file.present?
  json.attachment rails_blob_path(document.file)
end
json.file document.file
json.tiny_url document&.tiny_url
json.slug document.slug
json.file_url document&.file_url



