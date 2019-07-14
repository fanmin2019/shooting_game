class MinImage {
    constructor(game, name) {
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

    }

    update() {

    }
}

//逻辑上不应该集成minImage的
// class Player extends  MinImage {
//     constructor(game, name) {
//      super(game, name)
//     }
// }