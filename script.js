let Frame = 0;
let Points = 0;
let shoot = 20;
let state = "IDLE";
let left = 0;
let rightArrow = false;
let leftArrow = false;
let attacking = false;
const enemies = []; //Array
const bullets = []; //Array
const cristals = []; //Array
const enemyCount = 500;
let cristalCount = 30;
let backgroundMusik = new Audio("sonds/background_music.mp3");
let shot = new Audio("sonds/shot.mp3");
let walk = new Audio("sonds/walk.mp3");
let hit = new Audio("sonds/hit.MP3");
let gameOverMusik = new Audio("sonds/gameOverMusik.mp3");
backgroundMusik.loop = true;
walk.loop = true;
gameOverMusik.loop;
backgroundMusik.volume = 0.5;

document.onkeydown = checkKey;
document.onkeyup = unCheckKey;
setInterval(updateGame, 1000 / 70);
setInterval(checkCollisions, 1000 / 70);
setInterval(checkCharacterCollision, 1000 / 70);
setInterval(moveCaracterAndEnemys, 75);
createEnemies();
createObject();

function moveCaracterAndEnemys() {
  if (state !== "DIE") {
    updateEnemies();
  }

  if (state === "DIE" && Frame < 7) {
    caracter.src = `img/pirates/2/2_entity_000_${state}_00${Frame}.png`;
    Frame++;
  } else if (state !== "DIE") {
    caracter.src = `img/pirates/2/2_entity_000_${state}_00${Frame}.png`;
    Frame++;
    if (Frame == 7) {
      attacking = false;
      Frame = 0;
      if (rightArrow) {
        caracter.style.transform = "scaleX(1)";
      }
      if (leftArrow) {
        caracter.style.transform = "scaleX(-1)";
      }
    }
  }
}

function updateEnemies() {
  enemies.forEach((enemy) => {
    if (enemy.hit) {
      // Dying Animation
      if (enemy.Frame < 10) {
        enemy.element.src = `img/gegner/Minotaur_0${enemy.type}/Minotaur_0${enemy.type}_Dying_00${enemy.Frame}.png`;
      } else {
        enemy.element.src = `img/gegner/Minotaur_0${enemy.type}/Minotaur_0${enemy.type}_Dying_0${enemy.Frame}.png`;
      }
      enemy.Frame++;
      if (enemy.Frame > 14) {
        enemy.Frame = 14; // Bleibt auf dem letzten Bild stehen
      }
    } else {
      if (enemy.Frame < 10) {
        enemy.element.src = `img/gegner/Minotaur_0${enemy.type}/Minotaur_0${enemy.type}_Walking_00${enemy.Frame}.png`;
      } else {
        enemy.element.src = `img/gegner/Minotaur_0${enemy.type}/Minotaur_0${enemy.type}_Walking_0${enemy.Frame}.png`;
      }
      enemy.Frame++;
      if (enemy.Frame == 17) {
        enemy.Frame = 0;
      }
    }
  });
}

function updateGame() {
  if (state !== "DIE") {
    points.innerHTML = `Punkte: ${Points}`;
    shootShow.innerHTML = `Schüsse : ${shoot}`;
    updateBackground();
    enemies.forEach((enemy) => {
      if (!enemy.hit) {
        enemy.initialX -= 0.5;
      }
      enemy.element.style.left = `${enemy.initialX - left}px`;
    });

    cristals.forEach((cristal) => {
      cristal.element.style.left = `${cristal.initialX - left}px`;
    });

    bullets.forEach((bullet) => {
      if (bullet.initialX !== 1000) {
        bullet.initialX += 15;
      } else {
        bullet.element.remove();
      }
      bullet.element.style.left = `${bullet.initialX}px`;
    });

    if (leftArrow) {
      if (!attacking && left > 0) {
        left -= 6;
      }
    }
    if (rightArrow && left < 31660) {
      if (!attacking) {
        left += 6;
      }
      if (leftArrow || rightArrow) {
        walk.play();
      }
    }

    if (attacking) {
      state = "ATTACK";
    } else if (leftArrow || rightArrow) {
      setState("WALK");
    } else {
      setState("IDLE");
    }
  }
}

function updateBackground() {
  background.style.left = `${-left}px`;
  background2.style.left = `${-(left - background.width)}px`;
  background3.style.left = `${-(left - background.width * 2)}px`;
  background4.style.left = `${-(left - background.width * 3)}px`;
  background5.style.left = `${-(left - background.width * 4)}px`;
  background6.style.left = `${-(left - background.width * 5)}px`;
  background7.style.left = `${-(left - background.width * 6)}px`;
  background8.style.left = `${-(left - background.width * 7)}px`;
  background9.style.left = `${-(left - background.width * 8)}px`;
  background10.style.left = `${-(left - background.width * 9)}px`;
  background11.style.left = `${-(left - background.width * 10)}px`;
  background12.style.left = `${-(left - background.width * 11)}px`;
  background13.style.left = `${-(left - background.width * 12)}px`;
  background14.style.left = `${-(left - background.width * 13)}px`;
  background15.style.left = `${-(left - background.width * 14)}px`;
  background16.style.left = `${-(left - background.width * 15)}px`;
  background17.style.left = `${-(left - background.width * 16)}px`;
  background18.style.left = `${-(left - background.width * 17)}px`;
  background19.style.left = `${-(left - background.width * 18)}px`;
  background20.style.left = `${-(left - background.width * 19)}px`;
}

function startAttack() {
  if (shoot !== 0) {
    attacking = true;
    shoot--;

    // Bullet anzeigen
    setTimeout(function () {
      shot.currentTime = 0;
      shot.play();
      const bullet = document.createElement("img"); //<img>
      bullet.classList.add("bullet"); //<img class="bullet">
      bullet.src = "img/Bullet.png"; //<img class="bullet" src="img/Bullet.png"
      document.body.appendChild(bullet);
      bullets.push({
        element: bullet,
        initialX: 295,
      });
    }, 50);
  }
}

function checkKey(e) {
  e = e || window.event;
  if (backgroundMusik.paused) {
    backgroundMusik.play();
  }
  if (e.keyCode == "37") {
    leftArrow = true;
  } else if (e.keyCode == "39") {
    rightArrow = true;
  } else if (e.key === " ") {
    startAttack();
  } else if (e.keyCode == "40") {
    if (Points !== 0) {
      shoot += Points * 2;
      Points = 0;
    }
  }
}

function unCheckKey(e) {
  e = e || window.event;
  if (e.keyCode == "37") {
    leftArrow = false;
  } else if (e.keyCode == "39") {
    rightArrow = false;
  }
}

function setState(newState) {
  if (state !== newState) {
    Frame = 0;
    state = newState;
  }
}

function createEnemies() {
  for (let i = 0; i < enemyCount; i++) {
    const enemy = document.createElement("img"); //<img>
    enemy.classList.add("enemy"); //<img class="enemy">
    const enemyType = Math.floor(Math.random() * 3) + 1;
    enemy.src = `img/gegner/Minotaur_0${enemyType}/Minotaur_0${enemyType}_Walking_000.png`; //<img class="enemy" src="Dateipfad zu der Datei des Minotaur1"
    document.getElementById("enemiesContainer").appendChild(enemy);

    // Store enemy's position
    enemies.push({
      element: enemy,
      initialX: 800 + i * 100 * Math.random(),
      Frame: i % 17, // Mathematische Rest
      type: enemyType,
    });
  }
}

function checkCollisions() {
  enemies.forEach((enemy) => {
    if (!enemy.hit) {
      // Nur ungetroffene Gegner prüfen
      bullets.forEach((bullet, bulletIndex) => {
        const bulletRect = bullet.element.getBoundingClientRect();
        const enemyRect = enemy.element.getBoundingClientRect();

        // Kollision überprüfen
        if (
          bulletRect.left < enemyRect.right &&
          bulletRect.right > enemyRect.left &&
          bulletRect.top < enemyRect.bottom &&
          bulletRect.bottom > enemyRect.top
        ) {
          // Treffer
          hit.currentTime = 0;
          hit.play();
          enemy.hit = true; // Gegner als getroffen markieren
          enemy.frame = 5; // Animation von vorne beginnen
          Points++;

          // Kugel entfernen
          bullet.element.remove(); // Entferne das Kugel-Element aus dem DOM
          bullets.splice(bulletIndex, 1); // Entferne die Kugel aus dem Arrays
          setTimeout(() => {
            enemy.element.remove();
          }, 9000);
        }
      });
    }
  });
}

function checkCharacterCollision() {
  if (state !== "DIE") {
    const pirateRect = caracter.getBoundingClientRect();

    cristals.forEach((cristal) => {
      const cristalRect = cristal.element.getBoundingClientRect();

      // Kollision zwischen Charakter und Gegner überprüfen
      if (
        pirateRect.left < cristalRect.right &&
        pirateRect.right > cristalRect.left &&
        pirateRect.top < cristalRect.bottom &&
        pirateRect.bottom > cristalRect.top
      ) {
        cristal.element.remove();
        Points++;
      }
    });

    enemies.forEach((enemy) => {
      const enemyRect = enemy.element.getBoundingClientRect();

      // Kollision zwischen Charakter und Gegner überprüfen
      if (
        pirateRect.left < enemyRect.right &&
        pirateRect.right > enemyRect.left &&
        pirateRect.top < enemyRect.bottom &&
        pirateRect.bottom > enemyRect.top &&
        !enemy.hit
      ) {
        // Kollision erkannt
        setState("DIE"); // Setze den Zustand des Charakters auf 'DIE'
        backgroundMusik.volume = 0.1;
        walk.pause();
        gameOverMusik.play();

        // Bewegung des Charakters und der Gegner stoppen
        rightArrow = false;
        leftArrow = false;

        setTimeout(() => {
          window.location.reload();
        }, 4000);

        // Gegnerbewegung stoppen
        enemies.forEach((enemy) => {
          enemy.movable = false; // Füge eine Eigenschaft hinzu, um die Bewegung zu kontrollieren
        });
      }
    });
  }
}
// Gegenstände

async function createObject() {
  for (let i = 0; i < cristalCount; i++) {
    const object = document.createElement("img"); //<img>
    object.classList.add("object"); //<img class="enemy">
    const objecttype = Math.floor(Math.random() * 4) + 1;
    object.src = await `img/Gegenstände/Assets/Black_crystal${objecttype}.png`; //<img class="enemy" src="Dateipfad zu der Datei des Minotaur1"
    document.body.appendChild(object);

    // Store enemy's position
    cristals.push({
      element: object,
      initialX: 800 + i * 3000 * Math.random(),
      type: objecttype,
    });
  }
}
