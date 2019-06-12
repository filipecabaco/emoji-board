defmodule SlimServer.MixProject do
  use Mix.Project

  def project do
    [
      app: :emoji,
      version: "0.1.0",
      elixir: "~> 1.8",
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
      {:cowboy, "~> 2.6"},
      {:plug, "~> 1.8"},
      {:plug_cowboy, "~> 2.0"},
      {:cors_plug, "~> 2.0"},
      {:jason, "~> 1.1"}
    ]
  end
end
