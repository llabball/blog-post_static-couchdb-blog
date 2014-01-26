## static CouchDB blog

This couchapp ([CouchDB design doc](http://docs.couchdb.org/en/latest/api/design.html)) is a Boilerplate/Prototype/Experiment to investigate how the [Jekyll](http://jekyllrb.com) concept can adopted by using a CouchDB. 

The couchapp serves finally static ressources - blog posts. The static files are stored as attachments to JSON documents which representing the source code (contents in markdown) of the posts.

You may want to read the full [story](http://blog.lbl.io/post/static-websites-and-blogs-with-CouchDB). It also describes the measured performance advantages. Finally you can read the commit/tag history to review the implementation details.

## installation

You will need a CouchDB installed/hosted and one of the upload tools [couchapp](https://github.com/couchapp/couchapp) or [erica](https://github.com/benoitc/erica)

Clone the repo and enter the directory.

```sh
$ couchapp push http://admin:password@couchdbdomain:port/databasename
```
Upload the couchapp. Alternatively upload targets can be defined in the `.couchapprc` file.

The repo contains a test post doc which will uploaded automatically with the couchapp. To test the installation view `http://couchdbdomain:port/databasename/_design/staticcouchblog/_rewrite/post/test-post/preview`

Because thats a huuuge URI you may also want to enable a vhost in the local.ini.
```ini
[vhosts]
blog.domain.tld=databasename/_design/staticcouchblog/_rewrite
```

## get in touch

Feel free to open issues, comment code lines ... it's a maintained thing!