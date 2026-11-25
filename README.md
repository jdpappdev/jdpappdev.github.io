# Jade Polo Portfolio

A static portfolio presenting Jade Polo's work in project coordination, web development, creative production, and research. It is built with HTML, CSS, and JavaScript and is published at [jade-polo-portfolio.netlify.app](https://jade-polo-portfolio.netlify.app/).

## What the site includes

| Area | What visitors can explore |
| --- | --- |
| [Home](index.html) and [About](about/index.html) | An introduction, work areas, and background. |
| [Coordination](virtual-assistance-project-coordination/index.html) | Project support examples and an editable practice tracker. |
| [Developer projects](developer-projects/index.html) | Project summaries, briefs, source links, and live demos. |
| [Creative projects](creative-projects/index.html) | Creative work, project briefs, and image comparisons. |
| [Research and content](research-content/index.html) | Research, writing, and documentation work. |
| [Contact](contact/index.html) | Contact links, a downloadable CV, and an email-app contact form. |

Project briefs open on their respective pages. Practice tracker edits are saved in the visitor's browser. The contact form prepares an email in the visitor's email application; it does not send a message from the site.

## Repository layout

```text
.
├── index.html                                Homepage
├── about/                                   About page
├── virtual-assistance-project-coordination/ Coordination page and tracker
├── developer-projects/                     Developer project page
├── creative-projects/                      Creative project page
├── research-content/                       Research and content page
├── contact/                                Contact page
├── assets/                                 Styles, images, animation data, and CV
├── scripts/                                Page behavior and project brief data
├── preview-server.cjs                      Local preview server
└── AGENTS.md                               Repository workflow guidance
```

Each page has its own `index.html`, giving it a clean URL when served from the site root. Public assets stay in `assets/` so the URLs used by the published site remain stable.
