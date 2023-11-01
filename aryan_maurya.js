/* 

    #############################################################
      
          @@@@@@@@@@    &&&&&&&&&&&&&&&&&&&    %%%%%%%%%%

(   By ~Aryan Maurya Mr.perfect https://amsrportfolio.netlify.app  )

          @@@@@@@@@@    &&&&&&&&&&&&&&&&&&&    %%%%%%%%%%

    #############################################################

*/

var boost;
var phone =
  navigator.userAgent.match(/Android/i) ||
  navigator.userAgent.match(/webOS/i) ||
  navigator.userAgent.match(/iPhone/i) ||
  navigator.userAgent.match(/iPad/i) ||
  navigator.userAgent.match(/iPod/i) ||
  navigator.userAgent.match(/BlackBerry/i) ||
  navigator.userAgent.match(/Windows Phone/i);
window.onload = function () {
  if (phone) {
    amsrPhone();
    // alert("As device orientation is not supported anymore, this game is not playable on phone. \nCheck it out on PC if you want to play it!");
    return;
  }
  function amsrPhone() {
    Swal.fire({
      icon: "error",
      // title: 'Oops...',
      text: "As device orientation is not supported anymore, this game is not playable on phone. \nCheck it out on PC if you want to play it!",
      footer:
        '<a href="https://amsrportfolio.netlify.app">Why do I have this issue?</a>',
    });
  }
  canvas = document.getElementById("canvas");
  ch = window.innerHeight;
  cw = window.innerWidth;
  //collecting window size
  canvas.height = ch;
  canvas.width = cw;
  ctx = canvas.getContext("2d");
  if (window.DeviceOrientationEvent) {
    //if you have the device orientation event
    window.addEventListener("deviceorientation", orientationHandler, false);
  }
  document.addEventListener("keydown", function (event) {
    event = event || window.event;
    switch (event.keyCode) {
      case 16:
        boost = true;
        if (Math.abs(ori[1]) === 10) {
          ori[1] *= 2;
        }
        if (Math.abs(ori[2]) === 10) {
          ori[2] *= 2;
        }
        break;
      case 87:
      case 38:
        ori[1] = boost ? -20 : -10;
        break;
      case 65:
      case 37:
        ori[2] = boost ? -20 : -10;
        break;
      case 83:
      case 40:
        ori[1] = boost ? 20 : 10;
        break;
      case 68:
      case 39:
        ori[2] = boost ? 20 : 10;
        break;
    }
  });
  document.addEventListener("keyup", function (event) {
    event = event || window.event;
    switch (event.keyCode) {
      case 16:
        boost = false;
        if (Math.abs(ori[1]) === 20) {
          ori[1] /= 2;
        }
        if (Math.abs(ori[2]) === 20) {
          ori[2] /= 2;
        }
        break;
      case 87:
      case 38:
        ori[1] = 0;
        break;
      case 65:
      case 37:
        ori[2] = 0;
        break;
      case 83:
      case 40:
        ori[1] = 0;
        break;
      case 68:
      case 39:
        ori[2] = 0;
        break;
    }
  });
  ori = [0, 0, 0];
  //alert("tilt your phone to move the ball, collect the coins and evade the sinkholes!");
  amsrAlt();

  setTimeout(updateScreen, 100);
  //fix, recheck the windows size shortly after starting
  calTick = 0;
  startCalibrating();
};

function amsrAlt() {
  Swal.fire({
    icon: "info",
    title:
      "tilt your phone to move the ball, collect the coins and evade the sinkholes!",
    footer:
      '<a href="https://amsrportfolio.netlify.app/">Why do I have this issue?</a>',
  });
}
function orientationHandler(event) {
  event = event || window.event;
  if (event.alpha) {
    var alpha = event.alpha;
    var beta = event.beta;
    var gamma = event.gamma;
    //device orientation angles
    ori = [alpha, beta, gamma];
    //store them in an array
  } else {
    window.removeEventListener("deviceorientation", orientationHandler);
    window.addEventListener("devicemotion", motionHandler);
  }
}

function motionHandler(e) {
  ori = [
    0,
    e.accelerationIncludingGravity.y * 9,
    e.accelerationIncludingGravity.x * -9,
  ];
}

function startCalibrating() {
  calInterval = setInterval(calibation, 16.6);
}

function calibation() {
  ctx.fillStyle = "#999";
  ctx.fillRect(0, 0, cw, ch);
  ctx.save();
  ctx.translate(cw / 2, ch / 2);
  var px = cw / 10;
  var py = ch / 10;
  ctx.fillStyle = "#FFF";
  ctx.font = px / 2.9 + "px Arial";
  ctx.fillText(
    "please hold your phone level (to the ground) to start the game",
    -4.8 * px,
    4.5 * py
  );
  ctx.beginPath();
  ctx.arc(0, -4 * py, py / 1.5, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#1C1";
  ctx.beginPath();
  ctx.moveTo(0, -4 * py);
  ctx.arc(
    0,
    -4 * py,
    py / 1.6,
    -Math.PI / 2,
    -Math.PI / 2 + Math.PI * 2 * (calTick / 120)
  );
  ctx.closePath();
  ctx.fill();
  ori[1] = ori[1] > 90 ? 90 : ori[1];
  var bxa = 2 * px * (ori[1] / 90);
  var bxg = 2 * px * (ori[2] / 90);
  var bya = 2 * py * (ori[1] / 90);
  var byg = 2 * py * (ori[2] / 90);
  ctx.lineWidth = px / 1.5;
  ctx.strokeStyle = "#1C1";
  ctx.strokeRect(-3 * px, -3 * py, 6 * px, 6 * py);
  var bxlu = -bxa;
  var bxru = bxa;
  var bxrd = -bxa;
  var bxld = bxa;
  var bylu = -byg;
  var byru = byg;
  var byrd = -byg;
  var byld = byg;
  ctx.beginPath();
  ctx.moveTo(-3 * px + bxlu, -3 * py + bylu);
  ctx.lineTo(3 * px + bxru, -3 * py + byru);
  ctx.lineTo(3 * px + bxrd, 3 * py + byrd);
  ctx.lineTo(-3 * px + bxld, 3 * py + byld);
  ctx.closePath();
  ctx.strokeStyle = "#000";
  ctx.lineWidth = px / 12;
  ctx.stroke();
  ctx.restore();
  if (Math.abs(ori[1]) < 15 && Math.abs(ori[2]) < 15) {
    calTick++;
    if (calTick > 120) {
      clearInterval(calInterval);
      start();
    }
  } else {
    calTick = 0;
  }
}

function start() {
  stats.lives = 3;
  canvas.onclick = undefined;
  //no onclick handler required during the game (yet)
  interval = setInterval(frame, 16.6);
  //frame interval
  cInterval = setInterval(newCoin, 3000);
  //spawn coins
  sHInterval = setInterval(generateSH, 5000);
  //spawn SinkHoles
  coinArray = [new Coin()];
  sHArray = [new SinkHole()];
  grArray = [];
  initializeGrass();
}

function updateScreen() {
  ch = window.innerHeight;
  cw = window.innerWidth;
  canvas.height = ch;
  canvas.width = cw;
}

function newCoin() {
  coinArray.push(new Coin());
}

function initializeGrass() {
  for (var y = ch / 20; y > 0; y--) {
    for (var x = Math.floor(cw / 20); x > 0; x--) {
      if (Math.random() < 0.1) {
        grArray.push(
          new Grass(
            x * 20 - 25 + Math.random() * 5,
            y * 20 - 10 + Math.random() * 20
          )
        );
      }
    }
  }
}

function generateSH() {
  if (Math.random() < 0.5) {
    sHArray.push(new SinkHole());
  }
}

function frame() {
  ctx.fillStyle = "#0C0";
  ctx.fillRect(0, 0, cw, ch);
  draw();
}

function drawOb(a, b, c) {
  if (a.dead) {
    c.splice(b, 1);
  } else {
    a.draw();
  }
}

function draw() {
  ctx.strokeStyle = "#2A2";
  ctx.lineWidth = 1;
  grArray.forEach(drawOb);
  sHArray.forEach(drawOb);
  ctx.strokeStyle = "#884";
  ctx.lineWidth = 2;
  coinArray.forEach(drawOb);
  trace.draw();
  if (P.draw()) {
    gameOver();
  } else {
    stats.draw();
  }
}

stats = {
  score: 0,
  lives: 3,
  draw: function () {
    ctx.fillStyle = "#FFF";
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 4;
    ctx.font = "600 20px Arial";
    var txt = "Score: " + this.score;
    ctx.strokeText(txt, 20, 25);
    ctx.fillText(txt, 20, 25);
    ctx.strokeText("lives:", 200, 25);
    ctx.fillText("lives:", 200, 25);
    for (var i = 0; i < this.lives; i++) {
      ctx.save();
      ctx.translate(260 + i * 35, 32.5);
      ctx.beginPath();
      ctx.moveTo(15, 0);
      ctx.arc(7.5, -22.5, 7.5, Math.PI * 0.75, Math.PI * 2);
      ctx.arc(22.5, -22.5, 7.5, Math.PI, Math.PI * 2.25);
      ctx.closePath();
      ctx.strokeStyle = "#500";
      ctx.fillStyle = "#D00";
      ctx.stroke();
      ctx.fill();
      ctx.restore();
    }
  },
};

P = {
  size: 1,
  tick: 0,
  x: 100,
  y: 100,
  xv: 0,
  yv: 0,
  v: 0,
  dArr: [
    [0, -10, 5, "#552"],
    [-3, -12, 2, "#000"],
    [3, -12, 2, "#000"],
  ],
  draw: function () {
    this.move();
    this.tick += this.v * 1.5;
    this.tick %= 61;
    if (this.dead) {
      stats.lives--;
      this.dead = false;
      this.x = cw / 2;
      this.y = ch / 2;
      this.xv = 0;
      this.yv = 0;
      coinArray = [];
      sHArray = [];
      trace.arr = [];
      this.size = 1;
      if (stats.lives <= 0) {
        return true;
      }
    }
    ctx.save();
    ctx.beginPath();
    ctx.translate(this.x, this.y);
    var rot =
      Math.atan(this.yv / this.xv) + (this.xv > 0 ? Math.PI / 2 : -Math.PI / 2);
    ctx.rotate(rot);
    ctx.save();
    ctx.translate(0, 3 - (this.v < 5 ? this.v * 1.5 : 7.5));
    ctx.scale(0.7 * this.size, this.size);
    var arr = this.dArr;
    var len = arr.length;
    for (var i = 0; i < len; i++) {
      var a = arr[i];
      ctx.beginPath();
      ctx.arc(a[0], a[1], a[2], 0, Math.PI * 2);
      ctx.closePath();
      ctx.fillStyle = a[3];
      ctx.fill();
    }
    ctx.beginPath();
    var bit = Math.PI / 6;
    var tick = this.tick;
    tick = tick < 30 ? tick : 60 - tick;
    var pap = tick / 30; //paw position
    ctx.moveTo(9 * Math.cos(-2 * bit), 9 * Math.sin(-2 * bit));
    for (var i = 0; i < 4; i++) {
      var pp = i % 2 === 0 ? pap : 1 - pap;
      var angle = -bit - bit * pp;
      var a = (Math.PI / 2) * i;
      ctx.lineTo(15 * Math.cos(angle + a), 15 * Math.sin(angle + a));
      ctx.arc(0, 0, 9, -bit + a, bit + a);
    }
    ctx.closePath();
    ctx.fillStyle = "#552";
    ctx.fill();
    ctx.restore();
    ctx.globalAlpha = 0.3;
    ctx.scale(this.size, this.size);
    ctx.arc(0, 0, 20, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fillStyle = "#88F";
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.restore();
  },
  move: function () {
    var pull = (this.size + 1) / 2;
    this.xv += (ori[2] / 90) * pull;
    this.yv += (ori[1] / 90) * pull;
    this.xv *= 0.99;
    this.yv *= 0.99;
    this.v = Math.sqrt(this.xv * this.xv + this.yv * this.yv);
    this.x += this.xv;
    this.y += this.yv;
    var cwh = cw / 2;
    var chh = ch / 2;
    if (Math.abs(this.x - cwh) > cwh - 20) {
      this.x = this.xv > 0 ? cw - 20 : 20;
      this.xv /= -1.3;
    }
    if (Math.abs(this.y - chh) > chh - 20) {
      this.y = this.yv > 0 ? ch - 20 : 20;
      this.yv /= -1.3;
    }
  },
};

/* 

    #############################################################
      
          @@@@@@@@@@    &&&&&&&&&&&&&&&&&&&    %%%%%%%%%%

(   By ~Aryan Maurya Mr.perfect https://amsrportfolio.netlify.app  )

          @@@@@@@@@@    &&&&&&&&&&&&&&&&&&&    %%%%%%%%%%

    #############################################################

*/

trace = {
  arr: [],
  draw: function () {
    var len = this.arr.length;
    if (len === 60) {
      this.arr.shift();
    }
    this.arr.push([P.x, P.y]);
    var a = this.arr[0];
    ctx.strokeStyle = "#040";
    ctx.globalAlpha = 0.1;
    for (var i = 1; i < len; i++) {
      ctx.beginPath();
      var ratio = i / len;
      var b = this.arr[i - 1];
      ctx.moveTo(b[0], b[1]);
      var c = this.arr[i];
      ctx.lineTo(c[0], c[1]);
      ctx.closePath();
      ctx.lineWidth = ratio * 15;
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  },
};

function Coin() {
  this.xv = 0;
  this.yv = 0;
  this.size = 1;
  this.generate = function () {
    this.x = 10 + Math.random() * (cw - 20);
    this.y = 10 + Math.random() * (ch - 20);
  };
  do {
    this.generate();
  } while (Math.abs(this.x - P.x) < 100 && Math.abs(this.y - P.y) < 30);
  this.draw = function () {
    this.move();
    var d = Math.abs(this.x - P.x);
    var e = Math.abs(this.y - P.y);
    if (Math.sqrt(d * d + e * e) < 30) {
      stats.score++;
      this.dead = true;
    }
    ctx.beginPath();
    ctx.arc(this.x, this.y, 10 * this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fillStyle = "#FF0";
    ctx.stroke();
    ctx.fill();
    ctx.font = 15 * this.size + "px Arial";
    ctx.fillStyle = "#884";
    ctx.fillText("$", this.x - 4.3, this.y + 5);
  };
  this.move = function () {
    this.x += this.xv;
    this.y += this.yv;
  };
}

function SinkHole() {
  this.size = 2;
  this.tick = 0;
  var diag = Math.sqrt(cw * cw + ch * ch);
  this.maxSize = Math.random() * diag * 0.16 + diag * 0.12;
  this.grown = false;
  this.shrinking = false;
  this.generate = function () {
    this.x = 10 + Math.random() * (cw - 20);
    this.y = 10 + Math.random() * (ch - 20);
  };
  do {
    this.generate();
  } while (Math.abs(this.x - P.x) < 100 && Math.abs(this.y - P.y) < 30);
  this.draw = function () {
    if (this.grown) {
      if (this.shrinking) {
        this.size--;
        if (this.size < 1) {
          this.dead = true;
        }
      } else {
        this.tick++;
        if (this.tick > 300) {
          this.shrinking = true;
        }
      }
    } else {
      this.size += 0.4;
      if (this.size > this.maxSize) {
        this.grown = true;
      }
    }
    for (var i = 0; i < 12; i++) {
      ctx.globalAlpha = i !== 11 ? 0.25 : 1;
      ctx.beginPath();
      ctx.arc(
        this.x,
        this.y,
        this.size * (1 - Math.sqrt(i / 2) / Math.sqrt(9)),
        0,
        Math.PI * 2
      );
      ctx.closePath();
      ctx.fillStyle = "#331";
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    var len = coinArray.length;
    for (var i = 0; i < len; i++) {
      this.suck(coinArray[i]);
    }
    this.suck(P, true);
  };
  this.suck = function (cc, p) {
    var adx = this.x - cc.x;
    var ady = this.y - cc.y;
    var dx = Math.abs(adx);
    var dy = Math.abs(ady);
    var dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < this.size) {
      var e = 1 - dist / this.size;
      var d = e / (p ? 4 : 10);
      cc.xv += adx < 0 ? -d : d;
      cc.yv += ady < 0 ? -d : d;
      cc.size = 1 - e;
      if (dist < this.size / 5) {
        cc.dead = true;
      }
    }
  };
}

function Grass(x, y) {
  this.x = x;
  this.y = y;
  this.dArr = []; //[x, y, x, y....]
  var dx = 0;
  for (var i = Math.round(Math.random() * 6 + 1); i > 0; i--) {
    this.dArr.push(2 + Math.random() * 4);
    this.dArr.push(-5 - Math.random() * 10);
  }
  this.draw = function () {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.moveTo(0, 0);
    var x = 0;
    for (var i = this.dArr.length - 2; i >= 0; i -= 2) {
      ctx.lineTo(x + this.dArr[i] / 2, this.dArr[i + 1]);
      x += this.dArr[i];
      ctx.lineTo(x, 0);
    }
    ctx.stroke();
    ctx.restore();
  };
}

function gameOver() {
  canvas.onclick = start;
  clearInterval(interval);
  clearInterval(cInterval);
  clearInterval(sHInterval);
  ctx.fillStyle = "#AAF";
  ctx.fillRect(0, 0, cw, ch);
  ctx.fillStyle = "#FFF";
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 4;
  ctx.font = "600 30px Arial";
  var txt = "Game over! Score:" + stats.score;
  ctx.strokeText(txt, cw / 2 - 130, ch / 2);
  ctx.fillText(txt, cw / 2 - 130, ch / 2);
  ctx.lineWidth = 2;
  ctx.font = "600 20px Arial";
  txt = "press anywhere to try again";
  ctx.strokeText(txt, cw / 2 - 130, ch / 2 + 30);
  ctx.fillText(txt, cw / 2 - 130, ch / 2 + 30);
  stats.score = 0;
}

/* 

    #############################################################
      
          @@@@@@@@@@    &&&&&&&&&&&&&&&&&&&    %%%%%%%%%%

(   By ~Aryan Maurya Mr.perfect https://amsrportfolio.netlify.app  )

          @@@@@@@@@@    &&&&&&&&&&&&&&&&&&&    %%%%%%%%%%

    #############################################################

*/
