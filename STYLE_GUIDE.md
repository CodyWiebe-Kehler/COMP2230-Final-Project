# Style Guide

## Colour choices and handling

### Colour handling

- all colours should be accessed via the colour variables defined in template.css
- this can be done with the following line at the start of your seperate css file, and then using var(--colour-variable-name) as normal
- there are currently 4 colour variables defined

  - --background-colour: for the man background of the website

  - --text-colour: the colour for text

  - --text-on-colour: the colour for the background of text sections. used to help differentiate these text sections from the main page, and helps with text readability. One example is the background colour on a form.

  - --accent-colour: The PiXELL River financial blue, used for decorative details

- The --dark and --light variables should not be accessed directly, as that overrides the theme changing functionality

### Colour Choices
- our colour choices were made with the idea of a light and dark mode in mind. As such we have 2 sets of colours for everything, and those are changed with javascript.

- we made use of the PiXELL-River Financial colour scheme by implementing the PiXELL-River blue as our accent colour.