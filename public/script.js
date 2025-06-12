//tag sortering fra chat.gpt

async function hentData() {
  const recipes = await (await fetch('/api/recipes')).json(); //henter recepies
  const tags = await (await fetch('/api/tags')).json();       //henter tags
  visTags(tags, recipes); //knapper for tægs 
  visOppskrifter(recipes); //opskrifter!!
}

function visTags(tags, recipes) {
  const tagsDiv = document.getElementById('tags'); //tar html tagsene og gjør em om til tomme knapper
  tagsDiv.innerHTML = '';

  tags.forEach(tag => { //selve tag sorteringen -> git de navn og skjekker hver og en for de spesifike tagsene på oppskriftene og viser bare de som har dem.
    const btn = document.createElement('button');
    btn.innerText = tag.name;
    btn.onclick = () => {
      const filtrert = recipes.filter(r => r.tags.some(t => t.id === tag.id));
      visOppskrifter(filtrert);
    };
    tagsDiv.appendChild(btn);
  });

  const resetBtn = document.createElement('button'); //bare for å vise alle oppskriftene igjen
  resetBtn.innerText = 'Alle';
  resetBtn.onclick = () => visOppskrifter(recipes);
  tagsDiv.appendChild(resetBtn);
}

//hjelp fra chat.gpt tihi

function visOppskrifter(oppskrifter) { //finner oppskrifter og gjør den klar for å legge til dem!
  const recipesDiv = document.getElementById('recipes');
  recipesDiv.innerHTML = '';

  oppskrifter.forEach(oppskrift => { //finner oppskrifter og legger dem inn i en div.
    console.log(oppskrift);
    const a = document.createElement('a'); //byttet div med a (link) -> på flere steder!
    a.classList.add('recipe-card');
    a.href = oppskrift.link;

    a.innerHTML = `
      <img src="${oppskrift.img}" alt="${"Bilde av " + oppskrift.title}"> 
      <h3>${oppskrift.title}</h3>
      <p>${oppskrift.description}</p>
    `; //henter all infoen fra databasen recepies for å legge inn oppskriftene på en fin måde.

    recipesDiv.appendChild(a); //legger inn i div-en
  });
}

hentData(); //starter prossesen! :)
