var canvas1;
var canvas2;
var ctx1;
var ctx2;
var phase_load = 0;
var phase_init = 1;
var phase_idle = 2;
var phase_anime = 3;
var phase_finish = 4;
var phase;
var picture;
var pieceno;
var piecedata;
var lastpieceno;
var animeseq;
var loaded;
var gameno;
var width = (1+49*4);
var height = (1+49*4);

///////////////////////
// �e�폈���֐�
///////////////////////
//--------------------------------
// �摜�ǂݍ���
//--------------------------------
function loadpicture(gemeno) {

  picture = new Image();
  picture.onload = function(){
       ctx1.drawImage(picture,0,0);
     loaded = true;
  };
  picture.src = "./pic/" + gameno + ".jpg";
}

//--------------------------------
// �Q�[��������
//--------------------------------
function initgame() {

  var pos;
  var str,tm;
  
  pos = 0;
  ctx1.font = "bold 14px 'Times New Roman'";
  ctx1.fillStyle = "rgb(255,255,255)";
  for (var y = 0; y < 4; y++){
    for (var x = 0; x < 4; x++){
      str = String(pos+1);
      tm = ctx1.measureText(str);
      ctx1.fillText(str,x*48+48-tm.width-3,y*48+42);
      piecedata[pos] = ctx1.getImageData(x*48,y*48,48,48);
      pieceno[pos] = pos;
      pos += 1;
    }
  }
  pieceno[15] = -1;

}

function shuffle() {
  var dirnum;
  var dirx,diry;
  var x,y;
  var movedir;

  dirx = new Array(4);
  diry = new Array(4);
  for (var i = 0; i < 500; i++) {
    for (var j = 0; j < 16; j++) {
      if (pieceno[j] < 0) {
        x = j%4;
        y = Math.floor(j/4);
        break;
      }
    }
    dirnum = 0;
    if (x >= 1) {
      dirx[dirnum] = -1;
      diry[dirnum] = 0;
      dirnum += 1;
    }
    if (x <= 2) {
      dirx[dirnum] = 1;
      diry[dirnum] = 0;
      dirnum += 1;
    }
    if (y >= 1) {
      dirx[dirnum] = 0;
      diry[dirnum] = -1;
      dirnum += 1;
    }
    if (y <= 2) {
      dirx[dirnum] = 0;
      diry[dirnum] = 1;
      dirnum += 1;
    }
    movedir = Math.floor(Math.random()*dirnum);
    move(x+dirx[movedir],y+diry[movedir]);
  }
}

function move(piecex,piecey) {
  var blankx,blanky;
  var dx,dy;

  for (var i = 0; i < 16; i++) {
    if (pieceno[i] < 0) {
      blankx = i%4;
      blanky = Math.floor(i/4);
      break;
    }
  }
  if (piecey == blanky) {
    dy = 0;
    if (blankx < piecex) {
      dx = 1;
    } else {
      dx = -1;
    }
  } else {
    dx = 0;
    if (blanky < piecey) {
      dy = 1;
    } else {
      dy = -1;
    }
  }
  pieceno[blankx+blanky*4] = pieceno[(blankx+dx)+(blanky+dy)*4];
  pieceno[(blankx+dx)+(blanky+dy)*4] = -1;
  if (piecey == (blanky+dy) && piecex == (blankx+dx)) {
    return;
  }
  move(piecex,piecey);
}

function checkmove(piecex,piecey) {
  var blankx,blanky;

  for (var i = 0; i < 16; i++) {
    if (pieceno[i] < 0) {
      blankx = i%4;
      blanky = Math.floor(i/4);
      break;
    }
  }
  if (blanky == piecey || blankx == piecex) {
    if (blanky == piecey && blankx == piecex) {
      return false;
    }
    return true;
  }
  return false;
}

function checkfinish() {
  for (var i = 0; i < 15; i++) {
    if (pieceno[i] != i) {
      return false;
    }
  }
  return true;
}

function initanime() {
  for (var i = 0; i < 16; i++) {
    lastpieceno[i] = pieceno[i];
  }
  animeseq = 0;
}

function exeanime() {
  animeseq += 1;
}

function checkanimeend() {
  if (animeseq == 6) {
    return true;
  }
  return false;
}

function draw() {
  var lx,ly,posx,posy;

  ctx2.fillStyle = "rgb(200,200,200)";
  ctx2.fillRect(0,0,width,height);
  for (y = 0; y < 4; y++) {
    for (x = 0; x < 4; x++) {
      no = pieceno[x+y*4];
      if (no < 0) {
        continue;
      }
      if (no == lastpieceno[x+y*4] || phase != phase_anime) {
        ctx2.putImageData(piecedata[no],1+x*49,1+y*49);
        continue;
      }
      for (var i = 0; i < 16; i++) {
        if (lastpieceno[i] == no) {
          lx = i%4;
          ly = Math.floor(i/4);
          break;
        }
      }
      posx = 1+lx*49;
      posy = 1+ly*49;
      if (lx == x) {
        if (ly > y) {
          posy -= animeseq*8; 
        } else {
          posy += animeseq*8; 
        }
      } else {
        if (lx > x) {
          posx -= animeseq*8;
        } else {
          posx += animeseq*8;
        }
      }
      ctx2.putImageData(piecedata[no],posx,posy);
    }
  }
}

function drawfinish() {
    var str,tm;
    var imagedata;
    var datasize;

    imagedata = ctx2.getImageData(0,0,width,height);
    datasize = width*height*4;
    for (var pos = 0; pos < datasize;) {
      imagedata.data[pos++] /= 2;
      imagedata.data[pos++] /= 2;
      imagedata.data[pos++] /= 2;
      pos += 1;
    }
    ctx2.putImageData(imagedata,0,0);
    ctx2.fillStyle = "rgb(255,255,255)";
    ctx2.font = "20px 'Times New Roman'";
    str = "Completed!!";
    tm = ctx2.measureText(str);
    ctx2.fillText(str,(width-tm.width)/2,height/2+10);

    updateGameno();
    
    // ��U�Q�[�����y���~�߂�
    pauseaudio("id_audioGamaStart");
    
        // �N���A���y�𗬂�
    playaudio("id_audioGamaClear", false);
    
}

/////////////////////////////
// localStorage�̔ԍ��X�V
/////////////////////////////
function updateGameno(){
    var gamenoTmp = localStorage.getItem("TSato_15puzzle_no");
    var gameNoOld = parseInt(gamenoTmp);
    if (gameNoOld == null){
        gameNoNew = 1;
    } else if (gameNoOld < 3) {
        gameNoNew = gameNoOld + 1;
    } else {
       gameNoNew = 0;
    }
    localStorage.setItem("TSato_15puzzle_no",String(gameNoNew));
}

/////////////////////////////
// �C�x���g�����֐�
/////////////////////////////
// �}�E�X�C�x���g�̏����֐�
function clickfunc(event) {
  var rect = event.target.getBoundingClientRect();
�@var x = event.clientX - rect.left;
�@var y = event.clientY - rect.top;
  var piecex = Math.floor((x-1)/49);
  var piecey = Math.floor((y-1)/49);

  switch (phase) {
  case phase_init:
    if (piecex == 3 && piecey == 3) {
      // �󂫃}�X���N���b�N���ꂽ�ꍇ�̓Q�[���ԍ������Z�b�g
      gameno = 0;
      localStorage.removeItem("TSato_15puzzle_no");
      loaded = false;
      loadpicture(gameno);
      phase = phase_load;
    } else {
      // �Q�[�����J�n
      shuffle();
      draw();
      phase = phase_idle;
    }
    break;
  case phase_idle:
    if (checkmove(piecex,piecey)) {
      initanime();
      move(piecex,piecey);
      phase = phase_anime;
    }
    break;
  case phase_finish:
    loaded = false;
    loadpicture(gameno);
    phase = phase_load;
    break;
  }
}


function timerfunc() {
  switch (phase) {
  case phase_load:
    if (loaded) {
      initgame();
      draw();
      phase = phase_init;
    }
    break;
  case phase_anime:

     if (checkanimeend()) {
       if (checkfinish()) {
         gameno += 1;
         if (gameno == 4) {
           gameno = 0;
         }
         drawfinish();
         localStorage.setItem("TSato_15puzzle_no",String(gameno));
         phase = phase_finish;
       } else {
         phase = phase_idle;
         draw();
       }
�@�@ } else {
       exeanime();
       draw();
     }
     break;
  }
}

// ----------------------------
// ���y���Đ�����
// �����P�F�Đ�����audio�̃G�������gID
// �����Q�F���[�v�Đ�����
// ----------------------------
function playaudio(audioId , isRoop){
  
  var audioItem = document.getElementById(audioId);

  audioItem.currentTime = 0;
  
  if (isRoop) {
      audioItem.loop = true;
  }
  audioItem.play();
  
}

// ----------------------------
// 
// ----------------------------
function pauseaudio(audioId){
  
  var audioItem = document.getElementById(audioId);
  
  audioItem.pause();
  
}

function Sleep( T ){ 
   var d1 = new Date().getTime(); 
   var d2 = new Date().getTime(); 
   while( d2 < d1+1000*T ){    //T�b�҂� 
       d2=new Date().getTime(); 
   } 
   return; 
} 
