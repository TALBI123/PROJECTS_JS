const boerdGame = [...document.querySelector(".boerd-Game").children];
const newRestart = document.querySelector(".btn_restart");
const option1 = document.querySelector(".options-num1");
const label_option = document.querySelector(".label");
const option2 = document.querySelector(".options-2");
const restart = document.querySelector(".restart");
const message = document.querySelector(".winner");
const start = document.querySelector(".start");
const boerd = document.querySelector(".boerd");
const quite = document.querySelector(".quite");
const img = document.querySelector(".img");
const delayMessage = 2500;
const winning = new Audio("Audio/correct.mp3");
const lose = new Audio("Audio/bruh.mp3");
const nowinner = new Audio('Audio/sadmabira.mp3');
const imgLaughin = "imgBear/funnyBear.png",
  imgBearWin = "imgBear/bear.png",
  malalBear = 'imgBear/malalBear.png';
const ROW = 3,
  COL = 3;
const ColorX = "#4070f4",
  ColorO = "tomato",
  ColorDefault = "#d5d2e4db";
let boerd_matrix = [];
let option;
let player; 
let computer;
let isWin = false;
let isRestart = true;
let win = {};
//this function fill the 2d array with character space
const fill = () => {
  for (let i = 0; i < ROW; i++) {
    boerd_matrix[i] = [];
    for (let j = 0; j < COL; j++) boerd_matrix[i][j] = " ";
  }
};
//this function count the number of rest space
const freeSpace = () => {
  let free = ROW * COL;
  for (let i = 0; i < ROW; i++) {
    for (let j = 0; j < COL; j++) {
      if (boerd_matrix[i][j] !== " ") free--;
    }
  }
  return free;
};
//this function custom the buttons of the winner
const custom = (OBJ, player) => {
  let result;
  player = player === "X" ? ColorX : ColorO;
  for (let i = 0; i < COL; i++) {
    /*COL == ROW*/
    result = OBJ[i].row * COL + OBJ[i].col;
    boerdGame[result].style.backgroundColor = player;
    boerdGame[result].style.color = "azure";
  }
};
//this function are conditions of winning
const winner = (player, computer) => {
  let countRowP, countRowC, countColP, countColC;
  for (let i = 0; i < ROW; i++) {
    (countColP = 0), (countColC = 0), (countRowP = 0), (countRowC = 0);
    for (let j = 0; j < COL; j++) {
      //COL Winner
      if (boerd_matrix[i][j] === player) {
        countColP++;
        if (countColP === COL) {
          let arrObj = [];
          for (let $j = 0; $j < COL; $j++) arrObj[$j] = { row: i, col: $j };
          custom(arrObj, player);
          return { $winner: player, str: "win" };
        }
      }
      if (boerd_matrix[i][j] === computer) {
        countColC++;
        if (countColC === COL) {
          let arrObj = [];
          for (let $j = 0; $j < COL; $j++) arrObj[$j] = { row: i, col: $j };
          custom(arrObj, computer);
          return { $winner: computer, str: "win" };
        }
      }
      //ROW Winner
      if (boerd_matrix[j][i] === player) {
        countRowP++;
        if (countRowP === ROW) {
          let arrObj = [];
          for (let $j = 0; $j < COL; $j++) arrObj[$j] = { row: $j, col: i };
          custom(arrObj, player);
          return { $winner: player, str: "win" };
        }
      }
      if (boerd_matrix[j][i] === computer) {
        countRowC++;
        if (countRowC === ROW) {
          let arrObj = [];
          for (let $j = 0; $j < COL; $j++) arrObj[$j] = { row: $j, col: i };
          custom(arrObj, computer);
          return { $winner: computer, str: "win" };
        }
      }
    }
  }
  (countRowP = 0), (countRowC = 0), (countColP = 0), (countColC = 0);
  for (let i = 0; i < ROW; i++) {
    for (let j = 0; j < COL; j++) {
      if (boerd_matrix[i][j] === player && i === j) {
        countRowP++;
        if (countRowP === ROW) {
          let arrObj = [];
          for (let $i = 0; $i < COL; $i++) arrObj[$i] = { row: $i, col: $i };
          custom(arrObj, player);
          return { $winner: player, str: "win" };
        }
      }
      if (boerd_matrix[i][j] === computer && i === j) {
        countRowC++;
        if (countRowC === ROW) {
          let arrObj = [];
          for (let $i = 0; $i < COL; $i++) arrObj[$i] = { row: $i, col: $i };
          custom(arrObj, computer);
          return { $winner: computer, str: "win" };
        }
      }
      if (boerd_matrix[i][j] === player && i === COL - 1 - j) {
        countColP++;
        if (countColP === ROW) {
          let arrObj = [];
          for (let $i = 0; $i < COL; $i++)
            arrObj[$i] = { row: $i, col: COL - 1 - $i };
          custom(arrObj, player);
          return { $winner: player, str: "win" };
        }
      }
      if (boerd_matrix[i][j] === computer && i === COL - 1 - j) {
        countColC++;
        if (countColC === ROW) {
          let arrObj = [];
          for (let $i = 0; $i < COL; $i++)
            arrObj[$i] = { row: $i, col: COL - 1 - $i };
          custom(arrObj, computer);
          return { $winner: computer, str: "win" };
        }
      }
    }
  }
  return;
};
//this function remove classes he removed the elm width a scale 0
const rem = (obj1, obj2) => {
  obj1.classList.add("remove_smothly");
  if (obj1 === boerd) obj1.classList.add("disabled");
  setTimeout(() => {
    if (!obj1.classList.contains("disabled")) obj1.classList.add("disabled");
    obj2.classList.remove("disabled");
  }, 500);
};
//this function add the classes to add cursor default when you win or stoped the game
const cusorDefault = (...arrOfClass) => {
  boerdGame.forEach((btn) => {
    btn.classList.add(...arrOfClass);
  });
};
//this function remove the first element and show the seconde element smothly
const removeSmothly = (obj1, obj2) => {
  if (obj2.classList.contains("remove_smothly"))
    obj2.classList.remove("remove_smothly");
  rem(obj1, obj2);
};
const quiteFunc = (obj1, obj2) => {
  quite.addEventListener("click", () => {
    isWin = false;
    if (obj1.classList.contains("active")) obj1.classList.remove("active");
    obj2.classList.remove("remove_smothly");
    rem(obj1, obj2);
  });
};
const clear = () => {
  fill();
  boerdGame.forEach(btn => {
    btn.textContent = "";
    btn.style.backgroundColor = ColorDefault;
    if (btn.classList.contains("clicked")) btn.classList.remove("clicked");
    btn.classList.remove("disb_btn");
    btn.classList.remove('no-winner');
  });
  [...label_option.children].forEach((label) => {
    if (label.classList.contains("checked")) label.classList.remove("checked");
  });
  restart.classList.remove("disb_btn");
};
const restartFunc = (obj1, obj2) => {
  clear();
  if (obj1.classList.contains("active")) obj1.classList.remove("active");
  removeSmothly(obj1, obj2);
  [...label_option.children].forEach((label, index) => {
    if (label.classList.contains("checked")) label.classList.remove("checked");
    if (index === +sessionStorage.getItem("index")) {
      label.classList.add("checked");
    }
  });
  label_option.children[0].style.setProperty(
    "--translate",
    `translateX(${(+sessionStorage.getItem("index") !== 0 ? 1 : 0) * 100}%)`
  );
};
const opionLabel = () => {
  let i;
  [...label_option.children].forEach((elm, newIndex) => {
    if (elm.classList.contains("checked")) {
      i = newIndex;
      return;
    }
  });
  return i;
};
const moveLabel = (btn, index) => {
  btn.classList.add("clicked");
  label_option.children[index].classList.remove("checked");
  label_option.children[index === 0 ? 1 : 0].classList.add("checked");
  label_option.children[0].style.setProperty(
    "--translate",
    `translateX(${(index === 0 ? 1 : 0) * 100}%)`
  );
  return index === 0 ? 1 : 0;
};
const winnerCondition = (condition) => {
  if (!condition) return;
  isWin = true;
  cusorDefault("disb_btn");
  restart.classList.add("disb_btn");
  message.classList.remove("disabled");
  img.style.backgroundImage = `url(${
    player === win.$winner ? imgBearWin : imgLaughin
  })`;
  if(player === win.$winner)
    winning.play();
  else
    lose.play();
  setTimeout(() => {
    message.classList.add("active");
    removeSmothly(boerd, message);
    message.style.backgroundColor = win.$winner === "X" ? ColorX : ColorO;
    message.firstElementChild.textContent =
      win.$winner === player
        ? `Tawara rlabti ri bot mkala5`
        : `waaaa3 ralbo Bot`;
    clear();
  }, delayMessage);
};
const noWinner = (cond) => {
  if (!cond) return;
  isWin = true;
  restart.classList.add("disb_btn");
  message.classList.remove("disabled");
  cusorDefault("disb_btn","no-winner");
  setTimeout(() => {
    img.style.backgroundImage = `url(${malalBear})`;
    message.classList.add("active");
    boerd.classList.add("disabled");
    message.firstElementChild.textContent =
      "NO ONE WIN Bjoj Kom Mkal5in";
    message.style.backgroundColor = "#7e7d7dd7";
    clear();
  },delayMessage);
  nowinner.play();
};
const randInt = () => ~~(Math.random() * ROW);
fill();
start.addEventListener("click", () => {
  removeSmothly(start, option1);
});
[...option1.children].forEach((op) => {
  op.addEventListener("click", () => {
    removeSmothly(option1, option2);
    option = op.textContent === "two players";
    [...option2.children].forEach((op, index) => {
      op.addEventListener("click", () => {
        removeSmothly(option2, boerd);
        player = op.textContent === "X" ? "X" : "O";
        computer = player === "X" ? "O" : "X";
        sessionStorage.setItem("index", index);
        label_option.children[index].classList.add("checked");
        label_option.children[0].style.setProperty(
          "--translate",
          `translateX(${+(index !== 0) * 100}%)`
        );
        if (option) {
          let i;
          boerdGame.forEach((btn, index1) => {
            let newRow = ~~(index1 / ROW);
            let newCol = index1 % COL;
            btn.addEventListener("click", () => {
              if (isWin || !option || btn.classList.contains("clicked")) return;
              i = opionLabel();
              boerd_matrix[newRow][newCol] =
                label_option.children[i].textContent === "X" ? "X" : "O";
              btn.textContent =
                label_option.children[i].textContent === "X" ? "X" : "O";
              btn.style.color =
                label_option.children[i].textContent === "X" ? ColorX : ColorO;
              btn.classList.add("clicked");
              label_option.children[i].classList.remove("checked");
              label_option.children[i === 0 ? 1 : 0].classList.add("checked");
              label_option.children[0].style.setProperty(
                "--translate",
                `translateX(${(i === 0 ? 1 : 0) * 100}%)`
              );
              //when restart the game after playing if peress on th restart button
              restart.addEventListener("click", () => {
                if (!restart.classList.contains("disb_btn"))
                  restartFunc(message, boerd);
              });
              win = { ...winner(player, computer) };
              if (win.str === "win") {
                console.log(`winner is ${win.$winner}`);
                isWin = true;
                isRestart = false;
                restart.classList.add("disb_btn");
                message.classList.remove("disabled");
                cusorDefault("disb_btn");
                winning.play();
                setTimeout(() => {
                  img.style.backgroundImage = `url(${imgBearWin})`;
                  message.classList.add("active");
                  removeSmothly(boerd, message);
                  message.style.backgroundColor =
                    win.$winner === "X" ? ColorX : ColorO;
                  message.firstElementChild.textContent =
                    win.$winner === player
                      ? `Winner is ${win.$winner} the player ${
                          win.$winner === player ? 1 : 2
                        }`
                      : `Winner is ${win.$winner} the player ${
                          win.$winner === player ? 1 : 2
                        }`;
                  quiteFunc(message, start);
                  clear();
                  newRestart.addEventListener("click", () => {
                    restartFunc(message, boerd);
                  });
                  isWin = false;
                }, delayMessage);
                return;
              } //NO winner
              if (freeSpace() === 0) {
                message.classList.remove("disabled");
                cusorDefault("disb_btn", "no-winner");
                restart.classList.add("disb_btn");
                nowinner.play();
                setTimeout(() => {
                  img.style.backgroundImage = `url(${malalBear})`;
                  message.classList.add("active");
                  boerd.classList.add("disabled");
                  message.firstElementChild.textContent =
                    "NO ONE WIN Bjoj Kom Mkal5in";
                  message.style.backgroundColor = "#7e7d7dd7";
                  quiteFunc(message, start);
                  newRestart.addEventListener('click',() => {
                    isWin = false;
                    restartFunc(message, boerd);
                  });
                  clear();
                  isWin = false;
                }, delayMessage);
              }
            });
          });
        } else {
          let i;
          boerdGame.forEach((newBtn, newIndex) => {
            let newRow = ~~(newIndex / ROW);
            let newCol = newIndex % COL;
            let rand1, rand2;
            newBtn.addEventListener("click", () => {
              if (newBtn.classList.contains("clicked") || isWin || option)
                return;
              newBtn.textContent = player;
              newBtn.style.color = player === "X" ? ColorX : ColorO;
              i = opionLabel();
              boerd_matrix[newRow][newCol] = player;
              i = moveLabel(newBtn, i);
              win = { ...winner(player, computer) };
              winnerCondition(win.str === "win");
              if (win.str !== "win") noWinner(freeSpace() === 0);
              if (isWin) return;
              do {
                rand1 = randInt();
                rand2 = randInt();
                if (freeSpace() === 0) {
                  isWin = true;
                  break;
                }
              } while (boerd_matrix[rand1][rand2] !== " ");
              boerd_matrix[rand1][rand2] = computer;
              setTimeout(() => {
                newBtn.parentElement.children[rand1 * COL + rand2].textContent =
                  computer;
                newBtn.parentElement.children[rand1 * COL + rand2].style.color =
                  computer === "X" ? ColorX : ColorO;
                moveLabel(
                  newBtn.parentElement.children[rand1 * COL + rand2],
                  i
                );
                win = { ...winner(player, computer) };
                winnerCondition(win.str === "win");
                if (win.str !== "win") noWinner(freeSpace() === 0);
                newRestart.addEventListener("click", () => {
                  isWin = false;
                  restartFunc(message, boerd);
                });
                quiteFunc(message, start);
              }, 600);
              restart.addEventListener("click", () => {
                if (!restart.classList.contains("disb_btn"))
                  restartFunc(message, boerd);
              });
            });
          });
        }
      });
    });
  });
});