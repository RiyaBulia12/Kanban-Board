import updateLikes from './likes.js';
import { getLikes, getPoke } from './api.js';
import viewPoke from './comments.js';
import images from './images.js';

const grid = document.querySelector('.poke-grid');
const createGrid = (item, id, likes) => {
  grid.innerHTML += `
    <div class="col-md-3 px-md-4 pt-md-4 col-sm-5 poke-card">
      <div class="card">
        <div class="desc">
          <i class="bi bi-heart" id="${item?.name}"></i>
          <span class="like-counts" id="like-${item?.name}">${likes}</span>
        </div>
        <img class="card-img py-4 w-75 m-auto" src="${images[`${id}.png`]}" alt="Pokemon Image">
        <div class="card-body-custom" >
          <h3 class="card-title text-capitalize">${item.name}</h3>
          <div class="btn-container">
            <button type="button" class="btn comment-btn text-uppercase" id="${id}" data-bs-toggle="modal" data-bs-target="#commentModal">Comment</button>
          </div>
        </div>
    </div>
  </div>`;
};

export const getCounts = (pokemons) => (pokemons ? pokemons.length : 0);

export const loadPoke = async () => {
  const getPokemon = await getPoke();
  const getLikeList = await getLikes();
  getPokemon.forEach((item, id) => {
    const like = getLikeList[id]?.likes;
    const pokeId = +item.url.split('/').filter(Boolean).pop();
    createGrid(item, pokeId, like);

    const likeIcon = document.querySelectorAll('.bi-heart');
    likeIcon.forEach((item) => {
      item.addEventListener('click', (e) => {
        updateLikes(e);
      });
    });

    const commentBtns = document.querySelectorAll('.comment-btn');
    commentBtns.forEach((comment) => {
      comment.onclick = (event) => {
        viewPoke(+event.target.id);
      };
    });
  });
  const len = getCounts(getPokemon);
  document.getElementById('pokeCounts').innerHTML = `(${len})`;
};

// export default { getCounts, loadPoke };
