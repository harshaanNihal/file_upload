# frozen_string_literal: true

class DocumentCarrier
  attr_reader :document

  def self.build_from_collection(documents)
    documents.map { |document| new(document) }
  end

  def initialize(document)
    @document = document
  end

  def file_name
    @document&.file&.filename
  end

  def file_size
    @document&.file&.byte_size
  end

  def file_type
    @document.file.content_type
  end

  def file_url
    @document.file.url
  end
end
