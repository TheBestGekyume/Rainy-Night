const modal = document.getElementById('modal');
const imgModal = document.getElementById('img-modal');
const usuarioInput = document.getElementById('usuario');
const header = document.querySelector('header');
const headerImg = document.getElementById('headerImg');

document.addEventListener("DOMContentLoaded", function () {

    header.classList.add("headerTransition");
    headerImg.classList.add("opacity100")

});

imgModal.addEventListener("click", function () {
  usuarioInput.focus();
})

function abrirModal() {
  modal.style.display = 'flex';
}

function fecharModal() {
  modal.style.display = 'none';
}

function paraGame() {
  const nome = document.getElementById("usuario").value;
  alert(nome + ', use fones de ouvido para ter a experiência completa.');
  window.location.href = 'game/game.html';
}

