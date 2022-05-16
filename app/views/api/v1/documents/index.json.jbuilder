# frozen_string_literal: true

json.files @documents_carrier do |document_carrier|
  json.partial! "document", document: document_carrier.document
  json.file_name document_carrier.file_name
  json.file_size document_carrier.file_size
  json.file_type document_carrier.file_type
end
