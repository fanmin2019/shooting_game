class SceneEditor  extends MinScene {
    constructor(game) {
        super(game)
        this.levels =[]
        //initialize
        this.block = Block(game, [420,200])
        this.blocks = {
            "x420y200": this.block,
        }
        this.levels = []
        // this.blocks.push(this.block)
        this.block_list = {

        }
        this.number = ''
        this.levelCounter = 1

        window.addEventListener('keydown',  (event) => {
            if(event.key != 't') {
                return
            }
            log("save one")
            this.levels.push(this.block_list)
            this.block_list = {}
            this.blocks = {}
            this.blocks = {"x420y200": this.block}
            this.levelCounter += 1
            // download(datas, 'level.json', 'text/plain');
        })

        window.addEventListener('keydown',  (event) => {
            if(event.key != 's') {
                return
            }
            log("download")
            function download(content, fileName, contentType) {
                var a = document.createElement("a");
                var file = new Blob([content], {type: contentType});
                a.href = URL.createObjectURL(file);
                a.download = fileName;
                a.click();
            }
            var datas = JSON.stringify(this.levels)
            // this.levels = {}
            datas = 'var level = ' + datas
            this.levelCounter = 0
            download(datas, 'level.js', 'text/plain');
        })
    }

    static instance(...args) {
        this.i = this.i || new this(...args)
        return this.i
    }

    draw = () => {
        //fill rect color
        this.game.context.fillStyle = "red"
        this.game.context.fillRect(0, 0, 500, 300);
        this.game.context.beginPath();
        this.game.context.moveTo(400, 0);
        this.game.context.lineTo(400, 300);
        this.game.context.stroke();

        //理想形:game.draw(paddle)
        for(var key in this.blocks) {
            this.game.drawImage(this.blocks[key])
        }
        // this.game.drawImage(this.ball)

        this.game.context.fillStyle = "white";
        console.log("wwwwwww")
        this.game.context.fillText("按t保存关卡", 410, 50);
        this.game.context.fillText("按s下载关卡文件", 410, 60);
        this.game.context.fillText("正在编辑", 410, 80);
        this.game.context.fillText("第" + this.levelCounter + "关", 410, 90);


        // this.game.context.fillText("Level Editor, Press e to set level", 100, 200);

    }

    update = () => {
        // game.replaceScene()
        // this.draw()

        var enableDragBall;
        var enableDragBlock;
        this.game.canvas.addEventListener('mousedown', event => {
            // log(evt)
            var x = event.offsetX
            var y = event.offsetY
            // log("mousedown", x, y)
            //is ball clicked?
            // if (this.ball.hasPoint(x, y)) {
            //     enableDragBall = true
            // }

            // if(this.block.hasPoint(x, y)) {
            //     enableDragBlock = true
            // }
            for (var key in  this.blocks) {
                var b = this.blocks[key]
                if(b.hasPoint(x, y)) {
                    enableDragBlock = true
                    this.number = key
                    break
                }
            }
            log("this.number", this.number)

        })

        this.game.canvas.addEventListener('mousemove', event => {
            var x = event.offsetX
            var y = event.offsetY
            // log("mousedown", x, y)
            // if (enableDragBall) {
            //     this.ball.x = x
            //     this.ball.y = y
            // }

            if(enableDragBlock && this.number != 'x420y200') {
                log("change x,y")
                enableDragBlock = true
                this.blocks[this.number].x = x
                this.blocks[this.number].y = y
            }

            // this.game.context.fillStyle = "white";
            // this.game.context.fillText("Position now is", x, y);

        })

        this.game.canvas.addEventListener('mouseup', event => {
            var x = event.offsetX
            var y = event.offsetY
            log("mouse up this numbe", this.number, this.number == 'x420y200', this.blocks)
            if(x <= 400 && enableDragBlock && this.number == 'x420y200') {
                log("new block")
                var new_block = Block(this.game, [x, y])
                var n = 'x' + x + 'y' + y
                log("n", n, this.blocks)
                this.blocks[n] = new_block
                this.block_list[x + "" + y] = [x, y]
            }
            // log("mousedown", x, y)
            // enableDragBall = false
            enableDragBlock = false
            // this.game.drawImage(this.block)
            // log("length", this.blocks.length)
            // //fill text
            // this.game.context.fillStyle = "white";
            // this.game.context.fillText("Position now is" + x + y, 400, 100);
        })

    }

}