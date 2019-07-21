class Enemy extends MinImage {
    constructor(game) {
        var type = randomBetween(0, 1)
        var name = 'enemy' + type
        super(game, name)
        this.setup()
    }

    setup() {
        var s = randomBetween(2, 5)
        this.speed = s
        this.x = randomBetween(0, 350)
        this.y = - randomBetween(0, 200)
        this.cooldown = 50
        // this.bullets = []
        this.alive = true
        this.my_bullets = []
    }

    update() {
        this.y += this.speed
        if(this.cooldown > 0) {
            this.cooldown --
        } else if(this.cooldown == 0 && this.alive ){
            this.fire()
        }

        for (var b of window.player_bullets) {
            if (this.collide(b)) {
                this.kill()
                b.kill()
                var ps = MinParticleSystem.new(this.game, this.x, this.y)
                this.scence.addElement(ps)

            }
        }


        if(this.y > 600) {
            this.setup()
        }
    }

    kill() {
        this.alive = false
        for(var mb of this.my_bullets) {
            mb.alive = false
        }
    }

    fire() {
        if(this.cooldown <= 0) {
            this.cooldown = 50
            var x = this.x + this.w / 2
            var y = this.y + this.h /2
            var b = BulletEnemy.new(this.game)
            b.x = x
            b.y = y
            this.my_bullets.push(b)
            window.bullets_enemy.push(b)
            this.scence.addElement(b)
        }

    }

    collide(bullet) {
        return this.alive && (rectInterSects(this, bullet) || rectInterSects(bullet, this))
    }

    draw() {
        // log(this.x, this.y , "player")
        if(this.alive) {
            super.draw()
        }
    }


}
