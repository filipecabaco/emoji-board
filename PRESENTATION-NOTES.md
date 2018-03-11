# Emoji Board

## Slide 8

* worker - handles our image transformation
  * has a receiver and responds with the pixels
* client - handles our canvas
  * websocket to receive the pixels
* server - unifies all of them
  * knows how to talk with the worker
  * websocket to send pixels

## Slide 9

* handle a client joining to store the socket
* send file to worker
* receive pixels from worker
* send pixels to socket

## Slide 12

* server/lib/emoji.ex - uncomment part 1
* server/lib/server/application.ex - uncomment children
* show observer: iex -S mix phx.server --> :observer.start
* show help for Supervisor: iex -S mix phx.server --> h Supervisor

## Slide 13

* Controls the flow of its children

## Slide 16

* uncomment server/lib/process.ex - uncomment part 1
* GenServer.call(Process.whereis(Emoji.Process), {:image, "/Users/filipecabaco/Desktop/emoji-movie.jpg"})

## Slide 17

* really common to see
* just a behaviour around message passing
* call is a sync call - used when you want a response
* cast is a async call - used when you don't care about the response
* info is async and covers remainder of messages - covers non genserver compliant processes

## Slide 18

* need to make Emoji.Process available and supervised
* uncomment server/lib/emoji/emoji.ex

## Slide 19

* all of this creates the supervision tree
* you can control how the parent handles failure
  * one for one - it revives the kid
  * one for all - it kills every kid and revives them up again
  * rest for one - it kills from that children forward and revives them
  * simple one for one - special use case to dynamically create workers

## Slide 20

* **You let it crash!**
* philosophy that you are just not capable of handling all possible errors
* better to recover than to avoid exceptions
* less exception handling that could lead to some unexpected secondary paths
* a subject of a talk by itself

## Slide 22

* uncomment server/lib/server_web/controllers/upload_controller.ex

## Slide 24

* what's this secondary worker?
* well it could be a Web API... but No!
* we have a alternative!
* Erlang specifies a Distribution Protocol that can be used by other languages to create a bridge!
* we can also use a Java package that follows this protocol to actually connect a JVM as an Erlang Node! It just works (with some details…) !
* knowing this and the latest trends we built...A Kotlin application!

## Slide 25

* server/lib/emoji/process.ex - delete line with old process_file
* server/lib/emoji/process.ex - uncomment part 2
* start epmd -d
* server/application.ex - uncomment node connection
* start worker with ./gradlew run

## Slide 27

* server/lib/emoji/process.ex - uncomment part 3

## Slide 29

* server/lib/emoji/sender.ex - uncomment part 1
* server/lib/server/application.ex - uncomment worker

## Slide 31

* server/lib/emoji/process.ex - uncomment GenServer call
* server/lib/emoji/sender.ex - uncomment part 2

## Slide 33

* server/lib/server_web/channels/emoji_channel.ex - uncomment GenServer call
* server/lib/emoji/sender.ex - uncomment part 3

## Slide 35

* server/lib/emoji/sender.ex - uncomment part 4
* async tasks are also processes... everything is a process!
* and like every process, it uses messages to communicate
* when the work is done, it sends a message to the father
