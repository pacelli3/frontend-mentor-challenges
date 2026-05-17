# Project Improvements

## Card as an entire link

### The problem

Initially, I _made_ the entire surface of the card as a link by using a 'stretched link', but this might end up confusing the users by accidentally triggering a link jump.

```css
/* 'Stretched Link' CSS rule */
.card-link::after {
    content: "";
    position: absolute;
    inset: 0; /* Makes it cover the entire surface of the card (drop-shadow excluded) */
}
```

### The solution

Typically, links are associated with text or buttons, but not with an entire container.

To improve UX, I removed the CSS rule for the stretched link to _turn_ the title into the link. This also affects the hover state &mdash; the color of the text only changes when the title is explicitly hovered.

## Self-host fonts

### The problem

Initially, I was linking the fonts from Google Fonts API using the `<link>` in the HTML:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
    href="https://fonts.googleapis.com/css2?family=Figtree:wght@500;800&display=swap"
    rel="stylesheet"
/>
```

This can raise privacy concerns and may conflict with regulations such as the European Union's General Data Protection Regulation (GDPR).

### The solution

I was recommended to remove the links to Google Fonts API and instead self-host the fonts using `@font-face` in my CSS file, this enables the following advantages:

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

This solution can be further improved by preloading the fonts used above to reduce FOUT (Flash of Unstyled Text), where the fallback fonts briefly appear before the intended fonts are applied.

These are placed before the link to the CSS file:

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

## Layout shifts and accessibility

### The problem

These are the initial design of my images:

```html
<!-- Banner -->
<img class="post-img" src="/src/assets/images/illustration-article.svg" alt="blog card image." />

<!-- Avatar -->
<img
    class="author-avatar"
    src="/src/assets/images/image-avatar.webp"
    alt="Photo of the author: Greg Hooper."
/>
```

This design causes a few problems that affect both layout and accessibility:

1. I omitted setting the `height` and `width` attributes on the `<img>` elements, this could lead to the site to suffer from Cumulative Layout Shift (CLS), where users might encounter unexpected layout shifts that are not from the result of their actions.
2. The banner is used exclusively for decoration, in other words, it has no relationship with the content
3. When a screen reader gets to the `<figure>` it will read _figure graphic photo of author greg hooper, caption greg hooper_, the name of the author is repeated because I used both `alt` attribute and the `<figcaption>` element

### The solution

1. Set the `height` and `width` attributes to the original values of the images provided in the Figma design.
2. Set `alt` attribute to an empty string so it's ignore by the screen reader
3. Set `alt` attribute to an empty string so it's ignore by the screen reader

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

## Site responsiveness

I was setting a `min-width` on the `.container` and `.card` CSS rules, this resulted in horizontal scrolling when reaching the minimum size allowed for the card. This resulted in an unnecesarry minimum width for the container becuase there was no way to reach it.

I remove the `min-width` on CSS rules to make the card responsive.
