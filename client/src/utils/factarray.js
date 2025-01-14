
const funFactArray = [
    "Senet, found in Predynastic and First Dynasty burials of Egypt, c. 3500 BC and 3100 BC respectively, is the oldest board game known to have existed",
    "The oldest records of board gaming in Europe date back to Homer's Iliad (written in the 8th century BC), in which he mentions the Ancient Greek game of Petteia",
    "The most popular board game in the United States is chess",
    "There are over 300 different themed version of Monopoly",
    "Trey's favorite game is exploding kittens.  Eve is not amused.",
    "Jeff Cela once won $8k at a Blackjack table and made it out alive.",
    'Michael Feldman once had a friend destroy a card table, on which was being played Game of Thrones Monopoly, in a fit of rage after another player used "the red wedding" chance card against them.',
    "Skylar Harwell's personal High Score on Solitare in the old Windows OS is 82 seconds.",
    "Ben is so good at the game 'Terraforming Mars', it is rumored that Elon Musk has hired him as a consultant at SpaceX.",
    "Hannah is undefeated at the game of 'Ticket to Ride'",
    "Danny has yet to win The Game of Life",
    "Amanda acheived three Yahtzees in a single game, Chris is still mad.",
    "O'MarSharif, in a series of unfortunate events, was robbed twice and thrown in jail by police officers.  All while simply trying to hide from monsters, in the police station, during a game of Arkham Horror.  He went on to have a successful career as deputy and win the game.",
    "The longest game of Monopoly on record lasted 70 days.",
    "The most expensive Monopoly set in the world was created by San Francisco jeweler, Sidney Mobell. It cost $2 million.",
    "At age 12, Luke played a very contentious 8 hour game of monopoly against his cousin.  The game ended in a tie and out of anger, the two have never spoken since.",
    "Risk was invented in 1957 by Albert Lamorisse, a French filmmaker, and it became one of the most popular board games in history.",
    "Risk was inducted into Games magazine's Hall of Fame in 1984.",
    "Apples to Apples is a party game originally published by Out of the Box Publishing Inc and was meant for 20 players.  No one ever had enough friends to play the game, and when Mattel acquired the game they redesigned it for four to ten players.",
    "Deep Blue was a chess-playing supercomputer developed by IBM. It was the first computer to win both a chess game and a chess match against a reigning world champion under regular time controls.",
    "After finding out that a handful of his fans had completed his card puzzle, Neil Patrick Harris released an even more difficult game 'Box One', in order to defeat them.",
    "The largest game of Catan was held at Germany's 2015 Spiel convention with 1,040 participants, including its creator Klaus Teuber",
    "A schoolteacher created Candy Land in 1949 to brighten the day of children confined to a San Diego polio ward.",
    "During World War II, the Germans allowed humanitarian groups to distribute care packages to soldiers imprisoned in their war camps. Because Monopoly was often part of those packages, the British secret service conspired with a game manufacturer to hide a compass, map, and small tools inside secret compartments built into the game board.",
    "Invented by Milton Bradley himself in 1860, the original game of Life, played on a checkered board, included game spaces that doomed players to a life of crime, a gambling addiction, poverty, prison, and simple ruin and disgrace.",
    "The original game of Clue, patented in 1947 by a British man who invented it to pass time during World War II air-raid blackouts, included a lead pipe token that was made of real lead.",
    "In 2008, two skydivers played a short but sweet game of Scrabble after jumping out of a plane high above Florida.",
    "Risk Was Created By an Oscar Winner, Albert Lamorisse.",
    "Chutes and Ladders Began as a Morality Lesson.  The game, also known as 'Snakes and Ladders', traces its roots to ancient India. Ladders were meant to represent rebirth, with the player ascending to higher life forms via good deeds, while snakes whisked players to lower life forms because of evil doings.",
    "A wealthy Canadian couple invented the game Yahtzee as a way to entertain their friends on board their yacht. After it proved a big hit among their friends, the couple consulted with a toy maker who loved it, bought the rights, and changed the name from the relatively generic 'Yacht game' to 'Yahtzee.'",
    "Everyone's favorite Rube Goldberg-inspired board game, MouseTrap, has always been a kid favorite, even as parents cursed its many plastic parts. A contractor from California captured that youthful excitement by scaling the game up — way up — then touring the country with performers who used the huge setup to teach about gravity, simple machines, kinetic energy, and more.",
    "There Are Over 4 Trillion Ways to Fill a Connect Four Board.  There are close to 2 trillion ways to win the game by getting four in a row, and more than 700 million ways to tie. However, assuming you're playing a 'perfect' opponent, there's also one way to guarantee a win: Go first, and play in the center column.",
    "While traditional Scrabble sets come with wooden tiles with grooved letters, these tiles aren't used in high-level tournaments. That's because players have been caught 'brailling' while choosing tiles: that is, feeling for the smooth tiles that are the valuable blanks.",
    "After close to 40 years of charlie horses, writer's cramps, and other common maladies, Americans voted in 2003 to add an ice-cream-cone-shaped 'brain freeze' to Operation's electronic board. The new affliction for Cavity Sam beat out a growling stomach and tennis elbow.",
    "Next time your family complains that Monopoly takes too long, hit 'em with this fact: It's possible to win the game in just over 20 seconds. That means snapping up Park Place and Boardwalk almost immediately, building houses on them, and praying your opponent draws a Chance card that sends them to Boardwalk so you can bleed them dry. (Just don't mention that the chances of this actually happening are roughly 1 in 254 trillion.)",
    "Though it had plenty of ardent fans in Cuba, Monopoly fell victim to a ban in 1959 when Fidel Castro seized power. A game so blatantly driven by capitalist ideals had no place in the socialist nation, so all versions, including a Cuban knockoff called 'Capitolio' that features the streets of Havana, were ordered destroyed.",
    "Caterpillar Inc. used five of its construction vehicles to play a super-sized game of Jenga in 2015. The solid pine blocks were 8 feet long, 32 times the length of a standard Jenga block, and weighed a whopping 600 pounds each. The 28-hour game lasted until the 14th level, when the tower collapsed.",
    'The original version of Clue challenges players to determine which character committed a brutal murder, and there have been several spin-offs, from "Star Wars" to "The Office" to "Harry Potter."',
    'Battleship was one of the first games to be made into a computer game in 1979.',
    'In order to prevent Boggle players from using a certain swear word, the letters F and K only appear once on the same cube, making it impossible for them to both be played at the same time.',
    'The player who goes first in Connect Four can win 100% of the time.',
    'Cranium was the first non-coffee product to be sold at Starbucks.',
    'A Life tile awarding the player $100,000 for winning a Nobel Prize was replaced with a new tile providing the same amount for appearing on a reality TV show.',
    'Parker Brothers once sent a group of players who had run out of money during a 161-hour marathon game extra cash by plane and an armored car.',
    "The prize money for winning the Monopoly World Championship is $20,580 — the same amount of money there is in the game's bank.",
    'One in three American households has a Scrabble set.',
    'Scrabble is an official sport in several African countries, including Senegal and Mali.',
    "The first 5,000 copies of Settlers of Catan sold out so fast that inventor Klaus Teuber doesn't have a copy of the first edition.",
    'Two journalists invented Trivial Pursuit in 45 minutes after being shocked at the price of a Scrabble set.',    
];

module.exports = funFactArray;