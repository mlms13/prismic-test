module.exports = {
  prismic: {
    apiEndpoint: 'https://yourapiendpoint.prismic.io/api',

    // -- Access token if the Master is not open
    accessToken: 'supersecretkey',

    // OAuth
    // clientId: 'xxxxxx',
    // clientSecret: 'xxxxxx',

    // -- Links resolution rules
    linkResolver: function(ctx, doc) {
      if (doc.isBroken) return false;
      return '/documents/' + doc.id + '/' + doc.slug + (ctx.maybeRef ? '?ref=' + ctx.maybeRef : '');
    },

    // -- What to do in the event of an error from prismic.io
    onPrismicError: function(err, req, res) {
      res.send(500, "Error 500: "+err.message);
    }
  }
};