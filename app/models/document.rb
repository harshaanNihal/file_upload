# frozen_string_literal: true

class Document < ApplicationRecord
  has_one_attached :file

  belongs_to :user
  validates :title, :description, presence: true
  validates :title, uniqueness: true

end
