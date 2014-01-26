function (doc, req) {
	var rev = req.query.rev
		,	html = req.body
		,	resp = {}
		, error = false
		, newdoc

	if(!rev) {
		error = true
		resp.code = 412
		resp.body = {error: 'no_revision', reason: 'missing rev query param'}
	}
	if(!doc) {
		error = true
		resp.code = 404
		resp.body = {error: 'not_found', reason: 'missing'}
	}
	if(!html || html.length < 1) {
		error = true
		resp.code = 412
		resp.body = {error: 'not_data', reason: 'missing HTML content'}
	}

	if(!error) {
		newdoc = doc
		newdoc.publish_at = new Date().toISOString()
		newdoc._rev = rev
		newdoc._attachments = newdoc._attachments || {}
		newdoc._attachments['static.html'] = {
      'content_type':'text\/html',
      'data': html
    }

		resp.code = 202
		resp.body = {stat: 'ok', reason: 'Post successfully published. Visit /post/' + doc._id}
	} else {
		newdoc = null
	}
	
	resp.body = JSON.stringify(resp.body)

	return [newdoc, resp]
}