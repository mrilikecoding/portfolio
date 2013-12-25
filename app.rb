require 'rubygems'
require 'sinatra'
require 'sinatra/content_for'
require 'haml'
require 'mongo'
require 'json/ext' # required for .to_json

include Mongo

configure do
  set :views, "#{File.dirname(__FILE__)}/views"

  #Mongo
  conn = MongoClient.new("localhost", 27017)
  set :mongo_connection, conn
  set :mongo_db, conn.db('test')
end

#for local vars
app_config = {
    site_name: "Site Name",
    site_description: "This is where the site description goes",
    header_button_text: "Explore"
}

#routes

get '/' do
  haml :index, :layout => :application, :locals => app_config
end

#
###API##
#
## show all collections
#get '/collections/?' do
#  settings.mongo_db.collection_names
#end
#
## list all documents in the test collection
#get '/documents/?' do
#  content_type :json
#  settings.mongo_db['test'].find.to_a.to_json
#end
#
## find a document by its ID
#get '/document/:id/?' do
#  content_type :json
#  document_by_id(params[:id]).to_json
#end
#
## insert a new document from the request parameters,
## then return the full document
#post '/new_document/?' do
#  content_type :json
#  new_id = settings.mongo_db['test'].insert params
#  document_by_id(new_id).to_json
#end
#
## update the document specified by :id, setting its
## contents to params, then return the full document
#put '/update/:id/?' do
#  content_type :json
#  id = object_id(params[:id])
#  settings.mongo_db['test'].update(:_id => id, params)
#  document_by_id(id).to_json
#end
#
## update the document specified by :id, setting just its
## name attribute to params[:name], then return the full
## document
#put '/update_name/:id/?' do
#  content_type :json
#  id   = object_id(params[:id])
#  name = params[:name]
#  settings.mongo_db['test'].
#      update(:_id => id, {"$set" => {:name => name}})
#  document_by_id(id).to_json
#end
#
## delete the specified document and return success
#delete '/remove/:id' do
#  content_type :json
#  settings.mongo_db['test'].
#      remove(:_id => object_id(params[:id]))
#  {:success => true}.to_json
#end
#
#helpers do
#
#  # a helper method to turn a string ID
#  # representation into a BSON::ObjectId
#  def object_id val
#    BSON::ObjectId.from_string(val)
#  end
#
#  def document_by_id id
#    id = object_id(id) if String === id
#    settings.mongo_db['test'].
#        find_one(:_id => id).to_json
#  end
#end

