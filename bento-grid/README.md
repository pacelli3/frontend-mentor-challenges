# Frontend Mentor - Bento grid solution

This is a solution to the [Bento grid challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/bento-grid-RMydElrlOj). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Getting Started](#getting-started)
- [Overview](#overview)
    - [The challenge](#the-challenge)
    - [Screenshot](#screenshot)
    - [Links](#links)
- [My process](#my-process)
    - [Built with](#built-with)
    - [What I learned](#what-i-learned)
    - [Useful resources](#useful-resources)
- [Author](#author)
- [License](#license)

## Getting started

Clone the repo and install the dependencies:

```bash
git clone git@github.com:pacelli3/frontend-mentor-challenges.git
cd frontend-mentor-challenges/bento-grid
npm install
```

Start Vite's dev server:

```bash
npm run dev
```

This project is configured for deployment on Netlify, I recommend installing Netlify CLI to build and serve locally to test the app before deploying:

```bash
npm install -g netlify-cli
```

Build and serve the app:

```bash
npm start
```

Lastly, Prettier is used for code formatting:

```bash
npm run prettier:fix # Format files
npm run prettier:check # List unformatted files
```

## Overview

### The challenge

Your challenge is to build out this bento grid and get it looking as close to the design as possible.

You can use any tools you like to help you complete the challenge. So if you've got something you'd like to practice, feel free to give it a go.

Your users should be able to:

- View the optimal layout for the interface depending on their device's screen size

### Screenshot

![Solution screenshot](./design/screenshot-solution-frontend-bento-grid.png)

### Links

- Solution URL: [Check]()
- Live Site URL: [Check]()

## My process

### Built with

- Semantic HTML5 markup
- Tailwind CSS
- CSS Grid
- Vite - To build and develop the project
- PerfectPixel by WellDoneCode (pixel perfect) - useful for those who don't have figma files
- Netlify - hosting platform
- Prettier - code formatting

### What I learned

#### `grid-template-areas` in TailwindCSS

Tailwind does not include native utility classes for the `grid-template-areas` and `grid-areas` CSS properties, but is possible to define them using Tailwind's arbitrary syntax to avoid modifying the project configuration.

The syntax is as follow:

- Define the arbitrary property inside brackets (`[]`)
- Use underscores (`_`) for blank spaces
- No blank space after the colon (`:`)

Example:

```html
<div class="grid [grid-template-areas:'one_two''three_four']">
    <div class="[grid-area:one]"></div>
    <div class="[grid-area:two]"></div>
    <div class="[grid-area:three]"></div>
    <div class="[grid-area:four]"></div>
</div>
```

### Useful resources

I used the following resources to help me with this design:

- [NVDA](https://www.nvaccess.org/)
- [Prettier](https://prettier.io/docs/)
- [Vite](https://vite.dev/)
- [PerfectPixel by WellDoneCode (pixel perfect)](https://www.welldonecode.com/perfectpixel/)
- [Get started with Tailwind CSS](https://tailwindcss.com/docs/installation/using-vite)
- [CSS grid layout](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout)
- [The Bento Grid Principle](https://medium.com/@jedbrown99/the-bento-grid-principle-2427c95adc40)
- [`overflow: clip`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/overflow#clip)

## Author

- Frontend Mentor - [@pacelli3](https://www.frontendmentor.io/profile/pacelli3)

## License

This project is licensed under the [MIT License](../LICENSE).
