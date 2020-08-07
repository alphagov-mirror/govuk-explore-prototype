const express = require('express')
const router = express.Router()

const request = require('request');
// Add your routes here - above the module.exports line

const BASE_URL = "https://govuk-explore-api-p1.herokuapp.com/"

router.get('/browse/:topicSlug', function (req, res) {
  topicSlug = req.params.topicSlug

  request(BASE_URL + "browse/" + topicSlug, { json: true }, (error, result, body) => {
    res.render('topic', body)
  })
})

router.get('/*', function(req,res) {
  //modify the url in any way you want
  var newurl = 'https://www.gov.uk/' + req.path;
  request(newurl).pipe(res);
});

module.exports = router
