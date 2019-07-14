class SceneTitle extends MinScene {
    constructor(game) {
        super(game)
        game.registerAction('k', function () {
            var s = Scene(game)
            //時にはGAME、時にはG、ややこしい
            game.replaceScene(s)
        })
        game.registerAction('e', function () {
            game.canvas.width = 500
            var s = SceneEditor.instance(game)
            //時にはGAME、時にはG、ややこしい
            game.replaceScene(s)
        })
    }

    // static new(game) {
    //     var i = new this(game)
    //     return i
    // }

    //override
    draw() {
        //fill text
        this.game.context.fillStyle = "black";
        this.game.context.fillText("Press k to Game Start", 100, 100);

    }

}