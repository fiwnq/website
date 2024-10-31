const express = require('express')
const path = require('path')

const PORT = process.env.PORT || 5001

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/callback', function(req, res) {

    var code = req.query.code || null;
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
  )
  .get('/recently-played', async (req, res) => {
    const accessToken = process.env.SPOTIFY_ACCESS_TOKEN;
    try {
        const response = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=10', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
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
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
