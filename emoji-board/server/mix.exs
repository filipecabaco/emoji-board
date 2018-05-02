defmodule SlimServer.MixProject do
  use Mix.Project

  def project do
    [
      app: :emoji,
      version: "0.1.0",
      elixir: "~> 1.6",
      start_permanent: Mix.env() == :prod,
      deps: deps()
    ]
  end

  def application do
    [
      mod: {Emoji, []},
      extra_applications: [:logger]
    ]
  end

  defp deps do
    [
      {:cowboy, "~> 2.4"},
      {:plug, "~> 1.5"}
    ]
  end
end
