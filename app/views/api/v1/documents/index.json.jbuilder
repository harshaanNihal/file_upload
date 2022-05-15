# frozen_string_literal: true

json.files @documents_carrier do |document|
  json.partial! "document", document: document
end
