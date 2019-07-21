class Bullet extends MinImage {
    constructor(game) {
        super(game, 'bullet')
        this.setup()
    }

    setup() {
        this.speed = 1
        this.alive = true
    }

    update() {
        log("my update")
        this.speed = config.bullet_speed
        this.y -= this.speed
    }

    kill() {
        this.alive = false
    }

    draw() {
        // log(this.x, this.y , "player")
        if(this.alive) {
            super.draw()
        }
    }
}
