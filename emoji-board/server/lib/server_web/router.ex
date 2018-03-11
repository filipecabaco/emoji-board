defmodule ServerWeb.Router do
  use ServerWeb, :router

  scope "/upload", ServerWeb do
    post "/", UploadController, :upload
  end
end
