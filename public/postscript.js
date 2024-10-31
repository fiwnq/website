document.addEventListener('DOMContentLoaded', function() {
    fetch('/recently-played')
        .then(response => response.json())
        .then(data => {
            const tracks = data.items.map(track => `${track.track.name} by ${track.track.artists.map(artist => artist.name).join(", ")}`);
            document.getElementById('recently-played').innerHTML = tracks.join('<br>');
        })
        .catch(error => console.error('Error fetching recently played tracks:', error));
});