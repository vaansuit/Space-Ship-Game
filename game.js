const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d'); // setando o contexto do js para 2d

canvas.width = window.innerWidth; // setando as propriedades de altura e largura
canvas.height = window.innerHeight;

class Player {
    constructor() {
        this.velocity = {
            x: 0,
            y: 0
        }

        const image = new Image();
        image.src='./img/spaceship.png'
        image.onload = () => { //funcao para chamar só depois da imagem carregar, se chamar sem o onload da pau
            const scale = 0.15 //valor para mudar o tamanho da imagem
            this.image = image
            this.width = image.width * scale
            this.height = image.height * scale
            this.position = {
                x: canvas.width / 2 - this.width / 2, //calculo para deixar a nave no centro da tela
                y: canvas.height - this.height - 20 //calculo para deixar a nave no centro da tela
            }
        }
    }

    draw() {
        /*c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)*/ //usado para desenhar um quadrado e ver onde o player se encontra
        c.drawImage(
            this.image,
            this.position.x, 
            this.position.y, 
            this.width, 
            this.height)
    }

    update()
        {
            if(this.image) {
                this.draw()
                this.position.x += this.velocity.x
            }
        }
}

const player = new Player();
const keys = {
    left: {
        pressed: false
    },
    right: {
        pressed: false
    },
    space: {
        pressed: false
    }
}

player.update();

function animate() {
    requestAnimationFrame(animate) //looping da nossa nave
    c.fillStyle = 'black' //setando a cor do universo
    c.fillRect (0, 0, canvas.width, canvas.height) //setando as medidas do bg
    player.update()

    if (keys.left.pressed && player.position.x + player.width >= canvas.width) {
        player.velocity.x = -7
    } else if (keys.right.pressed && player.position.x + player.width <= canvas.width) {
        player.velocity.x = 7
    } 
    else {
        player.velocity.x = 0
    } 
}

animate()

addEventListener('keydown', ({key}) => {
    switch (key) {
        case 'ArrowLeft':
            player.velocity.x = -7
            keys.left.pressed = true
            break
        case 'ArrowRight':
            player.velocity.y = 7
            keys.right.pressed = true
            break
        case ' ':
            console.log(space) 
        break 
    }
})

addEventListener('keyup', ({key}) => {
    switch (key) {
        case 'ArrowLeft':
            player.velocity.x = -7
            keys.left.pressed = false
            break
        case 'ArrowRight':
            player.velocity.y = 7
            keys.right.pressed = false
            break
        case ' ':
            console.log('space') 
        break 
    }
})