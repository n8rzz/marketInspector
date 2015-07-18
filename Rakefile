require './app'
require 'sinatra/activerecord/rake'

class MarketInspector < Sinatra::Base
    register Sinatra::ActiveRecordExtension
end

namespace :db do
    task :load_config do
        require './app'
    end
end

Dir.glob('lib/tasks/*.rake').each { |r| load r}
