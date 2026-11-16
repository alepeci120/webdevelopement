
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let keys = {};
let gameOver = false;

let level = 0;
let platforms = [];
let spikes = [];
let door = { x: 850, y: 350, w: 35, h: 60 };

let labo = [
    "Labo1/index.html",
    "Labo3/opdracht1/index.html",
    "Labo3/opdracht2/index.html",
    "Labo3/opdracht_opleidingsaanbod/index.html",
    "SUPERHERO/index.html",
    "Labo5/Opdracht6/index.html",
    "Labo6/opdracht4,5/index.html",
    "Labo6/Opdracht_cv/cv.html",
    "Labo7/Opgave_nature_blog"
];

const player = {
    x: 50,
    y: 300,
    width: 30,
    height: 40,
    vx: 0,
    vy: 0,
    speed: 5,
    jump: -13,
    grounded: false
};

// NIVEAUS

function loadLevel() {

    const levelData = [

        // NIVEL 1 - LABO 1
        {
            platforms: [
                {x:0,y:410,w:180,h:40},
                {x:220,y:350,w:100,h:20},
                {x:360,y:290,w:80,h:20},
                {x:490,y:340,w:90,h:20},
                {x:630,y:260,w:80,h:20},
                {x:750,y:330,w:70,h:20},
                {x:850,y:410,w:50,h:40}
            ],
            spikes: [
                {x:250,y:330,w:30,h:20},
                {x:380,y:270,w:30,h:20},
                {x:520,y:320,w:30,h:20},
                {x:650,y:240,w:30,h:20}
            ]
        },

        // NIVEL 2 - LABO 3.1
        {
            platforms: [
                {x:0,y:410,w:130,h:40},
                {x:170,y:350,w:80,h:20},
                {x:290,y:280,w:70,h:20},
                {x:400,y:220,w:70,h:20},
                {x:510,y:300,w:70,h:20},
                {x:620,y:230,w:70,h:20},
                {x:730,y:310,w:70,h:20},
                {x:850,y:410,w:50,h:40}
            ],
            spikes: [
                {x:190,y:330,w:30,h:20},
                {x:310,y:260,w:30,h:20},
                {x:420,y:200,w:30,h:20},
                {x:530,y:280,w:30,h:20},
                {x:640,y:210,w:30,h:20},
                {x:750,y:290,w:30,h:20}
            ]
        },

        // NIVEL 3 - LABO 3.2
        {
            platforms: [
                {x:0,y:410,w:110,h:40},
                {x:150,y:340,w:70,h:20},
                {x:260,y:260,w:65,h:20},
                {x:370,y:180,w:65,h:20},
                {x:480,y:260,w:65,h:20},
                {x:590,y:190,w:65,h:20},
                {x:700,y:280,w:65,h:20},
                {x:850,y:410,w:50,h:40}
            ],
            spikes: [
                {x:165,y:320,w:30,h:20},
                {x:275,y:240,w:30,h:20},
                {x:385,y:160,w:30,h:20},
                {x:495,y:240,w:30,h:20},
                {x:605,y:170,w:30,h:20},
                {x:715,y:260,w:30,h:20}
            ]
        },

        // NIVEL 4 - OPLEIDINGSAANBOD
        {
            platforms: [
                {x:0,y:410,w:100,h:40},
                {x:140,y:350,w:65,h:20},
                {x:245,y:280,w:65,h:20},
                {x:350,y:210,w:65,h:20},
                {x:455,y:140,w:65,h:20},
                {x:560,y:220,w:65,h:20},
                {x:665,y:290,w:65,h:20},
                {x:770,y:350,w:60,h:20},
                {x:860,y:410,w:40,h:40}
            ],
            spikes: [
                {x:155,y:330,w:30,h:20},
                {x:260,y:260,w:30,h:20},
                {x:365,y:190,w:30,h:20},
                {x:475,y:120,w:30,h:20},
                {x:580,y:200,w:30,h:20},
                {x:685,y:270,w:30,h:20},
                {x:785,y:330,w:30,h:20}
            ]
        },

        // NIVEL 5 - SUPERHERO BATMAN
        {
            platforms: [
                {x:0,y:410,w:100,h:40},
                {x:140,y:330,w:60,h:20},
                {x:240,y:250,w:60,h:20},
                {x:340,y:170,w:60,h:20},
                {x:440,y:250,w:60,h:20},
                {x:540,y:170,w:60,h:20},
                {x:640,y:250,w:60,h:20},
                {x:740,y:330,w:60,h:20},
                {x:860,y:410,w:40,h:40}
            ],
            spikes: [
                {x:150,y:310,w:30,h:20},
                {x:250,y:230,w:30,h:20},
                {x:350,y:150,w:30,h:20},
                {x:450,y:230,w:30,h:20},
                {x:550,y:150,w:30,h:20},
                {x:650,y:230,w:30,h:20},
                {x:750,y:310,w:30,h:20}
            ]
        },

        // NIVEL 6 - LABO 5
        {
            platforms: [
                {x:0,y:410,w:90,h:40},
                {x:130,y:350,w:55,h:20},
                {x:220,y:280,w:55,h:20},
                {x:310,y:210,w:55,h:20},
                {x:400,y:140,w:55,h:20},
                {x:490,y:220,w:55,h:20},
                {x:580,y:290,w:55,h:20},
                {x:670,y:220,w:55,h:20},
                {x:760,y:330,w:55,h:20},
                {x:870,y:410,w:30,h:40}
            ],
            spikes: [
                {x:140,y:330,w:30,h:20},
                {x:230,y:260,w:30,h:20},
                {x:320,y:190,w:30,h:20},
                {x:410,y:120,w:30,h:20},
                {x:500,y:200,w:30,h:20},
                {x:590,y:270,w:30,h:20},
                {x:680,y:200,w:30,h:20},
                {x:770,y:310,w:30,h:20}
            ]
        },

        // NIVEL 7 - LABO 6 OEFENING 4 EN 5
        {
            platforms: [
                {x:0,y:410,w:80,h:40},
                {x:120,y:350,w:50,h:20},
                {x:205,y:280,w:50,h:20},
                {x:290,y:210,w:50,h:20},
                {x:375,y:140,w:50,h:20},
                {x:460,y:220,w:50,h:20},
                {x:545,y:150,w:50,h:20},
                {x:630,y:240,w:50,h:20},
                {x:715,y:320,w:50,h:20},
                {x:870,y:410,w:30,h:40}
            ],
            spikes: [
                {x:130,y:330,w:30,h:20},
                {x:215,y:260,w:30,h:20},
                {x:300,y:190,w:30,h:20},
                {x:385,y:120,w:30,h:20},
                {x:470,y:200,w:30,h:20},
                {x:555,y:130,w:30,h:20},
                {x:640,y:220,w:30,h:20},
                {x:725,y:300,w:30,h:20}
            ]
        },

        // NIVEL 8 - CV
        {
            platforms: [
                {x:0,y:410,w:80,h:40},
                {x:115,y:340,w:45,h:20},
                {x:195,y:270,w:45,h:20},
                {x:275,y:200,w:45,h:20},
                {x:355,y:130,w:45,h:20},
                {x:435,y:210,w:45,h:20},
                {x:515,y:280,w:45,h:20},
                {x:595,y:200,w:45,h:20},
                {x:675,y:130,w:45,h:20},
                {x:755,y:270,w:45,h:20},
                {x:870,y:410,w:30,h:40}
            ],
            spikes: [
                {x:120,y:320,w:30,h:20},
                {x:200,y:250,w:30,h:20},
                {x:280,y:180,w:30,h:20},
                {x:360,y:110,w:30,h:20},
                {x:440,y:190,w:30,h:20},
                {x:520,y:260,w:30,h:20},
                {x:600,y:180,w:30,h:20},
                {x:680,y:110,w:30,h:20},
                {x:760,y:250,w:30,h:20}
            ]
        },

        // NIVEL 9 - NATURE BLOG
        {
            platforms: [
                {x:0,y:410,w:70,h:40},
                {x:105,y:350,w:45,h:20},
                {x:185,y:280,w:45,h:20},
                {x:265,y:210,w:45,h:20},
                {x:345,y:140,w:45,h:20},
                {x:425,y:210,w:45,h:20},
                {x:505,y:140,w:45,h:20},
                {x:585,y:220,w:45,h:20},
                {x:665,y:150,w:45,h:20},
                {x:745,y:280,w:45,h:20},
                {x:870,y:410,w:30,h:40}
            ],
            spikes: [
                {x:110,y:330,w:30,h:20},
                {x:190,y:260,w:30,h:20},
                {x:270,y:190,w:30,h:20},
                {x:350,y:120,w:30,h:20},
                {x:430,y:190,w:30,h:20},
                {x:510,y:120,w:30,h:20},
                {x:590,y:200,w:30,h:20},
                {x:670,y:130,w:30,h:20},
                {x:750,y:260,w:30,h:20}
            ]
        }
    ];


    platforms = levelData[level - 1].platforms;
    spikes = levelData[level - 1].spikes;

    door = {x:850,y:350,w:35,h:60};
}

// MENU HTML

function selectLevel(n) {

    level = n;
    gameOver = false;

    document.getElementById("menu").style.display = "none";
    canvas.style.display = "block";

    player.x = 50;
    player.y = 300;
    player.vx = 0;
    player.vy = 0;
    player.grounded = false;

    clearKeys();
    loadLevel();
}

// CONTROLES

document.addEventListener("keydown", e => {

    keys[e.code] = true;

    if (["Space", "ArrowUp", "ArrowLeft", "ArrowRight"].includes(e.code)) {
        e.preventDefault();
    }
});

document.addEventListener("keyup", e => {
    keys[e.code] = false;
});

function clearKeys() {
    keys = {};
}

// COLISIONES

function collision(a, b) {

    return a.x < b.x + b.w &&
        a.x + a.width > b.x &&
        a.y < b.y + b.h &&
        a.y + a.height > b.y;
}

// REINICIAR

function restartGame() {

    gameOver = false;

    clearKeys();

    player.x = 50;
    player.y = 300;
    player.vx = 0;
    player.vy = 0;
    player.grounded = false;
    loadLevel();
}

// ACTUALIZAR JUEGO

function update() {

    if ( gameOver ) {
        player.vx = 0;
        player.vy = 0;
        return;
    }

    player.vx = 0;

    if (keys["ArrowRight"] || keys["KeyD"]) {
        player.vx = player.speed;
    }

    if (keys["ArrowLeft"] || keys["KeyA"]) {
        player.vx = -player.speed;
    }

    if (
        (keys["Space"] || keys["ArrowUp"] || keys["KeyW"])
        && player.grounded
    ) {
        player.vy = player.jump;
        player.grounded = false;
    }

    player.vy += 0.6;

    player.x += player.vx;

    if (player.x < 0) player.x = 0;

    if (player.x + player.width > canvas.width) {
        player.x = canvas.width - player.width;
    }

    player.y += player.vy;
    player.grounded = false;

    // PLATAFORMAS

    platforms.forEach(p => {

        if (
            player.vy >= 0 &&
            player.x + player.width > p.x &&
            player.x < p.x + p.w &&
            player.y + player.height >= p.y &&
            player.y + player.height - player.vy <= p.y
        ) {
            player.y = p.y - player.height;
            player.vy = 0;
            player.grounded = true;
        }

    });

    // PINCHOS

    spikes.forEach(spike => {

        if (collision(player, spike)) {
            gameOver = true;
            clearKeys();
        }

    });

    // CAER DEL MAPA

    if (player.y > canvas.height) {
        gameOver = true;
        clearKeys();
    }

    // PUERTA

    if (collision(player, door) && !gameOver) {

        clearKeys();

        window.open(labo[level - 1], "_blank");
        document.getElementById("menu").style.display = "block";
        document.getElementById("game").style.display = "none";
        restartGame();
    }
}

// DIBUJAR

function draw() {

    // CIELO

    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, 900, 450);

    // PLATAFORMAS

    platforms.forEach(p => {

        ctx.fillStyle = "#784421";
        ctx.fillRect(p.x, p.y, p.w, p.h);

        ctx.fillStyle = "#36bd50";
        ctx.fillRect(p.x, p.y, p.w, 9);

    });

    // PINCHOS

    spikes.forEach(s => {

        ctx.fillStyle = "#C71D00";

        ctx.beginPath();
        ctx.moveTo(s.x, s.y + s.h);
        ctx.lineTo(s.x + s.w / 2, s.y);
        ctx.lineTo(s.x + s.w, s.y + s.h);
        ctx.fill();

    });

    // PUERTA

    ctx.fillStyle = "#442B03";
    ctx.fillRect(door.x, door.y, door.w, door.h);

    // JUGADOR

    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(player.x, player.y, player.width, player.height);

    ctx.fillStyle = "black";
    ctx.fillRect(player.x + 2, player.y + 4, 26, 10);
    ctx.fillRect(player.x + 2, player.y + 20, 26, 10);

    // NÚMERO DE NIVEL

    ctx.fillStyle = "white";
    ctx.font = "22px Arial";
    ctx.textAlign = "left";
    ctx.fillText("NIVEL: " + level, 20, 30);

    // GAME OVER

    if (gameOver) {

        ctx.fillStyle = "rgba(0,0,0,0.8)";
        ctx.fillRect(0, 0, 900, 450);

        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.font = "bold 38px Arial";

        ctx.fillText("GAME OVER", 450, 190);

        ctx.font = "22px Arial";
        ctx.fillText("Pulsa REINICIAR para volver a jugar", 450, 255);

        ctx.textAlign = "left";
    }

    // MOSTRAR BOTÓN REINICIAR

    const restartButton = document.getElementById("restartButton");

    if (restartButton) {
        restartButton.style.display = gameOver ? "block" : "none";
    }
}

// BUCLE PRINCIPAL

function loop() {

    update();
    draw();

    requestAnimationFrame(loop);
}

// INICIO

canvas.style.display = "none";
loop();
