# Guess The Number Game
My second JS project after the word guessing game. This time, I build this all by my own and referencing my old project. This is a regular game to guess the bot's number before it guesses yours. Who founds it first wins.

## Hoested in GitHub Pages
Click the link https://amirqey.github.io/Guess-The-Number-Game/ 
![Screenshot](image.png)

# How to play
1. The system enforced the player to put the range numbers and lock their numbers.
2. Then the guess will be by turn, player gets to guess first. 
3. Then player need to click one of the three buttons to answer to the bot's guess.
4. This process repeats until one of them found their number.

# Architecture
- bp.py (python) --> the blueprint of the logics I need
- wireframe (canva)
- HTML, CSS, JS --> I split one html file to 3 files after finishing the code and comment it.

# Rules
- Player must fill the minimum, maximum, and the lock number first. The guess field and the bot's buttons are disabled untill then.
- The locked number must be inside the range. The minimum can't be bigger than maximum.
- Only one side's buttons are enable at a time.
- Guess must be inside the current range. Otherwise, popups will appear.
- The bot checks for obvious lies. Happens when player click higher when the guess is lower than their locked number.
- The range is locked once set. The only way to change it, is to click the restart button.
- Don't click the you found it button when the bot guess is wrong. Or else, the bot will win. This part is intentional.

# Constraints
- Zero isn't allowed as range or as a guess.
- No score or memory that counts player's winning counts.
- No difficulty levels.
- Player need to manually click the button, no event listener approach for key is implemented.

# Improvement Suggestions
- Change the min and max lock input as a range input type.
- Add more interactive tools to help guess the number.
- Add score points based on how many times player has guess.
- CSS layouts.
