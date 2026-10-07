import random

minimum = int(input())
maximum = int(input())

comp = random.randrange(minimum, maximum +1)

while (True) :
    print("your turn")
    guess = int(input("I guess: "))
    
    if guess == comp:
        print("you found it!")
        break
    elif guess > comp :
        print("lower")
    elif guess < comp :
        print("higher")

    print()
    print("my turn")
    u = random.randrange(minimum, maximum + 1)
    n = input(f"is your number {u} ? : ")
    
    if n == "yes":
        print("ha! i found it")
        break
    elif n == "lower":
        maximum = u
    elif n == "higher":
        minimum = u
    