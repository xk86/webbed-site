# some projects cat has done

## pixelplant
[pixelplant](https://xk86.github.io/pixelplant/) is a really simple UI for an [L-system](https://en.wikipedia.org/wiki/L-system) based pixel art plant maker.
The UI is very clunky and thrown together, but it is a fully-functional, hand-written L-system plant generator.
Future ideas are mostly focused around making the UI nicer and more intuitive, since how the rules are defined and used is currently not very user-friendly.
Specifically, I'd like to add a "drag-and-drop" ability for making and stringing together rules, as I feel this would be much more intuitive than writing the abstract characters out as is currently done.
It's structured to provide users with a set fixed operations they can assign with values to labeled rules.
As such, even though it is very clunky, it is fully-featured and allows for a fairly wide range of expression.

It supports a few neat (in my opinion) features:
- Probabilistic rules (rules that trigger a certain percentage of the time)
- Operations that let you change the color (this is how I've implemented the red flowers you see on the default plant when you load the page)
- Rule import/export for sharing creations
- Live redrawing as you update rules and components

## Stacky (Not Released- CS50x Final Project)
An incomplete stack machine emulator that tries to emulate the abstract [SECD machine](https://en.wikipedia.org/wiki/SECD_machine).
It's incomplete as it only implements the S and the C parts, effectively making it more of a calculator than a computer.
It is written in C and features a handwritten parser, object memory management, an interactive REPL.
Because my main motivation for doing this was to learn more about parsers and making virtual machines, there are also some features for inspecting the state of the machine.
You can print the contents of the system's memory and see where in the stack processing is happening.

## This Website
Not terribly impressive as of right now, but I'm using [11ty](https://11ty.dev) for static site generation, and hosting on GitHub Pages.
One idea I have for the site is to include generated plants from my pixelplant project on the bottom of the main page.

## Secret Language Model Project
I am collaborating with [Madi](https://madi.pizza) to make a GPT-style language model that runs in highly constrained environments (no accelerated operations).
It is currently unreleased, but it *does* learn!
We have an entire custom tensor math library that was made for this purpose, complete with a functioning autodiff engine.
We also implement Grouped Query Attention, and have a full training pipeline that runs and learns.
My contributions to the project have been in testing and bug fixing, as well as helping architect the project.
I also wrote the training pipeline and tokenizer we use currently, which are both very simplified to what they will be in the public release.