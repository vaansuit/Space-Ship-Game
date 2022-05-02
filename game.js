const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d'); // setando o contexto do js para 2d

canvas.width = window.innerWidth; // setando as propriedades de altura e largura
canvas.height = window.innerHeight;

// Criando o jogador
class Player {
    constructor() {
        this.velocity = {
            x: 0,
            y: 0
        }

        this.rotation = 0;

        const image = new Image();
        image.src='./img/spaceship.png'
        image.onload = () => { //funcao para chamar só depois da imagem carregar, se chamar sem o onload da pau
            const scale = 0.15 //valor para mudar o tamanho da imagem
            this.image = image
            this.width = image.width * scale
            this.height = image.height * scale
            this.position = {
                x: canvas.width / 2 - this.width / 2, //calculo para deixar a nave no centro da tela
                y: canvas.height - this.height - 40 //calculo para deixar a nave no centro da tela
            }
        }
    }

    draw() {
        /*c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)*/ //usado para desenhar um quadrado e ver onde o player se encontra
        c.save()
        c.translate(
            player.position.x + player.width / 2, 
            player.position.y + player.height /2 
            )

        c.rotate(this.rotation)

        c.translate(
            -player.position.x - player.width / 2, 
            -player.position.y - player.height /2 
            )

        
        c.drawImage(
            this.image,
            this.position.x, 
            this.position.y, 
            this.width, 
            this.height)

            c.restore()
    }

    update()
        {
            if(this.image) {
                this.draw()
                this.position.x += this.velocity.x
            }
        }
}

//Criando o objeto das balas 
class Projectile {
    constructor ({position, velocity}) {
        this.position = position
        this.velocity = velocity

        this.radius = 3
    }

    //desenhando a bala
    draw(){
        c.beginPath() //iniciando o caminho do desenho no canvas
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        c.fillStyle = 'blue'
        c.fill()
        c.closePath() //finalizando o caminho do desenho no canvas
    }

    update(){
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
    
} 

// criando nosso inimigo
class Invader {
    constructor({position}) {
        this.velocity = {
            x: 0,
            y: 0
        }

        const image = new Image();
        image.src='./img/invader.png'
        image.onload = () => { //funcao para chamar só depois da imagem carregar, se chamar sem o onload da pau
            this.image = image
            this.width = image.width 
            this.height = image.height
            this.position = {
                x: position.x,
                y: position.y
            }
        }
    }

    draw() {
        c.drawImage(
            this.image,
            this.position.x, 
            this.position.y, 
            this.width, 
            this.height)           
    }

    update({velocity})
        {
            if(this.image) {
                this.draw()
                this.position.x += velocity.x
                this.position.y += velocity.y
            }
        }
}

//criando as linhas e colunas de inimigos
class Grid {
    constructor() {
        this.position ={
            x: 0,
            y: 0
        }

        this.velocity = {
            x: 3,
            y: 0, 
        }

        this.invaders =[]

        const columns = Math.floor(Math.random() * 10 + 5) // faz com que o minimo de colunas de inimigos seja 5 e o máximo 15
        const rows = Math.floor(Math.random() * 8 + 4)  // faz com que o minimo de linhas de inimigos seja 4 e o máximo 12
        for (let x = 0; x < columns; x++) {
            for (let y = 0; y < rows; y++) {
                this.invaders.push(
                    new Invader({
                        position: {
                            x: x * 30,
                            y: y* 30
                        } //separando a posição, cada inimigo ocupa 30px
                    })
                )
            }

        }        

        
    }

    update() {
        this.position.x += this.velocity.x
        this.position.y =+ this.velocity.y
    }
}

const player = new Player();

const projectiles = [] //iniciando com zero projeteis disparados

const grids = [new Grid()]

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
    
    projectiles.forEach((projectile, index) => {
        
        if (projectile.position.y + projectile.radius <= 0) {
            setTimeout(() => {
                projectiles.splice(index, 1)
            }, 0)
        } else {
            projectile.update()
        }
    })

    grids.forEach((grid) => {
        grid.update()
        grid.invaders.forEach((invader =>
            invader.update({velocity: grid.velocity})))
    })

    if (keys.left.pressed && player.position.x>= 0) {
        player.velocity.x = -7
        player.rotation = - 0.15
    } else if (keys.right.pressed && player.position.x + player.width <= canvas.width) {
        player.velocity.x = 7
        player.rotation = 0.15
    } 
    else {
        player.velocity.x = 0
        player.rotation = 0
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
           projectiles.push(
               new Projectile({
                   position: {
                       x: player.position.x + player.width / 2,
                       y: player.position.y
                   },
                   velocity: {
                       x: 0,
                       y: -15 //em negativo para o tiro subir a tela e não descer
                   }
               })
           )
        break
        //console.log(projectiles) 
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