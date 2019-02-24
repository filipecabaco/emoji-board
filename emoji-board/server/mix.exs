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
      {:cowboy, "~> 2.4"},
      {:plug, "~> 1.5"},
      {:plug_cowboy, "~> 2.0"},
      {:cors_plug, "~> 1.5"},
      {:poison, "~> 3.1"}
    ]
  end
end
