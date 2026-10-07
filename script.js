//  Guesses Numbers Range For Bot
let min_number_bot = 0;
let max_number_bot = 0;

// Range to lock numbers
const lock = document.getElementById("lock");
const min_range_field = document.getElementById("min-range");
const max_range_field = document.getElementById("max-range");
const lock_number_field = document.getElementById("lock-number");

// initialize to 0 first, will be used in number boxes
let min_range = 0;
let max_range = 0;

// lock number player
let lock_number = 0;
// lock number bot
let bot_lock_number = 0;

// Guesses numbers range for player (after number is locked)
let min_number_player = document.getElementById("min-guess");
let max_number_player = document.getElementById("max-guess");

// initialize them with 0 first
min_number_player.textContent = min_range;
max_number_player.textContent = max_range;

// Player guess fields for button an number field
const guess_number_field = document.getElementById("guess-number");
const guess_button = document.getElementById("guess-btn");

// disable them first to enforce player to lock the number first
activeDeactiveFields(true, true);

// popups
const win = document.getElementById("popup-win");

const message = document.getElementById("message");
const answer = document.getElementById("answer");

const popup = document.getElementById("popup");
const popup_message = document.getElementById("popup-message");

// bot guess
let bot_guess_display = document.getElementById("bot-guess");
let bot_guess = 0;
bot_guess_display.textContent = bot_guess;

// the buttons at the bot-guess box
const higher = document.getElementById("higher");
const lower = document.getElementById("lower");
const correct = document.getElementById("correct");

// disable them first to enforce player to lock the number first
activeDeactiveFields(false, true);

// function that is used by bot to generate random number when lock number and guess player's number
function generateNumber(a, b) {
    return Math.floor(Math.random() * (b - a + 1)) + a;
}

// function to display the higher and lower range at the player part
function displayGuessNumberRange(min_range, max_range) {
    min_number_player.textContent = min_range;
    max_number_player.textContent = max_range;
}

// open popup message
function openPopup(token, display_message, player_win) {
    if (token) {
        win.classList.add("open");
        message.textContent = display_message;
        if (player_win) {
            answer.textContent = lock_number;
            return;
        }
        answer.textContent = bot_lock_number;
    }
    popup.classList.add("open");
    popup_message.textContent = display_message;
}

// close popup message excluding win
function closePopup() {
    popup.classList.remove("open");
}

// function to deactivate or activate the buttons
function activeDeactiveFields(token, active) {
    
    // player box's field
    if (token) {
        guess_number_field.disabled = active;
        guess_button.disabled = active;
        return
    }

    // bot box's field
    higher.disabled = active;
    lower.disabled = active;
    correct.disabled = active;

}

lock.addEventListener("click", () => {
    // convert to number
    min_range = Number(min_range_field.value);
    max_range = Number(max_range_field.value);
    lock_number = Number(lock_number_field.value);

    //when all fields have numbers
    if (min_range >-1 && max_range >-1 && lock_number >-1) {

        // error checking
        if (min_range > max_range) {
            alert('The minimum number is bigger than maximum number');
        }
        if (lock_number > max_range || lock_number < min_range){
            alert('The number you lock is outside the range you enter.');
        }
        if (min_range === max_range) {
            alert('The range numbers shouldnt be same');
        }
        
        // if all pass
        else {

            // bot lock its number
            bot_lock_number = generateNumber(min_range, max_range);

            // disable the lock fields and button
            min_range_field.disabled = true;
            max_range_field.disabled = true;
            lock_number_field.disabled = true;
            lock.disabled = true;

            // initially, bot's and players range is same
            min_number_bot = min_range;
            max_number_bot = max_range;

            // send the ranges to display
            displayGuessNumberRange(min_range, max_range)

            // activate player's guess fields
            activeDeactiveFields(true, false);
            return
        }

    }
    else {
        alert('Please fill all the fields accordingly.');
    }

    // execute here when not pass the error checking
    min_range_field.value= "";
    max_range_field.value= "";
    lock_number_field.value= "";
    return;

});

guess_button.addEventListener("click", () => {
    // the guess number that player enter
    const guess_number_player = Number(guess_number_field.value);

    // bug purposes, can uncomment
    // console.log(bot_lock_number);
    // console.log(min_number_bot);
    // console.log(max_number_bot);

    // if not in range
    if (guess_number_player < min_range || guess_number_player > max_range) {
        openPopup(false, "Maybe look at the range again pal..", false);
        guess_number_field.value = 0;
        return;
    }

    // if found the bot's number
    if (guess_number_player === bot_lock_number) {
        openPopup(true, "You found my number! Haha", true);
        return;
    }

    // if in valid range but not the correct guess
    if (guess_number_player < bot_lock_number) {
        min_range = guess_number_player;
    }

    else if (guess_number_player > bot_lock_number) {
        max_range = guess_number_player;
    }

    // empty the guess field
    guess_number_field.value = "";

    // deactivate player's guess field
    activeDeactiveFields(true, true);

    // redisplay the range for the palyer's guide
    displayGuessNumberRange(min_range, max_range);

    // bot generate number withcurrent range
    bot_guess = generateNumber(min_number_bot, max_number_bot);
    bot_guess_display.textContent = bot_guess;

    // activate the buttons in bot's box
    activeDeactiveFields(false, false);

});

higher.addEventListener("click", () => {

    // 2 cases of player being snicky
    // - bot already found the number
    // - player click lower when it should be higher
    if (bot_guess === lock_number ||bot_guess > lock_number) {
        openPopup(false, "You sure you aren't lying pal? ", false);
        if (bot_guess === lock_number) {
            openPopup(true, "I found your number! Haha", false);
        }
        return;
    }

    // player honest, change the range
    min_number_bot = bot_guess + 1;

    activeDeactiveFields(true, false);
    activeDeactiveFields(false, true);
    guess_number_field.focus();
});

lower.addEventListener("click", () => {
    if (bot_guess === lock_number || bot_guess < lock_number) {
        openPopup(false, "You sure you aren't lying pal? ", false);
        if (bot_guess === lock_number) {
            openPopup(true, "I found your number! Haha", false);
        }
        return;
    }
    max_number_bot = bot_guess - 1;

    activeDeactiveFields(true, false);
    activeDeactiveFields(false, true);
    guess_number_field.focus();
});

correct.addEventListener("click", () => {

    if (bot_guess != lock_number) {
        openPopup(true, "I do not found your number yet but thanks.", false)
    }
    openPopup(true, "I found your number! Haha", false);
});
