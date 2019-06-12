import React from "react";
import EmojiKotlinSvg from "svg-react-loader?name=Icon!./content/emoji_kotlin.svg";
import EmojiProcessorSvg from "svg-react-loader?name=Icon!./content/emoji_processor.svg";
import EmojiSupervisorSvg from "svg-react-loader?name=Icon!./content/emoji_supervisor.svg";
import EmojiWebsocketSvg from "svg-react-loader?name=Icon!./content/emoji_websocket.svg";
import GenServerTypes from "svg-react-loader?name=Icon!./content/genserver_types.svg";
import SupervisionTree from "svg-react-loader?name=Icon!./content/supervision_tree.svg";
import CarCrashGif from "./content/car_crash.gif";
import SupervisorsGif from "./content/supervisors.gif";
import {
  processorGenserver0,
  processorGenserver1,
  processorGenserver2,
  processorGenserver3,
  processorGenserver4,
  projectCreate,
  sender0,
  sender1,
  sender2,
  supervisor0,
  supervisor1,
  supervisor2,
  supervisor3,
  supervisor4,
  websocket0,
  worker0,
  worker1,
  worker2
} from "./content/code";

const slides = [
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
    title: "Why Elixir?",
    bullets: ["Functional", "Reliable", "Concurrent", "Scalable"]
  },
  {
    type: "bullet",
    title: "What will we do?",
    bullets: [
      "Create an Elixir application",
      "Connect it to Kotlin",
      "Send information to a Web Client",
      "Take a picture with every pixel replaced by a 😄",
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
  {
    type: "title",
    subtitle: "We'll use recipes provided by Erlang/Elixir!"
  },
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
      "Supervisors are helicopter bosses that are always aware of their workers",
      "Supervisors can supervise other supervisors, creating a tree",
      "This tree controls the rules on how to start and stop each worker. If needed, parents will come to the rescue and bring their worker back to live"
    ]
  },
  { type: "image", style: { height: "70%" }, img: SupervisorsGif },
  { type: "title", subtitle: "How do you define the 'Reanimator'?" },
  {
    type: "markdown",
    style: { alignContent: "center" },
    markdown: supervisor1
  },
  { type: "svg", title: "", svg: <SupervisionTree /> },
  {
    type: "title",
    subtitle: 'This is why Erlang follows a mentality called "Let It Crash"'
  },
  { type: "image", style: { height: "70%" }, img: CarCrashGif },
  {
    type: "title",
    subtitle: "Now we need to create the workers that will be supervised"
  },
  {
    type: "svg",
    title: "Creating the Emoji Processor",
    svg: <EmojiProcessorSvg />
  },
  {
    type: "title",
    subtitle:
      "Lets use the GenServer behaviour which focuses on how we receive / answer messages"
  },
  { type: "markdown", markdown: processorGenserver0 },
  { type: "svg", title: "What do we have available?", svg: <GenServerTypes /> },
  { type: "markdown", markdown: processorGenserver1 },
  {
    type: "markdown",
    style: { fontSize: "3vh" },
    markdown: processorGenserver2
  },
  { type: "markdown", markdown: supervisor2 },
  {
    type: "svg",
    title: "Time to connect our workers",
    svg: <EmojiKotlinSvg />
  },
  {
    type: "bullet",
    title: "Why Kotlin in the middle of this?",
    bullets: [
      "Just another available protocol at your disposal",
      "Erlang provides a Java library to connect it to an Erlang Cluster like an Erlang Node",
      "Since everything is message passing, we can do the same with other languages",
      "Lack of a feature in Erlang / JVM easily managed thanks to message passing"
    ]
  },
  { type: "markdown", markdown: supervisor3 },
  { type: "markdown", markdown: processorGenserver3 },
  { type: "markdown", markdown: worker0 },
  { type: "markdown", style: { fontSize: "3.9vh" }, markdown: worker1 },
  { type: "markdown", markdown: worker2 },
  { type: "markdown", markdown: processorGenserver4 },
  { type: "svg", title: "We are near the end!", svg: <EmojiWebsocketSvg /> },
  { type: "markdown", style: { fontSize: "3.4vh" }, markdown: websocket0 },
  { type: "markdown", style: { fontSize: "3.4vh" }, markdown: sender0 },
  { type: "markdown", markdown: sender1 },
  { type: "markdown", markdown: sender2 },
  { type: "markdown", markdown: supervisor4 },
  { type: "emoji" },
  { type: "screenSize" },
  {
    type: "title",
    title: "Thank you!",
    subtitle: "Questions?"
  }
];

export default slides;