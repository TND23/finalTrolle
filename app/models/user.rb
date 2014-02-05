class User < ActiveRecord::Base

  attr_accessible :username, :password, :boards
  attr_accessor :board
  attr_reader :password

  validates :password_digest, :presence => { :message => "Password can't be blank" }
   validates :password, :length => { :minimum => 6, :allow_nil => true }
   validates :session_token, :presence => true
   validates :username, :presence => true

   after_initialize :ensure_session_token

   has_many :boards


   def self.find_by_credentials(username, password)
     user = User.find_by_username(username)
     return nil if user.nil?
     user.is_password?(password) ? user : nil
   end

   def self.generate_session_token
     SecureRandom::urlsafe_base64(16)
   end

   def board_ids(username)
    current_user = User.find_by_username(username)
    current_user.boards.to_json
   end

   def is_password?(password)
     BCrypt::Password.new(self.password_digest).is_password?(password)
   end

   def password=(password)
     @password = password
     self.password_digest = BCrypt::Password.create(password)
   end

   def reset_session_token!
     self.session_token = self.class.generate_session_token
     self.save!
   end

   private
   def ensure_session_token
     self.session_token ||= self.class.generate_session_token
   end
end
