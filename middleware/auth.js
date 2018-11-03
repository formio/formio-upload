const request = require('request');
module.exports = function authenticate(req, res, next) {
  req.debug('Authenticating');
  // Require an auth token to get the file.
  if (req.method === 'GET' && !req.query.token) {
    return res.status(401).send('Unauthorized');
  }

  if (req.query.token) {
    request.get({
      url: `${req.query.baseUrl}/form/${req.query.form}/submission/${req.query.submission}`,
      json: true,
      qs: {token: req.query.token}
    }, (err, response, body) => {
      if (err) {
        return next(err);
      }
      if (!body._id) {
        return res.status(401).send('Unauthorized');
      }

      // We are able to load the submission, so we are authenticated to download this file.
      return next();
    });
  }
  else if (req.method === 'POST') {
    if (!req.query.form || !req.query.baseUrl) {
      return next('Form not found.');
    }

    // Perform a fake submission to see if we can upload.
    request.post({
      url: `${req.query.baseUrl}/form/${req.query.form}/submission`,
      json: true,
      qs: { dryrun: 1 },
      headers: {
        'x-jwt-token': req.headers['x-jwt-token']
      }
    }, (err, response) => {
      if (err) {
        return next(err);
      }

      if (response.statusCode !== 200) {
        return res.sendStatus(response.statusCode);
      }

      // If we could submit the form, then we are allowed to upload the file.
      return next();
    });
  }
  else {
    // Everything else is unauthorized.
    return res.status(401).send('Unauthorized');
  }
};