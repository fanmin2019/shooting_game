class Score extends Min_label {
    constructor(game) {
        super(game, "Score:")
        window.score = 0
    }

    static new(game, text) {
        var i = new this(game, text)
        return i
    }

    draw() {
        // log("gua label")
        this.game.context.fillStyle = "black";
        // log("this.x", "this.y", this.x , this.y)
        this.game.context.fillText(this.text, 300, 50);
    }

    update() {
        // window.score += 1
        this.text = "Score:" + window.score

    }
}