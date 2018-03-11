defmodule ServerWeb.UploadController do
  use ServerWeb, :controller

  def upload(conn, %{"file" => %{path: path, content_type: content_type}}  ) do
    :ok = GenServer.call(Process.whereis(Emoji.Process), {type(content_type), path})
    text conn, ""
  end

  defp type(content_type) do
    cond do
      String.match?(content_type, ~r/^image.*/) -> :image
      String.match?(content_type, ~r/^video.*/) -> :video
      true -> :error
    end
  end
end