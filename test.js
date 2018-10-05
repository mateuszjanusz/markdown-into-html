const fs = require('fs')
const markdownIntoHtml = require('./src/').default

const url = 'https://raw.githubusercontent.com/mateuszjanusz/picsort/master/README.md'
const run = async () => {
    const html_content = await markdownIntoHtml({
        // path: './test.md',
        url,
    })

    fs.writeFile('./test.html', html_content, function(err) {
        if (err) {
            return console.log(err)
        }
        console.log('The file was saved!')
    })
}

run()
