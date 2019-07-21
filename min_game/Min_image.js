class MinImage {
    constructor(game, name) {
        this.name = name
        this.game = game
        this.texture = game.textureByName(name)
        this.x = 0
        this.y = 0
        this.w = this.texture.width
        this.h = this.texture.height
    }

    static new(game, name) {
        var i = new this(game, name)
        return i
    }

    static instance(game, name) {
        this.i = this.i || new this(game, name)
        return this.i
    }

    draw() {
        this.game.drawImage(this)
    }

    update() {

    }
}