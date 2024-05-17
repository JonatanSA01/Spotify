
const clientId = 'c4bb9768aa454af2a83263208f93edca';
const redirectUri = 'http://127.0.0.1:5500/playlist.html';

const urlParams = new URLSearchParams(window.location.search);
let code = urlParams.get('code');


let codeVerifier = localStorage.getItem('code_verifier');

let body = new URLSearchParams({
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: redirectUri,
    client_id: clientId,
    code_verifier: codeVerifier,
});

const response = fetch('https://accounts.spotify.com/api/token', {
method: 'POST',
headers: {
'Content-Type': 'application/x-www-form-urlencoded'
},
body: body
})
.then (response =>{
if (!response.ok){
    throw new Error ( 'HtTP status '+ response.status);
}
return response. jon();
})
.then (data => {
localStorage.setItem('access_token', data.access_token);
gerProfile()
})
.catch(error => { 
    console.error ('Error:',error);
});

async function gerProfile(){
    let accessToken = localStorage.getItem('access_token');

    const response = await fetch('https://api.spotify.com/v1/playlists/3uRXr9ojIz2dGpOfgwyPml',{
        headers: {
            Authorization: 'Bearer' + accessToken
        }
    });
    const data = await response.json();
    console.log(data);

}