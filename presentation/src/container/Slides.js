import React from "react";
import EmojiKotlinSvg from "svg-react-loader?name=Icon!./content/emoji_kotlin.svg";
import EmojiProcessorSvg from "svg-react-loader?name=Icon!./content/emoji_processor.svg";
import EmojiSupervisorSvg from "svg-react-loader?name=Icon!./content/emoji_supervisor.svg";
import EmojiWebsocketSvg from "svg-react-loader?name=Icon!./content/emoji_websocket.svg";
import GenServerTypes from "svg-react-loader?name=Icon!./content/genserver_types.svg";
import SupervisionTree from "svg-react-loader?name=Icon!./content/supervision_tree.svg";
import CarCrashGif from "./content/car_crash.gif";
import {
  epmd,
  processorGenserver0,
  processorGenserver1,
  processorGenserver2,
  processorGenserver3,
  processorGenserver4,
  projectCreate,
  sender0,
  supervisor0,
  supervisor1,
  supervisor2,
  supervisor3,
  supervisor4,
  websocket0,
  worker0,
  worker1
} from "./content/code";
import SupervisorsGif from "./content/supervisors.gif";

export const slides = [
  { type: "title", title: "Emoji Board", subtitle: "An Elixir showcase" },
  {
    type: "bullet",
    title: "Who is this guy?",
    bullets: [
      "Filipe Cabaco",
      "Software Developer @ Volkswagen SDC Lisbon",
      "twitter.com/filipecabaco",
      "github.com/filipecabaco"
    ]
  },
  {
    type: "bullet",
    title: "What is Elixir?",
    bullets: [
      "Created by José Valim",
      '"Ruby like" syntax',
      "Compiles to Erlang",
      "Actor Pattern for concurrency (aka message passing everywhere)"
    ]
  },
  {
    type: "bullet",
    title: "What will we do?",
    bullets: [
      "Create an Elixir application",
      "Connect it to Kotlin",
      "Send information to a Web Client",
      "Take a picture with every pixels replaced by a 😄",
      "(Bonus) Show how to parallize"
    ]
  },
  { type: "title", subtitle: "How to create a Elixir app?" },
  {
    type: "markdown",
    style: { alignContent: "center" },
    markdown: projectCreate
  },
  {
    type: "svg",
    title: "Creating the Emoji Supervisor",
    svg: <EmojiSupervisorSvg />
  },
  { type: "title", subtitle: "How to create a Supervisor?" },
  { type: "title", subtitle: "We'll use some recipes provided by Elixir!" },
  { type: "markdown", markdown: supervisor0 },
  { type: "title", subtitle: "What's a Supervisor?" },
  {
    type: "bullet",
    title: "What's a Supervisor?",
    bullets: [
      "A supervisor is a process which supervises other processes, which we refer to as child processes.",
      "Supervisors are used to build a hierarchical process structure called a supervision tree.",
      "Supervision trees provide fault-tolerance and encapsulate how our applications start and shutdown."
    ]
  },
  {
    type: "bullet",
    title: "What's a Supervisor?",
    bullets: [
      "Supervisors are helicopter parents that are always aware of their kids",
      "Supervisors can supervise other supervisors, creating a happy family tree",
      "This happy family trees has the rules on how to start and stop each element of the family. If needed, parents will come to the rescue and bring their child back to live"
    ]
  },
  { type: "image", style: { height: "70%" }, img: SupervisorsGif },
  { type: "title", subtitle: "How do you define the 'Reanimator'?" },
  { type: "markdown", markdown: supervisor1 },
  { type: "svg", title: "", svg: <SupervisionTree /> },
  { type: "image", style: { height: "70%" }, img: CarCrashGif },
  { type: "title", subtitle: "Now it's time to have some kids playing around" },
  {
    type: "svg",
    title: "Creating the Emoji Processor",
    svg: <EmojiProcessorSvg />
  },
  { type: "markdown", markdown: processorGenserver0 },
  {
    type: "title",
    subtitle:
      "GenServer it's another recipe focused on the way we receive / answer messages"
  },
  { type: "svg", title: "What do we have available?", svg: <GenServerTypes /> },
  { type: "markdown", markdown: processorGenserver1 },
  {
    type: "markdown",
    style: { fontSize: "3vh" },
    markdown: processorGenserver2
  },
  { type: "markdown", markdown: supervisor2 },
  { type: "svg", title: "Time to connect our worker", svg: <EmojiKotlinSvg /> },
  {
    type: "bullet",
    title: "Why?",
    bullets: [
      "Erlang provides an out of the box Java library to connect Beam VM with JVM",
      "Since everything is message passing, we can do the same with other languages",
      "Lack of a feature in Erlang / JVM easily managed thanks to message passing",
      "Kotlin has really good Java Interoperability and it's really fun to work with"
    ]
  },
  { type: "markdown", style: { alignContent: "center" }, markdown: epmd },
  { type: "markdown", markdown: supervisor3 },
  { type: "markdown", markdown: processorGenserver3 },
  { type: "markdown", markdown: worker0 },
  { type: "markdown", markdown: worker1 },
  { type: "markdown", markdown: processorGenserver4 },
  { type: "svg", title: "We are near the end!", svg: <EmojiWebsocketSvg /> },
  { type: "markdown", markdown: websocket0 },
  { type: "markdown", markdown: sender0 },
  { type: "markdown", markdown: supervisor4 },
  { type: "emoji" }
];
