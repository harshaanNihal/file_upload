class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
    :recoverable, :trackable, :validatable, :rememberable

  before_save :ensure_authentication_token_is_present

  has_many :documents, dependent: :delete_all

  validates :first_name, :last_name, :email, presence: true
  validates :email, uniqueness: true
  validates :password_confirmation, presence: true, on: :create

  def name
    [first_name, last_name].join(" ").strip
  end

  def ensure_authentication_token_is_present
    if authentication_token.blank?
      self.authentication_token = generate_authentication_token
    end
  end

  def generate_authentication_token
    loop do
      token = Devise.friendly_token
      break token unless User.where(authentication_token: token).first
    end
  end
end
