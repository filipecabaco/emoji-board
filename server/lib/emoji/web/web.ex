defmodule Emoji.Web do
  use Plug.Router

  plug(CORSPlug, origin: ~r/.*/)

  plug(Plug.Logger)

  plug(
    Plug.Parsers,
    parsers: [:urlencoded, :multipart, :json],
    pass: ["*/*"],
    json_decoder: Jason,
    length: 100_000_000
  )

  plug(:match)
  plug(:dispatch)

  post("/upload", do: conn |> Emoji.Web.Upload.upload() |> halt())

  match(_, do: conn |> send_resp(404, "") |> halt())
end
