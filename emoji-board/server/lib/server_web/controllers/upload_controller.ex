defmodule ServerWeb.UploadController do
  use ServerWeb, :controller

  def upload(conn, %{"file" => %{path: path}}  ) do
    {:ok, _content} = File.read(path)
    text conn, ""
  end
end