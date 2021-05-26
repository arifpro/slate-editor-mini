# [Slate Editor Mini](https://slate-editor-mini.netlify.app) &middot; [![Author Arif](https://img.shields.io/badge/Author-Arif-%3C%3E)](https://www.linkedin.com/in/proarif)

This is a ReactJs app about slate custom editor for assignment purpose.

## A custom Slate editor with the following features

- A toolbar at the top with the standard rich text (​`https://www.slatejs.org/#/rich-text`)
- Images:
  - Image linking toolbar (`​https://www.slatejs.org/#/images`)
  - Image upload with button in toolbar, when clicked shows a file browser.
    - Support only valid image file formats
- Lists:
  - Ordered and unordered lists with tab support (e.g. tabbing an unordered or ordered list will indent it up to 3 levels. E.g:
    - Level 2 
    - Level 3
  - Support for Shift + Tab (goes down a tab indent level)
- Save/Cancel functionality
  - Save - stores new new editor content
  - Cancel - restores to the old saved content
- A configurable limit on the number of top-level block nodes in the editor, also support
`unlimited` by default. Grey out / prevent the save functionality if the number of block nodes is greater than the limit.
- Store the editor content and images uploaded in browser localStorage.

## Tech/framework used

- ReactJs
- Slate
- HTML
- SCSS
- JavaScript
- ES6
- React Icons
- Netlify Hosting

## Deployment

This website is deployed on Heroku. [Click here](https://slate-editor-mini.netlify.app) to visit.

You can also go directly this link: `https://slate-editor-mini.netlify.app`

## Run locally

Install dependency
> yarn

Run
> yarn start

Then hit http://localhost:3000

## Configure Block Limit

**Line 106:** `src/components/HomePage/CustomSlateEditor.jsx`

## Screenshot

![homepage](https://raw.githubusercontent.com/arifpro/slate-editor-mini/main/screenshot/home.png)
