const pokeUrl = 'https://pokeapi.co/api/v2/pokemon/';
const baseUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/i9ViDXj1rEqPZZirEc18';

export const getPoke = async () => {
  const getResult = await fetch(`${pokeUrl}?offset=0&limit=9`);
  const json = await getResult.json();
  return json.results;
};

export const getLikes = async () => {
  const getResult = await fetch(`${baseUrl}/likes`);
  const json = await getResult.json();
  return json;
};

export const postLikes = async (itemId) => {
  await fetch(`${baseUrl}/likes`, {
    method: 'POST',
    body: JSON.stringify(itemId),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
};

export const getComments = async (id) => {
  const getResult = await fetch(`${baseUrl}/comments?item_id=${id}`);
  const json = await getResult.json();
  return json;
};

export const postComments = async (commentBody) => {
  await fetch(`${baseUrl}/comments`, {
    method: 'POST',
    body: JSON.stringify(commentBody),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
};