require 'rubygems'
require 'sinatra'
require 'sinatra/base'
require 'newrelic_rpm'
require 'sinatra/content_for'
require 'haml'
require 'sass'
require 'jsmin'
require 'mongo'
require 'json/ext' # required for .to_json

include Mongo


configure do
  set :views, "#{File.dirname(__FILE__)}/views"

  #MongoDB
  conn = MongoClient.new("localhost", 27017)
  set :mongo_connection, conn
  set :mongo_db, conn.db('nathanrgreen')
end


assets do

  js :application, %w(
    /js/*.js
    /js/vendor/*.js
  )
  css :application, %w(
    /css/jqueryui.css
    /css/reset.css
  )

  js_compression :jsmin
  css_compression :sass

end

#for local vars
app_config = {
    site_name: "Nathan R Green",
    site_description: "Developer | Director | Musician",
    header_button_text: "Learn more",
    #first panel
}

#routes

get '/' do
  haml :index, :layout => :application, :locals =>
      app_config
end

get '/elements' do
  haml :elements, :layout => :application
end


helpers do
  # a helper method to turn a string ID
  # representation into a BSON::ObjectId
  def object_id val
    BSON::ObjectId.from_string(val)
  end

  def document_by_id id
    id = object_id(id) if String === id
    settings.mongo_db['nathanrgreen'].
        find_one(:_id => id).to_json
  end
end


##API##


# show all collections
get '/collections/?' do
  settings.mongo_db.collection_names
end

# list all documents in the test collection
get '/documents/?' do
  content_type :json
  settings.mongo_db['nathanrgreen'].find.to_a.to_json
end

# find a document by its ID
get '/document/:id/?' do
  content_type :json
  document_by_id(params[:id]).to_json
end

# insert a new document from the request parameters,
# then return the full document
post '/new_document/?' do
  content_type :json
  new_id = settings.mongo_db['nathanrgreen'].insert params
  document_by_id(new_id).to_json
end

# update the document specified by :id, setting its
# contents to params, then return the full document
put '/update/:id/?' do
  content_type :json
  id = object_id(params[:id])
  #settings.mongo_db['nathanrgreen'].update(:_id => id, params)
  #document_by_id(id).to_json
end

# update the document specified by :id, setting just its
# name attribute to params[:name], then return the full
# document
put '/update_name/:id/?' do
  content_type :json
  id   = object_id(params[:id])
  name = params[:name]
  settings.mongo_db['nathanrgreen'].
      #update(:_id => id, {"$set" => {:name => name}})
  document_by_id(id).to_json
end

# delete the specified document and return success
delete '/remove/:id' do
  content_type :json
  settings.mongo_db['nathanrgreen'].
      remove(:_id => object_id(params[:id]))
  {:success => true}.to_json
end


