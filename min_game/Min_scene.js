class MinScene {
    constructor(game) {
        this.game = game
        this.elements = []
        this.debugMode = true
    }

    static new(game) {
        var i = new this(game)
        return i
    }

    addElement = (minImage) => {
        minImage.scence = this
        this.elements.push(minImage)

    }

    draw (){
        // alert("must be override!")
        for (let i = 0; i < this.elements.length; i++) {
            let e = this.elements[i]
            this.game.drawImage(e)
        }
    }

    update (){
        if(this.debugMode) {
            for (let i = 0; i < this.elements.length; i++) {
                let e = this.elements[i]
                e.debug && e.debug()
            }
        }
        for (let i = 0; i < this.elements.length; i++) {
            let e = this.elements[i]
            e.update()
        }
    }
}