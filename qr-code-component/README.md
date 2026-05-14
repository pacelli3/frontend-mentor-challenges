# Frontend Mentor - QR code component solution

This is a solution to the [QR code component challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/qr-code-component-iux_sIO_H). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
    - [Screenshot](#screenshot)
    - [Links](#links)
- [My process](#my-process)
    - [Built with](#built-with)
    - [What I learned](#what-i-learned)
    - [Useful resources](#useful-resources)
- [Author](#author)
- [License](#license)

## Overview

### Screenshot

![Solution screenshot](./design/screenshot-solution-frontend-mentor-qr-code-component.png)

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

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

We can replace the `<section>` for a `<figure>` and the `<div>` for a `<figcaption>` to achieve the same structure, but with this combination we do more than just keeping the same layout, we can also guarantee the best semantic correctness, because of how the `<figure>` and `<figcaption>` elements combine together.

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
