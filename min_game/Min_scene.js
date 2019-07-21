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

    //以前可能就局限在image了
    //以后可以继续抽象成别的
    // 一开始可能是只添加image，但是后面要添加的东西便多了
    addElement = (e) => {
    // addElement = (minImage) => {
        e.scence = this
        this.elements.push(e)

    }

    draw (){
        for (let e of this.elements) {
        // for (let i = 0; i < this.elements.length; i++) {
        //     let e = this.elements[i]
            // this.game.drawImage(e)
            //把draw给抽象出来，具体怎么draw，scne里面不需要管
            e.draw()
        }
    }

    update (){
        if(this.debugMode) {
            for (let i = 0; i < this.elements.length; i++) {
                let e = this.elements[i]
                e.debug && e.debug()
            }
        }
        //polymorphism
        for (let i = 0; i < this.elements.length; i++) {
            let e = this.elements[i]
            e.update()
        }
    }
}