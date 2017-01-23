(function () {
    var beep = document.getElementById('beep');
    var app = new Vue({
        el: '#app',
        data: {
            pairs: [
                ['0.png', '1.png'],
                ['square.png', 'circle.png'],
                ['smile.png', 'sad-smile.png'],
                ['ass.gif', 'santa.jpg'],
                ['cake.png', 'shit.gif']
            ],
            selectedPair: null,
            started: false,
            log: [],
            curPicture: null,
            showCurPic: true

        },
		created: function () {
			window.addEventListener('keydown', this.keyDown);
		},
        methods: {
            selectPair: function (pair) {
                this.selectedPair = pair;
            },
            guess: function (result) {
                if (result !== null) {
                    this.log.push([this.curPicture, result]); 
                }
                this.nextTurn();
            },
            start: function (result) {
                this.nextTurn();
                this.started = true;
            },
            nextTurn: function () {
                var picNum = Math.round(Math.random());
                this.curPicture = this.selectedPair[picNum];
                this.showCurPic = false;
                beep.load();
                var self = this;
                Vue.nextTick(function () {
                    self.showCurPic = true;
                    beep.play();
                });
            },
            restart: function () {
                if (confirm('Начать сначала?')) {
                    this.started = false;
                    this.log = [];
                }
            },
            keyDown: function (e) {
                if (this.started) {
                    if (e.key === '1' | e.key === 'Enter') {
                        this.guess(true);
                        e.preventDefault();
                    }
                    if (e.key === '0' | e.key === ' ') {
                        this.guess(false);
                        e.preventDefault();
                    }
                } else {
                    if (e.key === 'Enter') {
                        this.start();
                        e.preventDefault();
                    }
                }
            },
        },
        computed: {
            result: function () {
                var right = this.log.reduce(function(sum, cur) {
                    return sum + (cur[1] ? 1 : 0);
                }, 0);
                return {
                    right: right,
                    wrong: this.log.length - right
                };
            }
        }
    });
    window.app = app;
})();
