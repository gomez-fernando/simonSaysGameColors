$(document).ready(function () {
  // swal('Bienvenido a Simón dice', 'Intenta seguir la secuencia. \nEl juego consta de 10 niveles.\nSuerte!', 'info')

  swal('Bienvenido a Simón dice', 'Intenta seguir la secuencia.')
  
  // Selector de tema
  var theme = $('#theme')
  
  $('#to-gray').click(function () {
    theme.attr('href', 'css/gray_theme.css')
  })
  
  $('#to-green').click(function () {
    theme.attr('href', 'css/green_theme.css')
  })
  
  $('#to-red').click(function () {
    theme.attr('href', 'css/red_theme.css')
  })
  
  $('#to-blue').click(function () {
    theme.attr('href', 'css/blue_theme.css')
  })
  
  $('#to-black').click(function () {
    theme.attr('href', 'css/black_theme.css')
  })
  
  ////////////////////////////////////
  
})
  
  
  const celeste = document.getElementById('celeste')
  const violeta = document.getElementById('violeta')
  const naranja = document.getElementById('naranja')
  const verde = document.getElementById('verde')
  const btnEmpezar = document.getElementById('btnEmpezar')
  const ULTIMO_NIVEL = 1000
  
  class Juego {
    constructor() {
    this.inicializar = this.inicializar.bind(this)
    this.inicializar()
    this.generarSecuencia()
    setTimeout(this.siguienteNivel, 500)
  }

  inicializar() {
    this.siguienteNivel = this.siguienteNivel.bind(this)
    this.elegirColor = this.elegirColor.bind(this)
    this.toggleBtnEmpezar()
    this.nivel = 1
    this.colores = {
      // celeste: celeste   Si llevan el mismo nombre nos ahorramos los dos puntos
      celeste,
      violeta,
      naranja,
      verde
    }
  }

  toggleBtnEmpezar() {
    if (btnEmpezar.classList.contains('hide')) {
      btnEmpezar.classList.remove('hide')
    } else {
      btnEmpezar.classList.add('hide')
    }
  }
  
  generarSecuencia() {
    this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 4))
  }

  siguienteNivel() {
    this.subnivel = 0
    this.eliminarEventosClick()
    this.iluminarSecuencia()
    this.agregarEventosClick()
  }

  transformarNumeroAColor(numero) {
    switch (numero) {
      case 0:
        return 'celeste'
        case 1:
        return 'violeta'
        case 2:
          return 'naranja'
      case 3:
        return 'verde'
    }
  }
  
  transformarColorANumero(color) {
    switch (color) {
      case 'celeste':
        return 0
        case 'violeta':
          return 1
          case 'naranja':
            return 2
            case 'verde':
              return 3
            }
          }
          
  iluminarSecuencia() {
    for (let i = 0; i < this.nivel; i++) {
      const color = this.transformarNumeroAColor(this.secuencia[i])
      setTimeout(() => this.iluminarColor(color), 1000 * i)
    }
  }

  iluminarColor(color) {
    console.log(color)
    this.colores[color].classList.add('light')
    setTimeout(() => this.apagarColor(color), 350);
  }
  
  apagarColor(color) {
    this.colores[color].classList.remove('light')
  }

  agregarEventosClick() {
    this.colores.celeste.addEventListener('click', this.elegirColor)
    this.colores.verde.addEventListener('click', this.elegirColor)
    this.colores.violeta.addEventListener('click', this.elegirColor)
    this.colores.naranja.addEventListener('click', this.elegirColor)
  }

  eliminarEventosClick() {
    this.colores.celeste.removeEventListener('click', this.elegirColor)
    this.colores.verde.removeEventListener('click', this.elegirColor)
    this.colores.violeta.removeEventListener('click', this.elegirColor)
    this.colores.naranja.removeEventListener('click', this.elegirColor)
  }

  elegirColor(ev) {
    const nombreColor = ev.target.dataset.color
    const numeroColor = this.transformarColorANumero(nombreColor)
    this.iluminarColor(nombreColor)
    if (numeroColor === this.secuencia[this.subnivel]) {
      this.subnivel++
      if (this.subnivel === this.nivel) {
        this.nivel++
        this.eliminarEventosClick()
        if (this.nivel === (ULTIMO_NIVEL + 1)) {
          this.ganoElJuego()
        } else {
          swal('Muy bien!', 'Pasas al nivel ' + this.nivel, 'success')
          .then(() => {
            setTimeout(this.siguienteNivel, 1500)
          })
          
        }
      }
    } else {
      this.perdioElJuego()
    }
  }
  
  ganoElJuego() {
    swal('Simón dice:', 'FELICITACIONES, ganaste el juego!', 'success')
    .then(this.inicializar)
  }
  
  perdioElJuego() {
    swal('Simón dice:', 'Lo lamentamos, perdiste :(', 'error')
    .then(() => {
      this.eliminarEventosClick()
      this.inicializar()
    })
  }


  
}



function empezarJuego() {
    window.juego = new Juego()
  }


  