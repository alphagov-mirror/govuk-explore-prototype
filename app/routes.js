const express = require('express')
const router = express.Router()

const request = require('request');
// Add your routes here - above the module.exports line

router.get('/topics/:topicSlug', function (req, res) {
  topicSlug = req.params.topicSlug

  request("https://www.gov.uk/api/content/browse/" + topicSlug, { json: true }, (error, result, body) => {

    tp = body.links.children
    console.log(tp)

    topics = tp.map(function(topic) {
      return {
        heading: { text: topic.title },
        content: { html: "<p class='govuk-body'>" + topic.description + "</p>" }
      }
    })

    res.render('topic', { topicSlug: topicSlug, topics: topics })
  })
})

router.get('/*', function(req,res) {
  //modify the url in any way you want
  var newurl = 'https://www.gov.uk/' + req.path;
  request(newurl).pipe(res);
});

module.exports = router
