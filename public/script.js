//tag sortering fra chat.gpt

async function hentData() {
  const recipes = await (await fetch('/api/recipes')).json();
  const tags = await (await fetch('/api/tags')).json();
  visTags(tags, recipes);
  visOppskrifter(recipes);
}

function visTags(tags, recipes) {
  const tagsDiv = document.getElementById('tags');
  tagsDiv.innerHTML = '';

  tags.forEach(tag => {
    const btn = document.createElement('button');
    btn.innerText = tag.name;
    btn.onclick = () => {
      const filtrert = recipes.filter(r => r.tags.some(t => t.id === tag.id));
      visOppskrifter(filtrert);
    };
    tagsDiv.appendChild(btn);
  });

  const resetBtn = document.createElement('button');
  resetBtn.innerText = 'Alle';
  resetBtn.onclick = () => visOppskrifter(recipes);
  tagsDiv.appendChild(resetBtn);
}

function visOppskrifter(oppskrifter) {
  const recipesDiv = document.getElementById('recipes');
  recipesDiv.innerHTML = '';
  oppskrifter.forEach(oppskrift => {
    console.log(oppskrift);
    const div = document.createElement('div');
    div.classList.add('recipe-card');

    div.innerHTML = `
      <img src="${oppskrift.img}" alt="${oppskrift.title}">
      <h3>${oppskrift.title}</h3>
      <p>${oppskrift.description}</p>
      <a href="${oppskrift.link}">Se oppskrift</a>
    `;

    recipesDiv.appendChild(div);
  });
}

hentData();
