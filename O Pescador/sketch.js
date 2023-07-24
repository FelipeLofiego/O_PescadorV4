var buttonWidth = 200;
var buttonHeight = 50;
var buttonX, buttonY;
var startButton, level2Button;
var backgroundInicial, backgroundJogo;
var gameStarted = false, backgroundDrawn = false;
var lineBottomY, lineMoveSpeed = 5;
var upArrowPressed = false, downArrowPressed = false, spaceKeyPressed = false;
var peixes = [];
var pontuacao = 0;
var Lata, Garrafa, Canudo, Sacola, Pneu, Latinha, Tampa, Oleo;
var spaceCooldown = 1000;
var lastSpaceKeyPressTime = 0;
var level2ScoreTarget = 20;
var level2TimeLimit = 30;
var level2Timer = 0;
var currentLevel = 1;

function preload() {
  backgroundInicial = loadImage("./assets/Tela de inicio.png");
  backgroundJogo = loadImage("./assets/Tela de fundo.jpeg");
  Atum = loadImage("./assets/Atum.png");
  Baiacu = loadImage("./assets/Baiacu.png");
  Baleia = loadImage("./assets/Baleia.png");
  Camarão = loadImage("./assets/Camarão.png");
  Golfinho = loadImage("./assets/Golfinho.png");
  Lula = loadImage("./assets/Lula.png");
  Peixe_Palhaço_de_Clark = loadImage("./assets/Peixe Palhaço de Clark.png");
  Peixe_Palhaço = loadImage("./assets/Peixe Palhaço.png");
  Polvo = loadImage("./assets/Polvo.png");
  Sardinha = loadImage("./assets/Sardinha.png");
  Tilapia = loadImage("./assets/Tilapia.png");
  Tubarão = loadImage("./assets/Tubarão.png");

  Lata = loadImage("./assets/Lata.png");
  Garrafa = loadImage("./assets/Garrafa de Plastico.png");
  Canudo = loadImage("./assets/Canudo.png");
  Sacola = loadImage("./assets/Sacola de Plastico.png");
  Pneu = loadImage("./assets/Pneu.png");
  Latinha = loadImage("./assets/Coca Cola.png");
  Tampa = loadImage("./assets/Tampa.png");
  Oleo = loadImage("./assets/Garrafa de oleo.png");
}

function setup() {
  createCanvas(500, 800);

  buttonX = width / 2 - buttonWidth / 2;
  buttonY = height / 2 + 50;

  startButton = createButton("Começar");
  startButton.position(buttonX, buttonY);
  startButton.size(buttonWidth, buttonHeight);
  startButton.mousePressed(startGame);

  level2Button = createButton("Nível 2");
  level2Button.position(buttonX, buttonY);
  level2Button.size(buttonWidth, buttonHeight);
  level2Button.mousePressed(startLevel2);
  level2Button.hide();

  textAlign(CENTER);
  textSize(50);
}

function draw() {
  if (gameStarted) {
    if (!backgroundDrawn) {
      background(backgroundJogo);
      backgroundDrawn = true;
    }

    background(backgroundJogo);

    strokeWeight(5);
    stroke(255);

    line(width / 2, 0, width / 2, lineBottomY);

    if (upArrowPressed && !downArrowPressed) {
      if (lineBottomY - lineMoveSpeed >= 0) {
        lineBottomY -= lineMoveSpeed;
      }
    } else if (downArrowPressed && !upArrowPressed) {
      if (lineBottomY + lineMoveSpeed <= height) {
        lineBottomY += lineMoveSpeed;
      }
    }

    for (var i = 0; i < peixes.length; i++) {
      var peixe = peixes[i];
      peixe.move();
      peixe.display();

      if (spaceKeyPressed && peixe.checkCollision(lineBottomY)) {
        peixe.catch();
        pontuacao += 10;
      }
    }

    textSize(30);
    fill(173, 216, 230);
    text("Pontuação: " + pontuacao, (width / 2) -160, 30);

    if (currentLevel === 1 && pontuacao >= 10) {
      currentLevel = 2;
      level2Button.show();
      textAlign(CENTER);
      textSize(40);
      fill(255);
      text("Você venceu o primeiro nível!", width / 2, height / 2 - 50);
    }else if (currentLevel === 2){
      level2Timer++;
      var remainingTime = level2TimeLimit - level2Timer / 60;
      if (remainingTime <= 0 || pontuacao < level2ScoreTarget) {
        currentLevel = 0;
        textAlign(CENTER);
        textSize(40);
        fill(255);
        text("Você perdeu! Tente novamente.", width / 2, height / 2 - 50);
      }
    }

  } else {
    background(backgroundInicial);
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    upArrowPressed = true;
  } else if (keyCode === DOWN_ARROW) {
    downArrowPressed = true;
  } else if (keyCode === 32 && millis() - lastSpaceKeyPressTime >= spaceCooldown) {
    spaceKeyPressed = true;
    lastSpaceKeyPressTime = millis();
  }
}

function keyReleased() {
  if (keyCode === UP_ARROW) {
    upArrowPressed = false;
  } else if (keyCode === DOWN_ARROW) {
    downArrowPressed = false;
  } else if (keyCode === 32) {
    spaceKeyPressed = false;
  }
}

function startGame() {
  gameStarted = true;
  startButton.remove();
  lineBottomY = height;

  peixes.push(new Peixe(Atum, -Atum.width * 0.1, random(height), "direita"));
  peixes.push(new Peixe(Baleia, -Baleia.width * 0.1, random(height), "direita"));
  peixes.push(new Peixe(Polvo, -Polvo.width * 0.1, random(height), "direita"));
  peixes.push(new Peixe(Tubarão, -Tubarão.width * 0.1, random(height), "direita"));
  peixes.push(new Peixe(Camarão, width, random(height), "esquerda"));
  peixes.push(new Peixe(Peixe_Palhaço_de_Clark, width, random(height), "esquerda"));
  peixes.push(new Peixe(Peixe_Palhaço, width, random(height), "esquerda"));
  peixes.push(new Peixe(Tilapia, width, random(height), "esquerda"));
  peixes.push(new Peixe(Sardinha, width, random(height), "esquerda"));
  
  peixes.push(new Peixe(Lata, width, random(height), "esquerda"));
  peixes.push(new Peixe(Garrafa, width, random(height), "esquerda"));
  peixes.push(new Peixe(Canudo, width, random(height), "esquerda"));
  peixes.push(new Peixe(Sacola, width, random(height), "esquerda"));
  peixes.push(new Peixe(Pneu, width, random(height), "esquerda"));
  peixes.push(new Peixe(Latinha, width, random(height), "esquerda"));
  peixes.push(new Peixe(Tampa, width, random(height), "esquerda"));
  peixes.push(new Peixe(Oleo, width, random(height), "esquerda"));

  peixes[0].escala = 0.2; // Atum
  peixes[1].escala = 0.6; // Baleia
  peixes[2].escala = 0.1; // Polvo
  peixes[3].escala = 0.2; // Tubarão
  peixes[4].escala = 0.05; // Camarão
  peixes[5].escala = 0.05; // Peixe_Palhaço_de_Clark
  peixes[6].escala = 0.05; // Peixe_Palhaço
  peixes[7].escala = 0.05; // Tilapia
  peixes[8].escala = 0.05; // Sardinha

  peixes[9].escala = 0.1; // Lata
  peixes[10].escala = 0.05; // Garrafa
  peixes[11].escala = 0.05; // Canudo
  peixes[12].escala = 0.1; // Sacola
  peixes[13].escala = 0.05; // Pneu
  peixes[14].escala = 0.1; // Latinha
  peixes[15].escala = 0.02; // Tampa
  peixes[16].escala = 0.1; // Oleo
}

function startLevel2() {
  currentLevel = 2;
  level2Button.hide();
  gameStarted = true;
  lineBottomY = height;
  level2Timer = 0;

  for (var i = 0; i < peixes.length; i++) {
    peixes[i].velocidadeX *=5.5;3
  }
}


function Peixe(imagem, x, y, direcao) {
  this.imagem = imagem;
  this.x = x;
  this.y = y;
  this.velocidadeX = random(1, 3); 
  this.escala = 0.1; 
  this.direcao = direcao; 
  this.caught = false; 

  this.move = function() {
    if (!this.caught) {
      if (this.direcao === "esquerda") {
        this.x -= this.velocidadeX;
    
        if (this.x < -this.imagem.width * this.escala) {
          this.x = width;
          this.y = random(height);
        }
      } else if (this.direcao === "direita") {
        this.x += this.velocidadeX;
        
        if (this.x > width) {
          this.x = -this.imagem.width * this.escala;
          this.y = random(height);
        }
      }
    }
  };

  this.catch = function() {
    if (
      this.imagem === Lata ||
      this.imagem === Garrafa ||
      this.imagem === Canudo ||
      this.imagem === Sacola ||
      this.imagem === Pneu ||
      this.imagem === Latinha ||
      this.imagem === Tampa ||
      this.imagem === Oleo
    ) {
      pontuacao -= 25;
    } else {
      this.caught = true;
      this.x = -this.imagem.width * this.escala;
      this.y = random(height);
    }
  }

  this.display = function() {
    push(); 
    translate(this.x, this.y); 
    scale(this.escala); 
    image(this.imagem, 0, 0); 
    pop(); 
  };
  
  this.checkCollision = function(lineY) {
    var lineTopY = lineY - 10;
    var lineBottomY = lineY + 10;
    
    if (this.y > lineTopY && this.y < lineBottomY) {
      return true;
    }
    
    return false;
  };
  
  this.catch = function() {
    this.caught = true;
    this.x = -this.imagem.width * this.escala;
    this.y = random(height);
  };
}
