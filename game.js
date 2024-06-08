$(document).ready(() => {

    let UserClickPattern = [];

    let ButtonColors = ["green", "red", "yellow", "blue"];

    let GamePattern = [];

    let Tracker = true; 

    let level = 0;

    let btns = $(".btns");

    let heading = $(".game-heading h1");

    $(document).keypress((e) => {

        if (e.key === "Enter") {

            if (Tracker) {

                NextSequence();
                Tracker = false;

            }

        }

    });


    btns.click(function () {

        let UserSelectedBtn = this.id;

        UserClickPattern.push(UserSelectedBtn);

        PlayBgm(UserSelectedBtn);

        AnimationBtn(UserSelectedBtn);

        CheckAnswers(UserClickPattern.length - 1);

    });

    function PlayBgm(btn) {

        let audio = new Audio("sounds/" + btn + ".mp3");

        audio.play();

    }

    function AnimationBtn(btn) {

        $(`#` + btn).addClass("button-clicked");


        setTimeout(() => {

            $(`#` + btn).removeClass("button-clicked");

        }, 100)


    }

    function NextSequence() {

        UserClickPattern = [];

        level++;

        heading.text(`LEVEl: ${level}`);

        let RandomColor = ButtonColors[Math.round(Math.random() * 4)];

        GamePattern.push(RandomColor);

        $(`#${RandomColor}`).fadeIn(100).fadeOut(100).fadeIn(100);

        PlayBgm(RandomColor);

    }

    function CheckAnswers(len) {

        if (GamePattern[len] === UserClickPattern[len]) {

            if (GamePattern.length === UserClickPattern.length) {

                setTimeout(() => {

                    NextSequence();

                }, 1000);


            }


        } else {


            heading.text("Game Over! Press Enter To Start Again.");
            PlayBgm("wrong");

            setTimeout(() => {

                StartOver();

            }, 2000);

        }

    }

    function StartOver(){

        Tracker = true;

        GamePattern = [];

        level = 0;
    }

});