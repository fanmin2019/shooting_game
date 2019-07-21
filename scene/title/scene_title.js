class SceneTitle extends MinScene {
    constructor(game) {
        super(game)
        this.label = Min_label.new(game, "Press k to Game Start")
        // 把lable和image里面的draw都抽象成了scene里面的draw
        // 这样做有什么好处呢，首先具体的东西要怎么draw，都是它自己在管理
        // 然后在具体的应用场景中，调用draw这个借口，就可以让他们自己draw了
        // 这样肯定要比在中间的地方draw要好
        this.addElement(this.label)
        game.registerAction('k', function () {
            var s = Scene.new(game)
            //時にはGAME、時にはG、ややこしい
            game.replaceScene(s)
        })

        var ps = MinParticleSystem.new(this.game)
        this.addElement(ps)
    }

    //override
    draw() {
        super.draw()
        //fill text
        // this.game.context.fillStyle = "black";
        // this.game.context.fillText("Press k to Game Start", 100, 100);
        // this.label.draw()

    }

}