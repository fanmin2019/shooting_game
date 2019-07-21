class Player extends MinImage {
    constructor(game) {
        super(game, 'player')
        this.setup()
    }

    setup() {
        this.speed = 5
        this.cooldown = 0
        this.alive = true
        this.lives = 1
        this.waitover = 20
        window.player_bullets = []
    }

    update() {
        this.speed = config.player_speed
        if(this.cooldown > 0) {
            log("cooldown update", this.cooldown )
            this.cooldown --
        } else {
            for (var b of window.bullets_enemy) {
                if (this.collide(b) && b.alive) {
                    this.kill()
                    var ps = MinParticleSystem.new(this.game, this.x, this.y)
                    this.scence.addElement(ps)

                }
            }

            if(this.scence.elements.length > 0) {
                // log(this.scence.elements)
                var enemys = this.scence.elements.filter(e => e.name.includes('enemy'))

                // log("enemys", enemys, this.scence.elements)
                for (var e of enemys) {
                    if (this.collide(e) && e.alive) {
                        this.kill()
                        var ps = MinParticleSystem.new(this.game, this.x, this.y)
                        this.scence.addElement(ps)
                    }
                }
            }

            if(!this.alive) {
                this.waitover--
                if(this.waitover < 1) {
                    var s = SceneEnd.new(this.game)
                    this.game.runWithScene(s)
                }
            }

        }
        // log(this.x, this.y)

    }

    draw() {
        // log(this.x, this.y , "player")
        if(this.alive) {
            super.draw()
        }
    }


    moveLeft() {
        // log("moveleft", this.speed)
        this.x -= this.speed
    }
    moveRight() {
        // log("moveright", this.speed)
        this.x += this.speed
    }

    moveUp() {
        this.y -= this.speed
    }

    moveDown() {
        this.y += this.speed
    }

    fire() {

        if(this.cooldown <= 0) {
            log("cooldown 0")
            this.cooldown = config.fire_cooldown
            var x = this.x + this.w / 2
            var y = this.y
            var b = Bullet.new(this.game)
            b.x = x
            b.y = y
            window.player_bullets.push(b)
            this.scence.addElement(b)
        }

    }

    kill() {
        this.lives--
        if(this.lives < 1) {
            this.alive = false
        }
    }

    collide(bullet) {
        return this.alive && (rectInterSects(this, bullet) || rectInterSects(bullet, this))
    }

}
