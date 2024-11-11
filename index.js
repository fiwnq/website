const express = require('express')
const path = require('path')
const request = require('request');
const PORT = process.env.PORT || 5001

/*var client_id = process.env.SPOTIFY_CLIENT_ID;
var client_secret = process.env.SPOTIFY_CLIENT_SECRET;
var access_token = 'undefined';
var refresh_token = 'undefined';
var redirect_uri = 'https://jland.dev/callback';

async function refreshAccessToken() {
  if(refresh_token == 'undefined') refresh_token = access_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
    },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token,
          refresh_token = body.refresh_token || refresh_token;
      res.send({
        'access_token': access_token,
        'refresh_token': refresh_token
      });
    }
  });
}
*/
express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/projects', (req, res) => res.render('pages/projects'))
  /*.get('/recently-played', async (req, res) => {
    if (access_token == 'undefined') await refreshAccessToken();  // Ensure access token is available

    try {
      const response = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=10', {
        headers: {
          'Authorization': `Bearer ${access_token}`
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error('Error fetching recently played tracks:', error);
      res.status(500).send('Internal Server Error');
    }
  })

  .get('/login', function(req, res) {

    var state = generateRandomString(16);
    var scope = 'user-read-private user-read-currently-playing user-top-read user-read-recently-played';
  
    res.redirect('https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
      }));
  })
  
  .get('/callback', function(req, res) {

    var code = req.query.code || null;
    var state = req.query.state || null;
  
    if (state === null) {
      res.redirect('/#' +
        querystring.stringify({
          error: 'state_mismatch'
        }));
    } else {
      var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
          code: code,
          redirect_uri: redirect_uri,
          grant_type: 'authorization_code'
        },
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
        },
        json: true
      };
    }
  })
*/
  .listen(PORT, () => { 
    console.log(`Listening on ${ PORT }`);
    //refreshAccessToken();
    //setInterval(refreshAccessToken, 3500 * 1000);
  })
