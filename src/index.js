const fs = require('fs')
const request = require('request')

const markdownIt = require('markdown-it')
const emoji = require('markdown-it-emoji')
const subscript = require('markdown-it-sub')
const superscript = require('markdown-it-sup')
const footnote = require('markdown-it-footnote')
const deflist = require('markdown-it-deflist')
const abbreviation = require('markdown-it-abbr')
const insert = require('markdown-it-ins')
const mark = require('markdown-it-mark')
const tasklists = require('markdown-it-task-lists')

const markdownIntoHtml = async ({ path, url, options }) => {
    let file_content = null

    if (url) {
        file_content = await readFileFromUrl(url)
    } else if (path) {
        if (!fs.existsSync(path)) {
            throw new Error('File not found.')
        }

        file_content = await readFileFromPath(path)
    }

    if (!file_content) {
        throw new Error(`File's is empty.`)
    }

    // markdown-it options
    const md_options = {
        html: (options && options.html !== undefined) ? options.html : true,
        xhtmlOut: (options && options.xhtmlOut !== undefined) ? options.xhtmlOut : true,
        breaks: (options && options.breaks !== undefined) ? options.breaks : true,
        linkify: (options && options.linkify !== undefined) ? options.linkify : true,
        typographer: (options && options.typographer !== undefined) ? options.typographer : true,
        langPrefix: (options && options.langPrefix) || 'language-',
        quotes: (options && options.quotes) || '“”‘’',
        emoji: (options && options.emoji !== undefined) ? options.emoji : true,
        taskLists: (options && options.taskLists !== undefined) ? options.taskLists : true,
    }

    const md = new markdownIt()
        .use(subscript)
        .use(superscript)
        .use(footnote)
        .use(deflist)
        .use(abbreviation)
        .use(insert)
        .use(mark)
        .use(tasklists, { enabled: md_options.taskLists })

    if (md_options.emoji) {
        md.use(emoji)
    }

    md.set({
        html: md_options.html,
        xhtmlOut: md_options.xhtmlOut,
        breaks: md_options.breaks,
        linkify: md_options.linkify,
        typographer: md_options.typographer,
        langPrefix: md_options.langPrefix,
        quotes: md_options.quotes,
    })

    const result = md.render(file_content)

    return result
}

const readFileFromPath = path => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, { encoding: 'utf-8' }, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

const readFileFromUrl = url => {
    return new Promise((resolve, reject) => {
        request.get(url, {}, (err, res, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

module.exports = markdownIntoHtml
