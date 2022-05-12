# frozen_string_literal: true

class Api::V1::UsersController < Api::V1::BaseController
  before_action :load_user!, only: %i[show destroy]

  def show
    render json: @user, status: :ok
  end

  def create
    user = User.create!(user_params)
      render json: { user: user, auth_token: user.authentication_token }
  end

  def destroy
    @user.destroy!
  end

  private

    def user_params
      params.require(:user).permit(:email, :first_name, :last_name, :password, :password_confirmation)
    end
end
