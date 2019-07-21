class BulletEnemy extends MinImage{
    constructor(game) {
        super(game, 'bullet_enemy')
        this.setup()
    }

    setup() {
        this.speed = 5
        this.alive = true
    }

    update() {
        this.y += this.speed
        // log(this.x, this.y, "enemy bullet")
    }

    draw() {
        // log(this.x, this.y , "player")
        if(this.alive) {
            super.draw()
        }
    }
}
