const fs = require('fs')
const markdownFile = require('./')

// const url = 'https://raw.githubusercontent.com/mateuszjanusz/picsort/master/README.md'
const url = 'https://raw.githubusercontent.com/starshellhq/vue-markdown2/master/README.md'
const run = async () => {
	const html_content = await markdownFile({
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
