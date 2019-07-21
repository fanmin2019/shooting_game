class MinParticle extends  MinImage{
    constructor(game) {
        super(game, "fire")
        this.setup()
    }

    setup() {
        // this.speed = 1
        this.lives = 10
    }

    init(x, y, vx, vy) {
        this.x = x
        this.y = y
        this.vx = vx
        this.vy = vy
    }

    static new(game) {
        var i = new this(game)
        return i
    }

    draw() {
        super.draw()
    }

    update() {
        this.x += this.vx
        this.y += this.vy
        var factor = 0.02
        this.vx += this.vx * factor
        this.vy += this.vy * factor
        this.lives --
    }
}
