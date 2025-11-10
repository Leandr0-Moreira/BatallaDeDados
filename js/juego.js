// Referencias a los elementos del DOM
const btnJugar = document.getElementById("btnJugar");
const btnLanzar = document.getElementById("btnLanzar");
const btnSalir = document.getElementById("btnSalir");
const btnReiniciar = document.getElementById("btnReiniciar");

const inputJ1 = document.getElementById("jugador1");
const inputJ2 = document.getElementById("jugador2");

//variable globales
let jugador1, jugador2, partida;


btnJugar.addEventListener("click", () => {
  const nombre1 = inputJ1.value.trim();
  const nombre2 = inputJ2.value.trim();

//nombres obligatorios
if (nombre1 === "" || nombre2 === "") {
  const alerta = document.getElementById("alertaInicio");
  alerta.classList.remove("d-none", "animate__fadeOutUp");
  alerta.classList.add("animate__animated", "animate__fadeInDown");

  // Ocultar después de 3 segundos con una animación de salida
  setTimeout(() => {
    alerta.classList.remove("animate__fadeInDown");
    alerta.classList.add("animate__fadeOutUp");
    setTimeout(() => alerta.classList.add("d-none"), 1000);
  }, 3000);

  return;
}

  // Nombres duplicados 
  else if (nombre1 === nombre2) {
  const alerta = document.getElementById("alertaInicio");
  alerta.innerHTML = `<strong>Batalla de Dados dice:</strong> Los nombres de los jugadores deben ser diferentes.`;
  alerta.classList.remove("d-none", "animate__fadeOutUp");
  alerta.classList.add("animate__animated", "animate__fadeInDown");

  setTimeout(() => {
    alerta.classList.remove("animate__fadeInDown");
    alerta.classList.add("animate__fadeOutUp");
    setTimeout(() => alerta.classList.add("d-none"), 1000);
  }, 3000);

  return;
}
// Crear jugadores y partida
  jugador1 = new Jugador(nombre1, "assets/avatar.png");
  jugador2 = new Jugador(nombre2, "assets/avatar.png");
  partida = new Partida(jugador1, jugador2);

  // Cambiar a pantalla de juego
  UI.mostrarJuego();
  UI.actualizarNombres(jugador1, jugador2);
  UI.actualizarEstadisticas(jugador1, jugador2);
  UI.actualizarDados(1, 1);
  UI.mostrarMensaje("¡Comienza la batalla!");
});

//al presionar jugar empezar ronda
btnLanzar.addEventListener("click", () => {
  // Si aún no hay partida o ya terminó, no hacer nada
  if (!partida || partida.estado === "finalizada") return;

  const resultado = partida.tirarDados();

  UI.actualizarDados(resultado.dado1, resultado.dado2);
  UI.actualizarEstadisticas(jugador1, jugador2);

  const ganador = partida.determinarGanador();

  if (ganador === "Empate") {
    UI.mostrarMensaje("¡Empate! Tiren de nuevo.", "text-warning");
  } else {
    UI.mostrarMensaje(`¡Ganaste la ronda, ${ganador}! 🏆`, "text-success");
  }

  UI.actualizarEstadisticas(jugador1, jugador2);

  //guardar en localStorage
  partida.guardarEstado();

  if (partida.estado === "finalizada") {
    UI.mostrarConfetti();
    UI.mostrarMensaje(`🎉 ¡${ganador} ganó la partida! 🎉`, "text-success");
    UI.actualizarEstadisticas(jugador1, jugador2);
    UI.bloquearBotonLanzar();
  } else {
  //timeout antes de iniciar
    setTimeout(() => {
      partida.reiniciarRonda();
      UI.actualizarEstadisticas(jugador1, jugador2);
      UI.mostrarMensaje(`Ronda ${partida.rondaActual} lista.`);
    }, 1200);
  }
});


btnSalir.addEventListener("click", () => {
  // Borrar estado en memoria y en localStorage
  jugador1 = null;
  jugador2 = null;
  partida = null;
  localStorage.removeItem("batalla-dados:partida");

  inputJ1.value = "";
  inputJ2.value = "";

  UI.limpiarTablero(); 
  UI.bloquearBotonLanzar();

  // Volver a la pantalla de inicio
  document.getElementById("juego").classList.add("d-none");
  document.getElementById("inicio").classList.remove("d-none");
});

//reiniciar mantiene jugadores
btnReiniciar.addEventListener("click", () => {
  if (!jugador1 || !jugador2) return;
  
  partida.reiniciarPartida();

  UI.limpiarTablero();
  UI.actualizarNombres(jugador1, jugador2);
  UI.actualizarEstadisticas(jugador1, jugador2);
  UI.mostrarMensaje("Nueva partida, ¡a jugar!");

    const btnLanzar = document.getElementById("btnLanzar");
  btnLanzar.disabled = false;
  btnLanzar.classList.remove("disabled", "opacity-50");

  //guardar en localstorage
  partida.guardarEstado();
});
