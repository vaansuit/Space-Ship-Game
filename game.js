const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d'); // setando o contexto do js para 2d

canvas.width = window.innerWidth; // setando as propriedades de altura e largura
canvas.height = window.innerHeight;

class Player {
    constructor() {
        this.position = {
            x: 200,
            y: 200
        }

        this.velocity = {
            x: 0,
            y: 0
        }

        // this.image
        this.width = 100
        this.height = 100

    }

    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

const player = new Player();
player.draw();