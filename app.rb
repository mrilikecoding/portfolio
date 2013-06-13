require 'rubygems'
require 'sinatra'
require 'haml'

configure do
  set :views, "#{File.dirname(__FILE__)}/views"
end

get '/' do
  haml :index
end