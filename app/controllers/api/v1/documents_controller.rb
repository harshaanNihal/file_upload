# frozen_string_literal: true

class Api::V1::DocumentsController < Api::V1::BaseController
  before_action :load_file!, only: %i[update destroy]

  def index
    @documents_carrier = DocumentCarrier.build_from_collection(current_user.documents.all)
  end

  def create
    @document = current_user.documents.new(document_params)
    if @document.save!
      attach_file if document_params[:file].present?
      respond_with_success(t("successfully_created", entity: "File"))
    else
      respond_with_error(@document.errors.full_messages.join(", "), :unprocessable_entity)
    end
  end

  def update
    @file.update!(document_params)
    respond_with_success(t("successfully_updated", entity: "File"))
  end

  def destroy
    @file.destroy
    respond_with_success(t("successfully_deleted", count: 1, entity: "File"))
  end

  private

    def document_params
      params.permit(:title, :description, :file)
    end

    def attach_file
      @document.file.attach(document_params[:file])
    end

    def load_file!
      @file = current_user.documents.find(params[:id])
    end
end
