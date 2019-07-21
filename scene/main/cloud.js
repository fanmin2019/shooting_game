class Cloud extends MinImage {
    constructor(game) {
        var type = randomBetween(0, 4)
        var name = 'cloud'
        super(game, name)
        this.setup()
    }

    setup() {
        this.speed = 1
        this.x = randomBetween(0, 300)
        this.y = - randomBetween(0, 200)
    }

    update() {
        this.y += this.speed
        if(this.y > 600) {
            this.setup()
        }

    }

    debug(){
        this.speed = config.cloud_speed
    }

}
