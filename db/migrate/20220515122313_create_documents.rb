# frozen_string_literal: true

class CreateDocuments < ActiveRecord::Migration[6.0]
  def change
    create_table :documents, id: :uuid do |t|
      t.string :title
      t.string :description
      t.string :slug
      t.references :user, type: :uuid

      t.timestamps
    end
  end
end
