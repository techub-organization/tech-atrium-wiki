require "sinatra"
require "json"

get "/health" do
  content_type :json
  { status: "ok", stack: "ruby" }.to_json
end
