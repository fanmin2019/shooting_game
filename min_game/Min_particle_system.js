class MinParticleSystem {
    constructor(game, x, y) {
        this.name = "MinParticleSystem"
        this.game = game
        this.setup(x, y)
    }

    static new(game, x, y) {
        var i = new this(game, x, y)
        return i
    }

    setup(x, y) {
        this.x = x
        this.y = y
        this.numberOfParticles = 100
        this.particles = []
        this.duration = 10

    }

    draw() {
        if(this.duration <= 0) {
            return
        }
        for(var p of this.particles) {
            p.draw()
        }
    }



    update() {
        this.duration--
        //添加小火花
        if(this.particles.length < this.numberOfParticles) {
            var p = MinParticle.new(this.game)
            //设置一下每个小火花的坐标和加速度
            var s = 2
            var vx = randomBetween(-s, s)
            var vy = randomBetween(-s, s)
            p.init(this.x, this.y, vx, vy)
            this.particles.push(p)
        }

        //更新所有的小火花
        for(var p of this.particles) {
            p.update()
        }

        //删除小火花
        this.particles = this.particles.filter(p => p.lives > 0)
    }
}