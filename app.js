const PLANTS = {
  tomate: { name: 'Tomatera', price: 30, stages: ['Brote', 'Brote crecido', 'Planta', 'Flor', 'Fruto'], daysPerStage: 2, baseYield: 2, kind: 'fruit' },
  menta: { name: 'Menta', price: 50, stages: ['Brote', 'Brote crecido', 'Planta', 'Decorativa'], daysPerStage: 0.5, baseYield: 1, kind: 'decor' },
  fresa: { name: 'Fresa', price: 30, stages: ['Brote', 'Brote crecido', 'Planta', 'Flor', 'Fruto'], daysPerStage: 2, baseYield: 2, kind: 'fruit' }
};

const state = JSON.parse(localStorage.getItem('growgarden-v0') || 'null') || {
  coins: 120,
  compost: 50,
  day: 1,
  lastLoginDay: 0,
  selectedSeed: null,
  pots: Array.from({ length: 6 }, () => emptyPot())
};

function emptyPot() {
  return { plant: null, stage: 0, progress: 0, wateredToday: 0, wateredStreak: 0, unwateredDays: 0, unfertilizedDays: 0, wilted: false, dead: false, rewardReady: false };
}

function save() { localStorage.setItem('growgarden-v0', JSON.stringify(state)); }

function render() {
  document.getElementById('coins').textContent = state.coins;
  document.getElementById('compost').textContent = state.compost;
  document.getElementById('gameDay').textContent = state.day;
  document.getElementById('seedBag').textContent = state.selectedSeed ? PLANTS[state.selectedSeed].name : 'ninguna';

  const floor = document.getElementById('pots');
  floor.innerHTML = '';
  state.pots.forEach((pot, i) => {
    const el = document.getElementById('potTemplate').content.firstElementChild.cloneNode(true);
    const plantEl = el.querySelector('.plant');
    const statusEl = el.querySelector('.status');

    if (!pot.plant) {
      plantEl.textContent = `Maceta #${i + 1} vacía`;
      statusEl.textContent = 'Click para plantar';
      el.addEventListener('click', () => plantSeed(i));
    } else {
      const p = PLANTS[pot.plant];
      plantEl.textContent = `${p.name} — ${p.stages[Math.min(pot.stage, p.stages.length - 1)]}`;
      if (pot.wilted) plantEl.classList.add('wilt');
      if (pot.dead) plantEl.classList.add('dead');
      statusEl.textContent = pot.dead ? 'Muerta. Reclama restos.' : `Riego hoy: ${pot.wateredToday}/2 · Marchita: ${pot.wilted ? 'sí' : 'no'}`;
    }

    el.querySelector('.water').onclick = (e) => { e.stopPropagation(); water(i); };
    el.querySelector('.fert').onclick = (e) => { e.stopPropagation(); fertilize(i); };
    el.querySelector('.harvest').onclick = (e) => { e.stopPropagation(); harvest(i); };

    floor.appendChild(el);
  });

  save();
}

function plantSeed(index) {
  const seed = state.selectedSeed;
  if (!seed) return alert('Selecciona una semilla en tienda primero.');
  const pot = state.pots[index];
  if (pot.plant || pot.dead) return;
  state.pots[index] = { ...emptyPot(), plant: seed };
  render();
}

function water(index) {
  const pot = state.pots[index];
  if (!pot.plant || pot.dead) return;
  pot.wateredToday += 1;
  if (pot.wateredToday > 2) pot.wilted = true;
  render();
}

function fertilize(index) {
  const pot = state.pots[index];
  if (!pot.plant || pot.dead) return;
  if (state.compost < 10) return alert('No tienes compost suficiente (10).');
  state.compost -= 10;
  pot.unfertilizedDays = 0;
  render();
}

function harvest(index) {
  const pot = state.pots[index];
  if (!pot.plant) return;
  if (pot.dead) {
    state.compost += 5;
    state.pots[index] = emptyPot();
    return render();
  }
  if (!pot.rewardReady) return alert('Aún no hay recompensa para reclamar.');
  const plant = PLANTS[pot.plant];
  let reward = 5;
  if (plant.kind === 'fruit') {
    reward = pot.wilted ? Math.floor(plant.baseYield / 2) : plant.baseYield;
    if (pot.wateredStreak >= plant.stages.length - 1 && Math.random() < 0.3) reward *= 2;
    state.compost += 5;
  }
  state.coins += reward;

  if (plant.kind === 'decor') {
    pot.stage = 0;
    pot.progress = 0;
    pot.rewardReady = false;
  } else {
    pot.rewardReady = false;
  }
  render();
}

function advanceDay() {
  state.day += 1;
  state.pots.forEach((pot) => {
    if (!pot.plant || pot.dead) return;

    if (pot.wateredToday === 0) {
      pot.unwateredDays += 1;
      pot.wilted = true;
      pot.wateredStreak = 0;
    } else {
      pot.unwateredDays = 0;
      pot.wateredStreak += 1;
    }

    pot.unfertilizedDays += 1;

    if (pot.unwateredDays >= 3 || pot.unfertilizedDays >= 2) {
      pot.dead = true;
      pot.rewardReady = true;
      return;
    }

    const plant = PLANTS[pot.plant];
    let speed = 1;
    if (pot.wateredToday > 0) speed += 0.2;
    if (pot.wilted) speed -= 0.5;
    pot.progress += Math.max(0.1, speed);

    if (pot.progress >= plant.daysPerStage) {
      pot.progress = 0;
      pot.stage += 1;
      if (pot.stage >= plant.stages.length - 1) pot.rewardReady = true;
    }

    pot.wateredToday = 0;
  });
  render();
}

document.getElementById('advanceDay').onclick = advanceDay;
document.getElementById('dailyLogin').onclick = () => {
  if (state.lastLoginDay === state.day) return alert('Ya reclamaste hoy.');
  state.lastLoginDay = state.day;
  state.compost += 50;
  render();
};
document.getElementById('saveBtn').onclick = () => { save(); alert('Guardado local'); };
document.getElementById('resetBtn').onclick = () => {
  localStorage.removeItem('growgarden-v0');
  location.reload();
};
document.getElementById('buyPot').onclick = () => {
  if (state.pots.length >= 25) return alert('Límite 25 macetas.');
  if (state.coins < 100) return alert('No tienes monedas.');
  state.coins -= 100;
  state.pots.push(emptyPot());
  render();
};

document.querySelectorAll('[data-seed]').forEach((btn) => {
  btn.onclick = () => {
    const id = btn.dataset.seed;
    const price = PLANTS[id].price;
    if (state.coins < price) return alert('No tienes monedas.');
    state.coins -= price;
    state.selectedSeed = id;
    render();
  };
});

render();
