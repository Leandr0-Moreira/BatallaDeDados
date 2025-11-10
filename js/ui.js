//User interface
const UI = {
  //pantalla home
  mostrarJuego() {
    document.getElementById("inicio").classList.add("d-none");
    document.getElementById("juego").classList.remove("d-none");
  },

  //jugadores
  actualizarNombres(jugador1, jugador2) {
    document.getElementById("nombreJ1").innerText = jugador1.nombre;
    document.getElementById("nombreJ2").innerText = jugador2.nombre;
  },

  //puntos, tiradas y rondasGanadas
  actualizarEstadisticas(jugador1, jugador2) {
    document.getElementById("puntosJ1").innerText = jugador1.puntos;
    document.getElementById("tirosJ1").innerText = jugador1.tiros;
    document.getElementById("rondasJ1").innerText = jugador1.rondasGanadas;

    document.getElementById("puntosJ2").innerText = jugador2.puntos;
    document.getElementById("tirosJ2").innerText = jugador2.tiros;
    document.getElementById("rondasJ2").innerText = jugador2.rondasGanadas;
  },

 //imagen dado
  actualizarDados(valor1, valor2) {
    const dadoJ1 = document.getElementById("dadoJ1");
    const dadoJ2 = document.getElementById("dadoJ2");

    dadoJ1.src = `assets/dado${valor1}.png`;
    dadoJ2.src = `assets/dado${valor2}.png`;
  },
  //mensaje por cada ronda
  mostrarMensaje(texto, color = "text-success") {
    const mensaje = document.getElementById("mensajeRonda");
    mensaje.className = `fw-bold ${color}`;
    mensaje.innerText = texto;
  },

  //confeti
  mostrarConfetti() {
    if (typeof confetti === "function") {
      const duration = 3000; // 3 segundos
      const end = Date.now() + duration;

      (function frame() {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    }
  },

  //reiniciar
  limpiarTablero() {
    document.getElementById("mensajeRonda").innerText = "";
    this.actualizarDados(1, 1);
    this.actualizarEstadisticas(
      { puntos: 0, tiros: 0, rondasGanadas: 0 },
      { puntos: 0, tiros: 0, rondasGanadas: 0 }
    );
  },

  //desactivar el boton lanzar al ganar uno
  bloquearBotonLanzar() {
    const btnLanzar = document.getElementById("btnLanzar");
    btnLanzar.disabled = true;
    btnLanzar.classList.add("disabled", "opacity-50");
  },
  //desbloquear al reiniciar
  desbloquearBotonLanzar() {
    const btnLanzar = document.getElementById("btnLanzar");
    btnLanzar.disabled = false;
    btnLanzar.classList.remove("disabled", "opacity-50");
  },

 //volver al home
  mostrarInicio() {
    document.getElementById("juego").classList.add("d-none");
    document.getElementById("inicio").classList.remove("d-none");
  },

};
