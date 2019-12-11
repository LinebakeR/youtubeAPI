const discoveryDocs = ['https://people.googleapis.com/$discovery/rest?version=v1'];
const scopes = 'https://www.googleapis.com/auth/youtube.readonly';
const apiKey = 'AIzaSyAiekQd1zCztDr6vEsW5bYIYT26MmFJ5i8';

//LOAD THE API CLIENT
export const loadClient = () =>
  new Promise((resolve, reject) => window.gapi.load('client:auth2', err => (err ? reject() : resolve())));

//INIT CONNEXION TO YOUTUBE API AND SET THE APIKEY
export const initClient = async () => {
  await window.gapi.client.init({
    clientId: '568890925993-1vgd0a6g7iabongc0l0s6d1jrq14g8ps.apps.googleusercontent.com',
    discoveryDocs: discoveryDocs,
    scope: scopes,
  });
  window.gapi.client.setApiKey(apiKey);
  return window.gapi.client.load('https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest');
};

//EXTRACT USER DATA FROM REQUEST METHOD (GET) IN OBJECT USER
export const getUser = async () => {
  const {
    result: {
      items: [user],
    },
  } = await window.gapi.client.request({
    method: 'GET',
    path: '/youtube/v3/channels',
    params: {
      part: 'snippet,contentDetails,statistics,id ',
      mine: 'true',
    },
  });
  console.log('USER', user);
  return user;
};
