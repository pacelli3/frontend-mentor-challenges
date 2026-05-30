# Frontend Mentor - QR code component solution

This is a solution to the [QR code component challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/qr-code-component-iux_sIO_H). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Getting Started](#getting-started)
- [Overview](#overview)
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
cd frontend-mentor-challenges/qr-code-component
npm install
```

Start Vite's dev server:

```bash
npm run dev
```

This project uses [Prettier](https://prettier.io/docs/) for code formatting:

```bash
npm run prettier:fix # Format files
npm run prettier:check # List unformatted files
```

## Overview

### Screenshot

![Solution screenshot](./design/screenshot-solution-frontend-mentor-qr-code-component.png)

### Links

- Solution URL: [Check](https://www.frontendmentor.io/solutions/responsive-qr-code-component-using-vite-css-and-semantic-html-7HFkjgN0IL)
- Live Site URL: [Check](https://qr-code-component-pacelli3.netlify.app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- CSS utility classes
- Flexbox
- CSS Grid
- [Vite](https://vite.dev/) - To build and develop the project

### What I learned

This was a small and simple project consisting of a QR code component made up of an image and intructions, the most _complex_ or interesting part of it was to choose the appropiate HTML tags for the container and content, to ensure semantic correctness.

I considered the following options:

#### A. `<section>`, `<div>`, `<img>` and `<p>`

```html
<section>
    <img />
    <div>
        <h1></h1>
        <p></p>
    </div>
</section>
```

This is a _logical_ choice, because of how popular these elements are &mdash; we can group the elements using the `<section>` as the container and `<img>` and `<p>` as the children with the content; the nested `<div>` helps to style the caption.

With this combination is possible to easily give the component the correct structure, but it doesn't fully convey the meaning or purpose of the component to the user, because the `<p>` element cannot provide the caption to the `<section>` or `<img>` without the use of ARIA.

#### B. `<figure>`, `<figcaption>`, `<img>` and `<p>`

```html
<figure>
    <img />
    <figcaption>
        <h1></h1>
        <p></p>
    </figcaption>
</figure>
```

We can replace the `<section>` for a `<figure>` and the `<div>` for a `<figcaption>` to achieve the same structure, but with this combination we do more than just keeping the same layout, we can also guarantee semantic correctness, because of how the `<figure>` and `<figcaption>` elements combine together. By doing the `alt` attribute on the `<img>` should be set to an empty string because the intructions convey enough context to understand how to use the component.

The `<figure>` HTML tag represents a self-contained element, typically, used to place illustrations in the web document and with the `<figcaption>` element we can associated a caption.

The power of the `<figcaption>` is that it provides an **accessible name** to the parent `<figure>`. An accessible name is a unique and descriptive label given to a HTML element that helps users of assistive technology to understand the purpose or meaning of the element. The accessible name may be derived from the text content of the `<figcaption>` or from the `aria-label` attribute set on the element.

After the explanation, is easy to understand why this combination should be preferred due to its semantic advantage.

### Useful resources

- [`<figure>` HTML figure with optional caption element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/figure) - This helped me explore this HTML tag.
- [`<figcaption>` HTML figure caption element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/figcaption)
- [Accessible name](https://developer.mozilla.org/en-US/docs/Glossary/Accessible_name)

## Author

- Frontend Mentor - [@pacelli3](https://www.frontendmentor.io/profile/pacelli3)

## License

This project is licensed under the [MIT License](../LICENSE).
