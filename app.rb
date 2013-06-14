require 'rubygems'
require 'sinatra'
require 'haml'

configure do
  set :views, "#{File.dirname(__FILE__)}/views"
end

get '/' do
  haml :index
end

get '/script.js' do
  coffee :script
end

require 'coffee-script'

