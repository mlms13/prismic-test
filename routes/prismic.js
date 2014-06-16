var prismic = require('../prismic-helpers'),
    router  = require('express').Router();

router.get('/', prismic.route(function (req, res, ctx) {
  ctx.api.form('everything').set("page", req.param('page') || "1").ref(ctx.ref).submit(function(err, docs) {
    if (err) { prismic.onPrismicError(err, req, res); return; }
    res.render('index', {
      docs: docs
    });
  });
}));

router.get('/:documents/:id/:slug', prismic.route(function (req, res, ctx) {
  prismic.getDocument(ctx, req.params.id, req.params.slug, function (err, doc) {
    if (err) { prismic.onPrismicError(err, req, res); return; }
    res.render('detail', {
      doc: doc
    });
  }, function(doc) {
    res.redirect(301, ctx.linkResolver(ctx, doc));
  }, function(NOT_FOUND) {
    res.send(404, 'Sorry, we cannot find that!');
  });
}));

module.exports = router;