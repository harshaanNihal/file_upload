# frozen_string_literal: true

class Document < ApplicationRecord
  has_one_attached :file
  validates :file, presence: true

  belongs_to :user
  validates :title, :description, presence: true
  validates :title, uniqueness: true
  validates_uniqueness_of :slug
  before_validation :generate_slug


  def generate_slug
    self.slug = SecureRandom.uuid[0..5] if self.slug.nil? || self.slug.empty?
    true
  end

  def file_url
    begin
    if Rails.env.development?
      base_url = 'localhost:3000'
      return Rails.application.routes.url_helpers.rails_blob_url(self.file, host: base_url)
    elsif Rails.env.production?
      base_url = ENV['HOST_URL']
      return base_url + Rails.application.routes.url_helpers.rails_service_blob_path(self.file)
    end
    rescue
      return nil
    end
  end

  def tiny_url
    begin
      if Rails.env.development?
        base_url = 'localhost:3000'
      elsif Rails.env.production?
        base_url = ENV['HOST_URL']
      end
      return  Rails.application.routes.url_helpers.short_url(slug: self.slug, host: base_url)
    rescue
      return nil
    end
  end

end
