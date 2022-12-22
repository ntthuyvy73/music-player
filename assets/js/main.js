const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = "PLAYER";

const playBtn = $(".btn-toggle-play");

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    isMute: false,
    volume: 1,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    songs: [
        {
            name: "Đế vương",
            singer: "Đình Dũng",
            path: "../assets/music/DeVuong.mp3",
            image: "../assets/img/img-1.jpg",
        },

        {
            name: "Nàng thơ",
            singer: "Hoàng Dũng",
            path: "../assets/music/NangTho.mp3",
            image: "../assets/img/img-2.jpg",
        },

        {
            name: "Người lạ ơi",
            singer: "Karik",
            path: "../assets/music/NguoiLaOi.mp3",
            image: "../assets/img/img-3.jpg",
        },

        {
            name: "Nothings Gonna Change My Love For You",
            singer: "Hòa tấu",
            path: "../assets/music/NothingsGonnaChangeMyLoveForYou.mp3",
            image: "../assets/img/img-4.jpg",
        },

        {
            name: "River Flows In You",
            singer: "Hòa tấu",
            path: "../assets/music/RiverFlowsInYou.mp3",
            image: "../assets/img/img-5.jpg",
        },
        {
            name: "Đế vương",
            singer: "Đình Dũng",
            path: "../assets/music/DeVuong.mp3",
            image: "../assets/img/img-1.jpg",
        },

        {
            name: "Nàng thơ",
            singer: "Hoàng Dũng",
            path: "../assets/music/NangTho.mp3",
            image: "../assets/img/img-2.jpg",
        },

        {
            name: "Người lạ ơi",
            singer: "Karik",
            path: "../assets/music/NguoiLaOi.mp3",
            image: "../assets/img/img-3.jpg",
        },

        {
            name: "Nothings Gonna Change My Love For You",
            singer: "Hòa tấu",
            path: "../assets/music/NothingsGonnaChangeMyLoveForYou.mp3",
            image: "../assets/img/img-4.jpg",
        },

        {
            name: "River Flows In You",
            singer: "Hòa tấu",
            path: "../assets/music/RiverFlowsInYou.mp3",
            image: "../assets/img/img-5.jpg",
        },
    ],
    setConfig: function (key, value) {
        this.config[key] = value;
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
    },
    render: function () {
        // console.log("aaa");
        const htmls = this.songs.map((song, index) => {
            return `<div class="song ${
                index === this.currentIndex ? "active" : ""
            } " data-index=${index}>
                        <img class="thumb" src="${song.image}" alt="${
                song.name
            }" />

                        <div class="body">
                            <h4 class="title">${song.name}</h4>
                            <p class="author">${song.singer}</p>
                        </div>

                        <span class="option"><i class="fa fa-ellipsis-h"></i></span>
                    </div>`;
        });

        $(".playlist").innerHTML = htmls.join("");
    },
    defineProperties: function () {
        Object.defineProperty(this, "currentSong", {
            get: function () {
                return this.songs[this.currentIndex];
            },
        });
    },

    loadCurrentSong: function () {
        $(".header h2").innerHTML = this.currentSong.name;
        $(
            ".cd-thumb"
        ).style.backgroundImage = `url('${this.currentSong.image}')`;
        $("#audio").src = this.currentSong.path;

        if (!$("#audio").currentTime) {
            $(".time-song-start").innerHTML = "00:00";
        } else {
            $(".time-song-start").innerHTML = app.formatTimer(
                $("#audio").currentTime
            );
        }

        if (!$("#audio").duration) {
            $(".time-song-end").innerHTML = "00:00";
        } else {
            $(".time-song-end").innerHTML = app.formatTimer(
                $("#audio").duration
            );
        }

        $("#audio").volume = this.volume;

        //get download
        $(".btn-download").href = this.currentSong.path;
        $(".btn-download").download = this.currentSong.name;
    },

    randomSong: function () {
        //new index
        let newIndex;

        while (1) {
            newIndex = Math.floor(Math.random() * app.songs.length);
            if (newIndex != app.currentIndex) break;
        }
        app.currentIndex = newIndex;
        this.loadCurrentSong();
    },

    nextSong: function () {
        this.currentIndex += 1;
        if (app.currentIndex >= app.songs.length) app.currentIndex = 0;
        this.loadCurrentSong();
    },

    preSong: function () {
        this.currentIndex -= 1;
        if (app.currentIndex < 0) app.currentIndex = app.songs.length - 1;
        this.loadCurrentSong();
    },

    scrollToActiveSong: function () {
        setTimeout(() => {
            $(".song.active").scrollIntoView({
                behavior: "smooth",
                block: "nearest",
            });
        }, 400);
    },

    loadConfig: function () {
        if (this.config.isRandom != null) this.isRandom = this.config.isRandom;
        if (this.config.isRepeat != null) this.isRepeat = this.config.isRepeat;
        if (this.config.volume != null) this.volume = this.config.volume;
        // console.log(this.volume);
    },

    formatTimer: function (number) {
        const minutes = Math.floor(number / 60);
        const seconds = Math.floor(number - minutes * 60);
        return `${minutes < 10 ? "0" + minutes : minutes}:${
            seconds < 10 ? "0" + seconds : seconds
        }`;
    },

    loadVolume: function () {
        // console.log(this.volume);
        $(".volume_range").value = this.volume * 100;
        app.setConfig("volume", this.volume);
    },

    handleEvents: function () {
        var cdWidth = $(".cd").offsetWidth;

        //scroll cd
        document.onscroll = function () {
            var index = window.scrollY || document.documentElement.scrollTop;
            // console.log(index);
            var newCdWidth = cdWidth - index;
            if (newCdWidth < 0) newCdWidth = 0;
            $(".cd").style.width = newCdWidth + "px";
        };

        //cd rotate
        var cdAnimate = $(".cd-thumb").animate(
            [
                {
                    transform: "rotate(360deg)",
                },
            ],
            {
                duration: 10000,
                iterations: Infinity,
            }
        );
        cdAnimate.pause();

        //play
        playBtn.onclick = function () {
            // console.log(app.isPlaying);
            if (app.isPlaying) {
                //pause
                $("#audio").pause();
            } else {
                //play
                $("#audio").play();
                console.log($("#audio").volume);
            }
        };

        //khi song play
        $("#audio").onplay = function () {
            // console.log("play");
            app.isPlaying = true;
            $(".player").classList.add("playing");
            cdAnimate.play();
        };
        //khi song pause
        $("#audio").onpause = function () {
            app.isPlaying = false;
            $(".player").classList.remove("playing");
            cdAnimate.pause();
        };

        //end bai hat thi` auto next bai tiep
        $("#audio").onended = function () {
            if (app.isRepeat) {
                app.loadCurrentSong();
                $("#audio").play();
            } else {
                $(".btn-next").click();
            }
        };

        // progress song
        $("#audio").ontimeupdate = function () {
            // console.log($("#audio").currentTime, $("#audio").duration);
            // console.log($("#audio").duration);

            if ($("#audio").duration) {
                var progress_value =
                    ($("#audio").currentTime / $("#audio").duration) * 100;
                // $("#progress").value = progress_value;
                // console.log(progress_value);
                $(".music_track").style.width = progress_value + "%";
                $(".time-song-start").innerHTML = app.formatTimer(
                    $("#audio").currentTime
                );
                $(".time-song-end").innerHTML = app.formatTimer(
                    $("#audio").duration
                );
            }
        };

        //seek progress
        $(".progress").onchange = function () {
            $("#audio").currentTime =
                ($("#progress").value * $("#audio").duration) / 100;

            $("#audio").play();
        };

        //next song
        $(".btn-next").onclick = function () {
            // console.log("aaa");
            //random
            if (app.isRandom) {
                app.randomSong();
            } else {
                app.nextSong();
            }
            $("#audio").play();
            console.log($("#audio").volume);
            app.scrollToActiveSong();
            app.render();
        };

        //pre song
        $(".btn-pre").onclick = function () {
            // console.log("aaa");
            if (app.isRandom) {
                app.randomSong();
            } else {
                app.preSong();
            }
            $("#audio").play();
            console.log($("#audio").volume);
            app.scrollToActiveSong();
            app.render();
        };

        //random song
        $(".btn-random").onclick = function () {
            //active class
            app.isRandom = !app.isRandom;
            app.setConfig("isRandom", app.isRandom);
            $(".btn-random").classList.toggle("active", app.isRandom);
        };

        //repeat song
        $(".btn-repeat").onclick = function () {
            app.isRepeat = !app.isRepeat;
            app.setConfig("isRepeat", app.isRepeat);
            $(".btn-repeat").classList.toggle("active", app.isRepeat);
        };

        //play song when click
        $(".playlist").onclick = function (e) {
            console.log(e.target.closest(".song:not(.active)"));
            const songNode = e.target.closest(".song:not(.active)");
            if (songNode || e.target.closest(" .option")) {
                if (songNode) {
                    app.currentIndex = Number(songNode.dataset.index);
                    console.log(app.currentIndex);

                    app.loadCurrentSong();
                    $("#audio").play();
                    app.render();
                }
            }
        };

        //volume
        $(".btn-mute").onclick = function () {
            // console.log("aaa");
            app.isMute = !app.isMute;
            $(".btn-mute").classList.toggle("volume_muted", app.isMute);
            if (app.isMute) {
                $("#audio").volume = 0;
            } else {
                $("#audio").volume = $(".volume_range").value / 100;
            }
        };

        $(".volume_range").onchange = function () {
            console.log($(".volume_range").value);
            app.loadVolume = $(".volume_range").value / 100;
            $("#audio").volume = app.loadVolume;
            app.setConfig("volume", app.loadVolume);
            console.log(app.loadVolume);
        };

        //download
        $(".btn-download").onclick = function () {};
    },
    start: function () {
        this.loadConfig();
        // console.log(this.config.isRandom);
        this.defineProperties();
        this.handleEvents();
        this.loadCurrentSong();
        this.loadVolume();
        this.render();

        $(".btn-random").classList.toggle("active", this.isRandom);
        $(".btn-repeat").classList.toggle("active", this.isRepeat);
    },
};

app.start();
