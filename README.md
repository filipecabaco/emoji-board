# Emoji Board Presentation

## What is this

Presentation and code used for the Emoji Board presentation

## What does this repository contain

### Presentation

Starts with `yarn start`

React application that takes care of the presentation and "main feature". Use `Left Arrow` and `Right Arrow` keys to change slides. Emoji slide will take picture when you click on the canvas element

### Server

Starts with `iex -S mix` and requires `epmd -d` to be running

Main orchestrator that handles communication between all components

### Worker

Starts with `./gradlew run` and requires `epmd -d` to be running

Kotlin application that will receive an image and calculate the alpha of each pixel to send it back to the Server

## References

Here are some good references about Elixir

- [Elixir School](https://elixirschool.com/en/)
- [Exercism](http://exercism.io/languages/elixir/about)
- [Awesome Elixir](https://github.com/h4cc/awesome-elixir)
- [Elixir Status](https://elixirstatus.com/)

## That's it

I hope you have fun and please do make questions! :D
