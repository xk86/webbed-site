---
layout: main.webc
title: Cat's Projects
eleventyNavigation:
  key: Projects
  order: 3
---

# some projects cat has done

like i said on my about page, i've done some things. here are some of the things i've done

## Halupedia (Local Fork)
I forked the viral [Halupedia](https://halupedia.com) and made it entirely locally-hosted!
You can view the code on my GitHub [here](https://github.com/xk86/halupedia).
I've added a TON of features versus the original, and also guided the design more towards alt-history/alt-world worldbuilding canon design, including:
  - all LLM calls are configurable to be local; I use ollama in my own config.
  - all data is stored locally
  - images (in a different way than were implemented upstream) (feats. by Madi):
    - template-based image generation and auto-selection for new articles (Madi)
    - upload user specified image/provide url
    - multimodal understanding (if model supports; otherwise fallback to one that does) for image captioning
    - non-local openai-backed image generation + rejection prediction (Madi)
  - custom multiple-host role/capacity based model call dispatch/queue management
  - article generation traces/queues
  - RAG for article generation that RAGs all of the articles on the site, allowing canon to persist
  - a facts-based ontology system with auto-extraction of information from articles into a more dense table, to improve semantic density during generation
  - themeable client!
  - auto-generating "Did you know..." facts for the front page
  - article editing and rewrite system that lets you:
    - edit the raw markdown
    - edit the article/a section of it based on a prompt (eg, "change 'dog' to 'cat' and give her a cool car")
    - preserve/rollback article history
    - set a "vibe" for the article of basic information that should be kept in mind when writing the article and preserved across edits
  - the ability to highlight any text in the article and turn it into a new article!
  - a complete rewrite of the client to use shadcn/ui components (which enabled some of the above features!)

All of my code additions were vibecoded (I mean, how else could I add tens of thousands of lines of code in just a couple of months), so I would *not* run this exposed to the internet, and indeed, it was not designed to be.
Additionally, due to using sqlite (and no doubt some inefficient code), it does not scale particularly well.
Future iteration will probably see me shift to using a bit more standard self-hosted containerized infrastructure for things like LLM routing, traces, and storage backends.

## Angl

I'm working with my friend [Koii](https://www.koiib.com/) to help people share analog memories with [Angl](https://myangl.com) Pop-up Picture Frame Greeting Cards!
- Took her original designs from Figma and created customizable CAD files to enable us to make any size frame for any size object down the line.
- Prototyped new designs using the CAD file in preparation for manufacturing.
- Helped put together an event pitch deck for future event pop-ups.
- Configured eCommerce platform to actually take sales.

## This Website

Not terribly impressive as of right now, but I'm using [11ty](https://11ty.dev) for static site generation, and hosting on GitHub Pages.
One idea I have for the site is to include generated plants from my pixelplant project on the bottom of the main page.

## Secret Language Model Project

I collaborated with [Madi](https://madi.pizza) to make a GPT-style language model that runs in highly constrained environments (no accelerated operations).
It is currently unreleased, but it _does_ learn!
We have an entire custom tensor math library that was made for this purpose, complete with a semi-functioning autodiff engine.
We also implement Grouped Query Attention, and have a full training pipeline that runs and learns.
My contributions to the project have been in testing and bug fixing, as well as helping architect the project.
I also wrote the training pipeline and tokenizer we use currently, which are both very simplified to what they will be in the public release.

## pixelplant

[pixelplant](https://xk86.github.io/pixelplant/) is a really simple UI for an [L-system](https://en.wikipedia.org/wiki/L-system) based pixel art plant maker.
The UI is very clunky and thrown together, but it is a fully-functional, hand-written L-system plant generator.
Future ideas are mostly focused around making the UI nicer and more intuitive, since how the rules are defined and used is currently not very user-friendly.
I made it as a last-minute entry to itch.io's ToolJam 2, where it placed 28/108 entries (no doubt due to its exceptionally user-hostile interface).
Specifically, I'd like to add a "drag-and-drop" ability for making and stringing together rules, as I feel this would be much more intuitive than writing the abstract characters out as is currently done.
It's structured to provide users with a set fixed operations they can assign with values to labeled rules.
As such, even though it is very clunky, it is fully-featured and allows for a fairly wide range of expression.

It supports a few neat (in my opinion) features:

- Probabilistic rules (rules that trigger a certain percentage of the time)
- Operations that let you change the color (this is how I've implemented the red flowers you see on the default plant when you load the page)
- Rule import/export for sharing creations
- Live redrawing as you update rules and components

I am slowly working on updates for it which will be substantially more easy to use without having to read a whitepaper before making things.

## Miscellany
This section is for various ideas, incomplete works, concepts, and other random nonsense that I want to get out of my head and on to hypertext.

### Stacky (Not Released- CS50x Final Project)

An incomplete stack machine emulator that tries to emulate the abstract [SECD machine](https://en.wikipedia.org/wiki/SECD_machine).
It's incomplete as it only implements the S and the C parts, effectively making it more of a calculator than a computer.
It is written in C and features a handwritten parser, object memory management, an interactive REPL.
Because my main motivation for doing this was to learn more about parsers and making virtual machines, there are also some features for inspecting the state of the machine.
You can print the contents of the system's memory and see where in the stack processing is happening.


### Other
  - Developing a system to subject AI agents to the pressures and experiences of capitalism by charging them for their context windows and letting them gamble.
  - using Open WebUI with knowledge bases full of:
    - terrible AO3 fics.
    - oil well drilling manuals and guides
    - medical journal articles about uncomfortable subjects
    - the entire [*Principia Discordia*](https://principiadiscordia.com/)
    - several randomly selected arXiv papers on language model self-improvement
  File this one under: immanentizing the slop-schaton
  - I hacked up an svg composing mcp server but i have yet to publish that one oops