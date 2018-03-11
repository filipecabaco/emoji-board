defmodule ServerWeb.EmojiChannel do
  use ServerWeb, :channel

  def join("emoji:*", _, socket) do
    send(self(), :after_join)
    {:ok, socket}
  end

  def handle_info(:after_join, socket) do
    # :ok = GenServer.call(Process.whereis(Emoji.Drawer), {:joined, socket})
    {:noreply, socket}
  end
end