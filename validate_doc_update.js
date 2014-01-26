function (newDoc, oldDoc, userCtx, secObj) {
	var v = require('vendor/validateDocUpdateUtils').init(newDoc, oldDoc, userCtx, secObj)

	if (!userCtx.name) 
		v.unauthorized('please sign in')

	if (!v.isRole('writer') && !v.isAdmin())
		v.unauthorized('permission denied')

	if (newDoc._deleted === true)
		return
	
	var content_properties = ['markdown', 'teaser', 'title']
	for (var i = 0; i < content_properties.length; i++) {
		var prop = content_properties[i]
		v.require(prop)
		v.assert(newDoc[prop].length > 0, 'doc.markdown is empty')
	}
	
  v.require('type')
  v.matches('type', /^blogpost$/, 'doc.type must be blogpost')

  v.require('created_at')
  v.dateFormat('created_at')
  v.unchanged('created_at')

  v.require('edited_at')
  v.dateFormat('edited_at')
  v.dateAfter('created_at', 'edited_at')

  if (!newDoc.published_at) return
  v.dateFormat(newDoc.published_at)
  v.dateAfter('edited_at', 'published_at')
}