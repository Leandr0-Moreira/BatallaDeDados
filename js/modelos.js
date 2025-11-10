class Jugador {
  constructor(nombre, avatar) {
    this.nombre = nombre;
    this.avatar = avatar;
    this.puntos = 0;
    this.tiros = 0;
    this.rondasGanadas = 0;
  }

  sumarPuntos(valor) {
    this.puntos += valor;
    this.tiros++;
  }

  reiniciarRonda() {
    this.puntos = 0;
  }

  ganarRonda() {
    this.rondasGanadas++;
  }
}

class Partida {
  constructor(jugador1, jugador2) {
    this.jugador1 = jugador1;
    this.jugador2 = jugador2;
    this.rondaActual = 1;
    this.estado = "en curso";
    this.resultadoRonda = null;
  }

  tirarDados() {
    const dado1 = Math.floor(Math.random() * 6) + 1;
    const dado2 = Math.floor(Math.random() * 6) + 1;

    this.jugador1.sumarPuntos(dado1);
    this.jugador2.sumarPuntos(dado2);

    this.resultadoRonda = {
      dado1: dado1,
      dado2: dado2,
      ganador: null,
    };

    return this.resultadoRonda;
  }

  determinarGanador() {
    const { dado1, dado2 } = this.resultadoRonda;

    if (dado1 > dado2) {
      this.jugador1.ganarRonda();
      this.resultadoRonda.ganador = this.jugador1.nombre;
    } else if (dado2 > dado1) {
      this.jugador2.ganarRonda();
      this.resultadoRonda.ganador = this.jugador2.nombre;
    } else {
      this.resultadoRonda.ganador = "Empate";
    }

    if (this.esFinDePartida()) this.estado = "finalizada";
    return this.resultadoRonda.ganador;
  }

  reiniciarRonda() {
    this.jugador1.reiniciarRonda();
    this.jugador2.reiniciarRonda();
    this.rondaActual++;
  }

  esFinDePartida() {
    return (
      this.jugador1.rondasGanadas >= 5 || this.jugador2.rondasGanadas >= 5
    );
  }

  guardarEstado() {
    const estado = {
      jugador1: this.jugador1,
      jugador2: this.jugador2,
      rondaActual: this.rondaActual,
      estado: this.estado,
    };
    localStorage.setItem("batalla-dados:partida", JSON.stringify(estado));
  }

  cargarEstado() {
    const datos = localStorage.getItem("batalla-dados:partida");
    if (!datos) return null;

    const obj = JSON.parse(datos);
    this.jugador1 = Object.assign(new Jugador(), obj.jugador1);
    this.jugador2 = Object.assign(new Jugador(), obj.jugador2);
    this.rondaActual = obj.rondaActual;
    this.estado = obj.estado;
  }

  reiniciarPartida() {
    this.jugador1.reiniciarRonda();
    this.jugador2.reiniciarRonda();
    this.jugador1.rondasGanadas = 0;
    this.jugador2.rondasGanadas = 0;
    this.rondaActual = 1;
    this.estado = "en curso";
    this.resultadoRonda = null;
    localStorage.removeItem("batalla-dados:partida");
  }
}
