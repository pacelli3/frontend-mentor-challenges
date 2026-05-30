# Frontend Mentor - Blog preview card solution

This is a solution to the [Blog preview card challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/blog-preview-card-ckPaj01IcS). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

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
- [Acknowledgments](#acknowledgments)
- [License](#license)

## Getting started

Clone the repo and install the dependencies:

```bash
git clone git@github.com:pacelli3/frontend-mentor-challenges.git
cd frontend-mentor-challenges/blog-preview-card
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

### The challenge

Users should be able to:

1. See the resizing of the card when decreasing or increasing the width of the window.
2. See the hover state when hovering over the card &mdash; the color of the title of the card should change

### Screenshot

![Solution screenshot](./screenshot-solution-frontend-mentor-blog-preview-card.png)

### Links

- Solution URL: [Check](https://www.frontendmentor.io/solutions/responsive-blog-preview-card-with-flexbox-and-css-grid-NwgcSfC1C4)
- Live Site URL: [Check](https://blog-preview-card-pacelli3.netlify.app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- CSS utility classes
- Flexbox
- CSS Grid
- [Vite](https://vite.dev/) - To build and develop the project

### What I learned

#### Layout and styling

This is a small and simple project consisting of building a blog preview card.

The styling and layout is in my opinion the easiest part of this project, because we can group the entire content of the card in a container and set the layout to a single column where each element will stack on top of each other. This can be easily achieved using Flexbox or CSS Grid.

Imagine this is the initial markup:

```html
<div class="container">
    <img src="path_to_illustration" alt="blog card image." />
    <p>Learning</p>
    <p>Published 21 Dec 2023</p>
    <h1>HTML & CSS foundations</h1>
    <p>
        These languages are the backbone of every website, defining structure, content, and
        presentation.
    </p>

    <div>
        <img src="path_to_img" alt="Photo of the author: Greg Hooper." />
        <p>Greg Hooper</p>
    </div>
</div>
```

Single column with Flexbox:

```css
.container {
    display: flex;
    flex-direction: column; /* This aligns everything in a single column  */
}
```

Single column with CSS Grid:

```css
.container {
    display: grid; /* Display of grid automatically aligns everything in a single column  */
}
```

After having the correct layout we can apply the styling &mdash; colors, spacing, font sizes, font family, gap, padding, margins, etc.

#### Layout shifts and accessibility

The initial markup has a few problems that affect both layout and accessibility:

1. Omitting the `height` and `width` attributes on the `<img>` elements: this could lead to the site to suffer from Cumulative Layout Shift (CLS), where users might encounter unexpected layout shifts that are not from the result of their actions. The solution is to set the attributes to the initial values an later change them with CSS
2. Setting the `alt` attribute on the banner: this illustration is used purely as decoration. It's better to set the attribute to an empty string so the `<img>` is ignored by screen readers
3. When a screen reader gets to the avatar it will announce _Photo of the author: Greg Hooper. greg hooper_ the name of the author is repeated because it appears in both `alt` attribute and the `<p>` element. It's better to set the `alt` attribute to an empty string so the `<img>` is ignored by screen readers

```html
<!-- Banner -->
<img
    class="post-img"
    src="/src/assets/images/illustration-article.svg"
    alt=""
    height="201"
    width="336"
/>

<!-- Avatar -->
<img
    class="author-avatar"
    src="/src/assets/images/image-avatar.webp"
    alt=""
    height="65"
    width="64"
/>
```

#### Semantic HTML

Using a `<div>` as the container, its convenient because it help us to group content and apply the styling, but a `<div>` is a generic container that does not convey meaningful meaning or purpose about of its content and should only be used when:

1. There is no other semantic element that is appropiate
2. Group elements to facilitate styling

We could replace the `<div>` with a `<section>` or a `<main>`, but the same problem remains &mdash; these elements are not semantically correct.

For the container I used an `<article>` element, because the component has meaning by itself, it does not need the context of the webpage. From the HTML standard:

> The article element represents a complete, or self-contained, composition in a document, page, application, or site and that is, in principle, independently distributable or reusable, e.g. in syndication. This could be a forum post, a magazine or newspaper article, a blog entry, a user-submitted comment, an interactive widget or gadget, or any other independent item of content.

I don't fully understand what all of this means, but what I understood is: whatever we put inside an `<article>` it has to make sense without context and thankfully the purpose of the card is listed as one of the examples in the definition.

A `<section>` will not work either because this is another type of generic container that should not be used when an `<article>` makes sense.

For the rest of the elements:

- Post banner: Using an `<img>` is the only choice because this represents an illustration and its meaning is not necessarily derived from the content, we only need to add the `alt` attribute.
- Badge: This is used to indicate the category of the post, here I used a `<span>` element because is more of a decorative indicator, rather than part of the content.
- Date: Here I use a nested `<time>` element, with its `datetime` attribute, inside inside a `<p>` element.
- Title: `<article>` elements should always contain a heading. I used an `<h1>`, because the card in the only content in the app, but in a real-app we should use a smaller heading, e.g. a `<h2>` or `<h3>`.
- Description: Here I used a `<p>` element. This is a straightforward choice.
- Author information: At the beginning I was tempted to use an `<address>` element but this should be used to display **contact information** of the author, but here we need to display the name and an avatar, therefore I decided to use a `<figure>` and a `<figcaption>` elements.

#### Card as an entire link or not?

Initially, after debating with DeepSeek, I decided to make the entire surface of the card as the link by using a 'stretched link', but this could end up affecting UX by accidentally triggering a page jumps.

```css
/* 'Stretched Link' CSS rule */
.card-link::after {
    content: "";
    position: absolute;
    inset: 0; /* Makes it cover the entire surface of the card (drop-shadow excluded) */
}
```

Typically, links are associated with text or buttons, but not with an entire container. At the end I decided not stretched link and instead use the the title of the card as the link.

```html
<h1>
    <a href="#">HTML & CSS foundations</a>
</h1>
```

#### Self-host fonts

Initially, I was linking the fonts from Google Fonts API using the `<link>` element:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
    href="https://fonts.googleapis.com/css2?family=Figtree:wght@500;800&display=swap"
    rel="stylesheet"
/>
```

I learned that this approach can raise privacy concerns because this could force users into sharing information they don't want and may conflict with regulations such as the European Union's General Data Protection Regulation (GDPR).

I was recommended to remove the links and instead self-host the fonts using `@font-face` in my CSS file, this enables the following advantages:

- This method protects your user's privacy since files are 100% under your domain and not from third-party requests
- This also allows you to explicitly use the woff2 font type which is the modern best practice choice for web fonts
- Could speed up loading times

```css
@font-face {
    font-display: swap;
    font-family: "Figtree";
    font-style: normal;
    font-weight: 500;
    src: url("./assets/fonts/static/figtree-v9-latin-500.woff2") format("woff2");
}

@font-face {
    font-display: swap;
    font-family: "Figtree";
    font-style: normal;
    font-weight: 800;
    src: url("./assets/fonts/static/figtree-v9-latin-800.woff2") format("woff2");
}
```

This approach can be further improved by preloading the fonts to reduce FOUT (Flash of Unstyled Text), where the fallback fonts briefly appear before the intended fonts are applied.

```html
<link
    rel="preload"
    href="/src/assets/fonts/static/figtree-v9-latin-500.woff2"
    as="font"
    type="font/woff2"
    crossorigin
/>

<link
    rel="preload"
    href="/src/assets/fonts/static/figtree-v9-latin-800.woff2"
    as="font"
    type="font/woff2"
    crossorigin
/>
```

Check the final markup at [`index.html`](./index.html).

### Useful resources

I used the following resources to dive deeper into certain HTML elements to understand their usage and capabilities:

- [`<article>` HTML article contents element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/article)
- [`<address>` HTML contact address element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/address)
- [`<div>` HTML content division element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/div)
- [`<section>` HTML generic section element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/section)
- [The article element](https://html.spec.whatwg.org/multipage/sections.html#the-article-element) - Link to the HTML specification

## Author

- Frontend Mentor - [@pacelli3](https://www.frontendmentor.io/profile/pacelli3)

## Acknowledgments

Thanks to [Elmar Chavez (@CodingWithJiro)](https://www.frontendmentor.io/profile/CodingWithJiro) for the comprehensive and detailed feedback to improve my project on areas like:

- self-host fonts,
- preventing cumulative layout shifts (CLS),
- reducing Flash of Unstyled Text (FOUT)
- responsive design,
- commentary on semantic HTML

## License

This project is licensed under the [MIT License](../LICENSE).
