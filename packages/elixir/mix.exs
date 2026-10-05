defmodule RelevateSdk.MixProject do
  use Mix.Project

  def project do
    [
      app: :relevate_sdk,
      version: "0.1.0",
      elixir: "~> 1.15",
      start_permanent: Mix.env() == :prod,
      deps: deps(),
      description: "Generated Elixir SDK for Relevate"
    ]
  end

  def application do
    [extra_applications: [:logger, :inets], mod: {RelevateSdk.Application, []}]
  end

  defp deps do
    [
      {:finch, "~> 0.18"},
      {:jason, "~> 1.4"}
    ]
  end
end
