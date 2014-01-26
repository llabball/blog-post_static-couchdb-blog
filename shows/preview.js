function (doc) {
	var Mustache = require('vendor/mustache')
		,	Marked = require('vendor/marked')
		, templates = this.templates
		, data = {}
		, html = ''

	if (doc) {
		Marked.setOptions({sanitize: true})

		data.title = doc.title
		data.teaser = doc.teaser
		data.publishing_date = new Date().toLocaleDateString()
		data.content = Marked(doc.markdown)
		data.rev = doc._rev
		
		html = Mustache.render(templates.post, data, {
			'uploadform': templates.uploadform
		})
	}

	return {
		code: (doc && html.length > 0) ? 200 : 404,
		headers: {'Content-Type': 'text/html'},
		body: html
	}
}