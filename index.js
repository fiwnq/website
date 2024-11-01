const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5001

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;
let accessToken = refreshToken;

async function refreshAccessToken() {
  const authOptions = {
      method: 'POST',
      headers: {
          'Authorization': 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64'),
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: refreshToken
      })
  };

  try {
      const response = await fetch('https://accounts.spotify.com/api/token', authOptions);
      const data = await response.json();
      accessToken = data.access_token;
      console.log('Access token refreshed:', accessToken);
  } catch (error) {
      console.error('Error refreshing access token:', error);
  }
}

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/recently-played', async (req, res) => {
    if (!accessToken) await refreshAccessToken();  // Ensure access token is available

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
  .listen(PORT, () => { 
    console.log(`Listening on ${ PORT }`);
    refreshAccessToken();
    setInterval(refreshAccessToken, 3500 * 1000);
  })
