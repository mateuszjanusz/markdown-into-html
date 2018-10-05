import { existsSync, readFile } from 'fs'
import { get } from 'request'

import markdownIt from 'markdown-it'
import emoji from 'markdown-it-emoji'
import subscript from 'markdown-it-sub'
import superscript from 'markdown-it-sup'
import footnote from 'markdown-it-footnote'
import deflist from 'markdown-it-deflist'
import abbreviation from 'markdown-it-abbr'
import insert from 'markdown-it-ins'
import mark from 'markdown-it-mark'
import tasklists from 'markdown-it-task-lists'

const markdownIntoHtml = async ({ path, url, options }) => {
    let file_content = null

    if (url) {
        file_content = await readFileFromUrl(url)
    } else if (path) {
        if (!existsSync(path)) {
            throw new Error('File not found.')
        }

        file_content = await readFileFromPath(path)
    }

    if (!file_content) {
        throw new Error(`File's is empty.`)
    }

    // markdown-it options
    const md_options = {
        html: (options && options.html) || true,
        xhtmlOut: (options && options.xhtmlOut) || true,
        breaks: (options && options.breaks) || true,
        linkify: (options && options.linkify) || true,
        typographer: (options && options.typographer) || true,
        langPrefix: (options && options.langPrefix) || 'language-',
        quotes: (options && options.quotes) || '“”‘’',
        emoji: (options && options.emoji) || true,
        taskLists: (options && options.taskLists) || true,
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
        readFile(path, { encoding: 'utf-8' }, (err, data) => {
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
        get(url, {}, (err, res, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

export default markdownIntoHtml
