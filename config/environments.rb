# encoding: utf-8

require 'sinatra/base'

module Sinatra
  class Application < Base
    # The environment variable DATABASE_URL should be in the following format:
    # => postgres://{user}:{password}@{host}:{port}/path
    configure :production, :development, :test do
      db = URI.parse(ENV['DATABASE_URL'] ||
        'postgres://localhost/marketInspector_development')

      ActiveRecord::Base.establish_connection(
        adapter: db.scheme == 'postgres' ? 'postgresql' : db.scheme,
        host: db.host,
        username: db.user,
        password: db.password,
        database: db.path[1..-1],
        encoding: 'utf8'
      )

      at_exit { Application.run! if $ERROR_INFO.nil? && Application.run? }
    end
  end
end
