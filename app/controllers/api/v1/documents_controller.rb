# frozen_string_literal: true

class Api::V1::DocumentsController < Api::V1::BaseController
  before_action :load_file!, only: %i[update destroy]
  skip_before_action :authenticate_user!, only: :show
  skip_before_action :authenticate_user_using_x_auth_token, only: :show


  def index
    @documents_carrier = DocumentCarrier.build_from_collection(current_user.documents.all)
  end

  def create
    @document = current_user.documents.new(document_params)
    attach_file if document_params[:file].present?
    if @document.save!
      respond_with_success(t("successfully_created", entity: "File"))
    else
      respond_with_error(@document.errors.full_messages.join(", "), :unprocessable_entity)
    end
  end

  # def update
  #   @file.update!(document_params)
  #   respond_with_success(t("successfully_updated", entity: "File"))
  # end

  def show
    @document = current_user.documents.find_by_slug(params[:id])
    redirect
  end


  def destroy
    @file.destroy!
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
