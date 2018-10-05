# markdown-to-html

> Transform Markdown to HTML

## Features

-   Transforms local files and files from URL
-   Uses [markdown-it](https://github.com/markdown-it/markdown-it) to convert from Markdown to HTML
-   Configurable, check list of [options](#Options)
-   Supports:
    -   tables
    -   HTML tags
    -   links
    -   emojis
    -   task lists
    -   footnotes
    -   abbreviations
    -   definition lists
    -   `<ins>` tags
    -   superscripts
    -   subscripts
    -   qoutes, styling and more

## Installation

With yarn:

```
yarn add markdown-to-html
```

With npm:

```
npm install markdown-to-html
```

## Usage

```javascript
const markdownToHtml = require('markdown-to-html')

// Local file
const html_code = await markdownToHtml({
    path: './myMarkdownFile.md',
})

// URL source
const html_code = await markdownToHtml({
    url: 'https://raw.githubusercontent.com/mateuszjanusz/markdown-to-html/master/README.md',
})

// Using options:
const html_code = await markdownToHtml({
    path: './myMarkdownFile.md',
    options: {
        emoji: false, // disabling emojis
    },
})
```

## Properties

| Prop                | Type   | Description                                                    |
| ------------------- | ------ | -------------------------------------------------------------- |
| path                | String | The location of a file to transform                            |
| url                 | String | The URL source of a file to transform                          |
| [options](#Options) | Object | Rules and options, check the table below for available options |

## Options

By default all rules are enabled, but can be restricted by options.

| Option      | Type    | Default     | Describe                                                                                                     |
| ----------- | ------- | ----------- | ------------------------------------------------------------------------------------------------------------ |
| html        | Boolean | `true`      | Enable HTML tags in source                                                                                   |
| xhtmlOut    | Boolean | `true`      | Close single tags with '/' (e.g. `<br />`)                                                                   |
| breaks      | Boolean | `true`      | Autoconvert '\n' in paragraphs to `<br>`                                                                     |
| linkify     | Boolean | `true`      | Autoconvert URL-like text to link                                                                            |
| emoji       | Boolean | `true`      | Enable Emoji syntax plugin and support emoticons shortcuts                                                   |
| typographer | Boolean | `true`      | Enable some language-neutral replacement and quotes beautification                                           |
| langPrefix  | String  | `language-` | CSS language prefix for fenced blocks                                                                        |
| quotes      | String  | `“”‘’`      | Double + single quotes replacement pairs, e.g. use `«»„“` for Russian, `“”‘’` for Chinese, `„“‚‘` for German |
| taskLists   | Boolean | `true`      | enable task/todo lists with items starting with [ ] or [x]                                                   |

## License

MIT

## References

-   [markdown-it](https://github.com/markdown-it/markdown-it)
