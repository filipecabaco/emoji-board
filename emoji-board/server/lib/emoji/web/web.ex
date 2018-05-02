defmodule Emoji.Web do
  use Plug.Router

  plug(Plug.Logger)

  plug(
    Plug.Parsers,
    parsers: [:urlencoded, :multipart, :json],
    pass: ["*/*"],
    json_decoder: Poison,
    length: 100_000_000
  )

  plug(:match)
  plug(:dispatch)

  post(
    "/upload",
    do:
      conn
      |> Emoji.Web.Upload.upload()
      |> halt()
  )

  get(
    "/",
    do:
      conn
      |> send_resp(200, ":wave:")
      |> halt()
  )

  match(_, do: conn |> send_resp(404, "") |> halt())
end
