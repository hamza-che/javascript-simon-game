$(function () {

    // Generate The Random Button
    var buttonColours = ["red", "blue", "green", "yellow"];
    var gamePattern = [];
    var userClickedPattern = [];
    var level = 0;
    var started = false;

    // Detect When key board has been pressed
    $(document).keypress(function () {
        if (!started) {
            nextSequence();
            started = true
        }
    })

    $(".btn").on("click", function () {
        // Add Flash Effect To Clicked Button
        $(this).fadeOut(50).fadeIn(50);

        // Detect The ID Of Clicked Button 
        var userChosenColour = $(this).attr("id");

        //Add The Chosen Colour To The Clicked Pattern
        userClickedPattern.push(userChosenColour);

        // Add Sound To Clicked Button
        playSound(userChosenColour);

        animatePress($(this));

        checkAnswer(userClickedPattern.length - 1);
    })

    // Create Next Sequence Function
    function nextSequence() {
        userClickedPattern = [];
        level++;
        $("#level-title").text("Level " + level)

        var randomNumber = Math.floor(Math.random() * 4);
        var  randomChosenColour =  buttonColours[randomNumber];
        gamePattern.push(randomChosenColour);

        $("#" + randomChosenColour).fadeOut(50).fadeIn(50);
        playSound(randomChosenColour);
    }

    // Create Sounds Function
    function playSound(name) {
        var audio = new Audio("../sounds/" + name + ".mp3");
        audio.play()
    } 

    // Add Animation to buttons function
    function animatePress(currentColor) {
        currentColor.addClass("pressed");
        setInterval(function () {
            currentColor.removeClass("pressed")
        }, 100)
    }

    // Check Answer Function 
    function checkAnswer(currentLevel) {
        if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
            console.log("Succes!");

            if (userClickedPattern.length === gamePattern.length) {
                setTimeout(function () {
                    nextSequence()
                }, 1000)
            }

        } else {
            console.log("Wrong!");

            playSound("wrong");

            $("body").addClass("game-over");
            setTimeout(function () {
                $("body").removeClass("game-over");
            }, 200);

            $("h1").text("Game Over, Press Any Key to Restart");

            // Start Again
            startOver();
        }
    }

    // Create Start Over Function
    function startOver() {
        level = 0;
        started = false;
        gamePattern = [];
    }
})
