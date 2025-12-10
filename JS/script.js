const currentPlayer = document.querySelector(".current-player");
const changeThemeBtn = document.getElementById("change-theme");
const gameModal = document.getElementById("game-modal");
const modalMessage = document.getElementById("modal-message");
const modalCloseBtn = document.getElementById("modal-close-btn");

let selected;
let player1 = '<i class="fa-solid fa-xmark fa-2x"></i>';
let player2 = '<i class="fa-solid fa-o fa-2x"></i>';

let positions = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

function showModal(message) {
  modalMessage.textContent = message;
  gameModal.classList.add("show");
}

function closeModal() {
  gameModal.classList.remove("show");
  init();
}

modalCloseBtn.addEventListener("click", closeModal);
gameModal.addEventListener("click", (e) => {
  if (e.target === gameModal) {
    closeModal();
  }
});

function init() {
  selected = [];

  player1 = '<i class="fa-solid fa-xmark fa-2x"></i>';
  player2 = '<i class="fa-solid fa-o fa-2x"></i>';

  currentPlayer.innerHTML = `It's ${player1} turn.`;

  document.querySelectorAll(".game button").forEach((item) => {
    item.innerHTML = "";
    item.addEventListener("click", newMove);
  });
}

init();

function newMove(e) {
  const index = e.target.getAttribute("data-i");
  e.target.innerHTML = player1;
  e.target.removeEventListener("click", newMove);
  selected[index] = player1;

  setTimeout(() => {
    check();
  }, [100]);

  player1 =
    player1 === '<i class="fa-solid fa-xmark fa-2x"></i>'
      ? '<i class="fa-solid fa-o fa-2x"></i>'
      : '<i class="fa-solid fa-xmark fa-2x"></i>';
  currentPlayer.innerHTML = `It's ${player1} turn.`;
}

function check() {
  let playerLastMove =
    player1 === '<i class="fa-solid fa-xmark fa-2x"></i>'
      ? '<i class="fa-solid fa-o fa-2x"></i>'
      : '<i class="fa-solid fa-xmark fa-2x"></i>';

  const items = selected
    .map((item, i) => [item, i])
    .filter((item) => item[0] === playerLastMove)
    .map((item) => item[1]);

  for (pos of positions) {
    if (pos.every((item) => items.includes(item))) {
      const jogadorVitorioso =
        playerLastMove == '<i class="fa-solid fa-xmark fa-2x"></i>' ? "X" : "O";

      showModal(`🎉 The player '${jogadorVitorioso}' won!`);
      return;
    }
  }

  if (selected.filter((item) => item).length === 9) {
    showModal("😅 It's a draw!");
    return;
  }
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

function loadTheme() {
  const darkMode = localStorage.getItem("dark");

  if (darkMode) {
    toggleDarkMode();
  }
}

loadTheme();

changeThemeBtn.addEventListener("change", function () {
  toggleDarkMode();

  localStorage.removeItem("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("dark", 1);
  }
});
