defmodule Emoji.Web.Upload do
  import Plug.Conn

  def upload(%{body_params: %{"file" => %{path: path, content_type: content_type}}} = conn) do
    :ok = GenServer.call(Process.whereis(Emoji.Board.Process), {type(content_type), path})
    send_resp(conn, 200, "")
  end

  defp type("image" <> _), do: :image
end
