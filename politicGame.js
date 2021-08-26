    
        const pickRandomFromArray = (list) => {
            return list[Math.floor(Math.random() * list.length)];
        };
    
       
    function popUpBox(message) {
        let blockWhenShowingErrBox = document.getElementById("blockWhenShowingErr");
        blockWhenShowingErrBox.style.display = "block";
        let errMsgBox = document.getElementById("errMsg")
        errMsgBox.textContent = message;
        setTimeout(function(){  blockWhenShowingErrBox.style.display = "none"; }, 2000);
    }
        
        //Text noder för varje omgång!
        function battleInfoScript(res) {
            let getHtml = document.getElementById('battleInfoHtml');
            let createPara = document.createElement("p");
            createPara.classList = "text";
            let message = document.createTextNode(res);
            createPara.append(message);
            getHtml.appendChild(createPara);
            //unsued method let countMessages = getHtml.childElementCount;
        };

        //Deletar alla text noder när den kallas
        function deleteInformation() {
            var myobj = document.querySelectorAll(".text");
            console.log(myobj, myobj.length);
            for (i = 0; i < myobj.length; i++) {
                myobj[i].remove();
            };

        };

        //skapa egen karaktär
        function createUserCharacter() {
            function showPoints() {
                document.getElementById("totalPoints").innerText = "Your total points to spend is: " + totalPoints;
                document.getElementById("setLiePoints").innerText = "Your given points to deception (lie): " + user.lie;
                document.getElementById("setHonestyPoints").innerText = "Your given points to honesty: " + user.honest;
                document.getElementById("displayUserStats").innerHTML = user.description();
                console.log(user);
                console.log(totalPoints)
            };
            document.getElementById("increaseLiePoints").addEventListener("click", function () {
                if (user.lie < 10) {
                    if (totalPoints > 0) {
                        user.lie += 1;
                        totalPoints -= 1;
                        showPoints();
                        return
                    } else {
                        popUpBox("Not enough points!");
                        return
                    }
                } else {
                    popUpBox("You already have deception (lie) maxed out!");
                    return
                }
            });
            document.getElementById("decreaseLiePoints").addEventListener("click", function () {
                if (user.lie > 0) {
                    if (totalPoints < 15) {
                        user.lie -= 1;
                        totalPoints += 1;
                        showPoints();
                        return
                    } else {
                        popUpBox("Nothing more to remove!");
                        return
                    }
                } else {
                    popUpBox("You already have deception (lie) to 0")
                }
            });
            document.getElementById("increaseHonestPoints").addEventListener("click", function () {
                if (user.honest < 10) {
                    if (totalPoints > 0) {
                        user.honest += 1;
                        totalPoints -= 1;
                        showPoints();
                        return
                    } else {
                        popUpBox("Not enough points!");
                        return
                    }
                } else {
                    popUpBox("you already have honesty maxed out!");
                    return
                }

            });
            document.getElementById("decreaseHonestPoints").addEventListener("click", function () {
                if (user.honest > 0) {
                    if (totalPoints < 15) {
                        user.honest -= 1;
                        totalPoints += 1;
                        showPoints();
                        return
                    } else {
                        popUpBox("Nothing more to remove!");
                        return
                    }
                } else {
                    popUpBox("You already have honesty to 0")
                }
            });

            let user = {
                health: 100,
                lie: 0,
                honest: 0,
                userObject: true,
                damage: 0,
                description() {
                    return `Your honesty is <b>${this.honest}</b> and your deception is <b>${this.lie}</b>`
                }
            };
            let totalPoints = 15;
            showPoints();

            document.getElementById("startGame").addEventListener("click", function () {
                if (totalPoints === 0) {
                    document.getElementById("removeStatsScreen").remove()
                    const displayPlayableArea = document.getElementById("removePlayableArea");
                    displayPlayableArea.style.display = "block";
                } else {
                    popUpBox("Spend all your points first!")
                }
            });
            return user
        };

        let userCharacter = createUserCharacter();
        document.getElementById("userHealthDisplay").textContent = userCharacter.health;

        //skapa computer karaktär
        function createComputerCharacter() {

            function insertNPCsvg(choosenCharacter) {
            document.getElementById("opponentSvg").className = "choosenOpponent" + choosenCharacter;  
            document.getElementById("displayOpponentName").innerText = choosenCharacter;
            }



            const characterList = ["Trupen", "Boden", "Placeholder"];
            const caractherCalculator = Math.floor(Math.random() * characterList.length);
            const choosenCharacter = characterList[caractherCalculator];
            let objectLieMultiplier = Math.ceil(Math.random() * 5 + 5);
            let objectHonestMultiplier = Math.ceil(Math.random() * 5 + 5);
            console.log("computer gave base damage " + objectLieMultiplier);
            console.log("computer gave base defence " + objectHonestMultiplier);
            console.log("computer picked " + choosenCharacter);
            let lieValue = 0;
            let honestValue = 0;
            switch (choosenCharacter) {
                case "Trupen":
                    lieValue = objectLieMultiplier *= 1.5;
                    honestValue = objectHonestMultiplier *= 0.4;
                    insertNPCsvg(choosenCharacter)
                    break;
                case "Boden":
                    lieValue = objectLieMultiplier *= 0.4;
                    honestValue = objectHonestMultiplier *= 1.5;
                insertNPCsvg(choosenCharacter)
                    break;
                case "Placeholder":
                    lieValue = objectLieMultiplier *= 1;
                    honestValue = objectHonestMultiplier *= 1;
                    insertNPCsvg(choosenCharacter)
                    break;
                default:
                    popUpBox("If you see this Martin, you fucked up!")
            };
            let NPC = {
                name: choosenCharacter,
                health: 100,
                lie: lieValue,
                honest: honestValue,
                userObject: false,
                damage: 0,
                description() {
                    return `Your enemy's honesty is <b>${this.honest}</b> and his deception is <b>${this.lie}</b>`
                }
            };
            document.getElementById("displayComputerStats").innerHTML = NPC.description();
            return NPC
        };

        let computerCharacter = createComputerCharacter();
        document.getElementById("computerHealthDisplay").textContent = computerCharacter.health;

        //Function för att räkna ut skadan som kommer göras
        function calculateDamage(lie, player) {
            //Random faktor number för skada    
            attackRandomzier = Math.ceil(Math.random() * 5);
            console.log("randomizer number to calculate damage = " + attackRandomzier);

            let calculatedDamage = lie * attackRandomzier;
            console.log("calculated damage after lie points + randomizer = ", calculatedDamage);


            if (lie >= 8) {
                let randomBonus = Math.ceil(Math.random() * 3);
                console.log("Seen if the lie points is above or equal to 8!");
                if (randomBonus === 2) {
                    calculatedDamage *= 1.5;
                    if (player === true) {
                        battleInfoScript(
                            "You got a real smooth tongue, you get a 1.5 multiplier to your total damage!");
                    } else if (player === false) {
                        battleInfoScript("Your opponent gets 1.5 multiplier to his total damage!");
                    }
                } else {
                    if (player === true) {
                        battleInfoScript(
                            "You are good lier, you have over 8 points in deception (lie), but the media didn't buy your deception!"
                        );
                    } else if (player === false) {
                        battleInfoScript(
                            "Lucky for you, the media didn't buy your opponent's deception!");
                    }
                }
            }

            console.log("calcuated damage afterbonus (should be the same if lie bonus not applied above = " +
                calculatedDamage);

            if (calculatedDamage > 70) {
                calculatedDamage *= 2;
                if (player === true) {
                    battleInfoScript(
                        "Lucky you! The media bought the deception you spoke about! You get a critical strike! Total damage multiplied by 2!"
                    );
                } else if (player === false) {
                    battleInfoScript(
                        "Your opponent got an ace, he got media on his side and earns a 2 times multiplier to his total damage!"
                    );
                }
            }
            console.log("final calcualted damage before returning from function = " + calculatedDamage);

            if (player === true) {
                userCharacter.damage += calculatedDamage;
                console.log("user damage is = ", userCharacter.damage);
            } else if (player === false) {
                computerCharacter.damage += calculatedDamage;
                console.log("computer damage is = ", computerCharacter.damage);
            }
            return;
        }

        //function för att räkna ut evade och reducerad damage! 

        function reduceDamage(honesty, player) {
            /*
              
                              //cancle the function if there is no damage to be given.... FIX LATER!!!!!!
                              if (userCharacter.damage === 0 && computerCharacter.damage > 1) {
                                  console.log("There is no damage to give, why did you even pick this option?");
                                  return;
                              } 
                              
                              if (computerCharacter.damage === 0) {
                                  console.log("Your opponent is slightly stupid, he picked evade when he doesn't have any damage to give!");
                                  return;
                              }
                              */

            let evadeOrNot = Math.ceil(Math.random() * 2);

            if (evadeOrNot === 1) {
                console.log("If you see this, evade failed");
                if (player === true) {
                    userCharacter.damage = 0;
                    battleInfoScript(
                        "Sorry, you didn't manage to evade his deception, YOUR damage reduced to 0! Sucks, doesn't it?"
                    );
                    document.getElementById("userAttackInformation").textContent = userCharacter.damage;
                    return;
                } else if (player === false) {
                    computerCharacter.damage = 0;
                    battleInfoScript(
                        "Lucky for you, your opponent picked evade and it failed! opponent 's damage reduced to 0!");
                    document.getElementById("computerAttackInformation").textContent = computerCharacter.damage;
                    return;
                }
            } else {

                //Random faktor för att undvika attack!
                let defenceRandomizer = Math.ceil(Math.random() * 10);
                console.log("Value of defense randomizer number = ", defenceRandomizer);

                //Faktor för att få totalpoäng! 
                let reduceRandomizer = defenceRandomizer *= honesty;
                console.log("final value which will decide what evade decrease on oppoentns attack will be = ",
                    reduceRandomizer);


                if (reduceRandomizer >= 0 && reduceRandomizer <= 19) {
                    if (player === true) {
                        battleInfoScript(
                            "Low honesty, and bad luck, oh boy... A penalty of a 1.5 multiplier will be added to the total damage of your opponent's attack! D:"
                        );
                        computerCharacter.damage *= 1.5;
                    } else if (player === false) {
                        battleInfoScript(
                            "Opponent didn't fare well in his evade! Seems like you are lucky and your attack will do 1.5 more damage!"
                        );
                        userCharacter.damage *= 1.5;
                    }
                } else if (reduceRandomizer >= 20 && reduceRandomizer <= 39) {
                    if (player === true) {
                        battleInfoScript(
                            "You grew silent, but you did manage to stand your ground, your opponent's damage is reduced by 1/3! Pick higher honesty next time."
                        );
                        computerCharacter.damage *= 0.66;
                    } else if (player === false) {
                        battleInfoScript(
                            "Your opponent's honesty gave him the upper hand, your own damage is reduced by 1/3!"
                        );
                        userCharacter.damage *= 0.66;
                    }
                } else if (reduceRandomizer >= 40 && reduceRandomizer <= 69) {
                    if (player === true) {
                        battleInfoScript(
                            "Thanks to your high honesty and some luck, you counterargued through half of your opponent's deception!"
                        );
                        computerCharacter.damage /= 2;
                    } else if (player === false) {
                        battleInfoScript(
                            "Your political opponent managed to change subject onto a less important political problem! Your damage is sadly reduced by half!"
                        );
                        userCharacter.damage /= 2;
                    }
                } else if (reduceRandomizer >= 80) {
                    if (player === true) {
                        battleInfoScript(
                            "Wow! Your honesty and some luck left your opponent speechless! Deflected ALL of his bullshit! :D"
                        );
                        computerCharacter.damage = 0;
                    } else if (player === false) {
                        battleInfoScript(
                            "Your opponent annihilated you in confrontation! You lose ALL your damage you can give!"
                        );
                        userCharacter.damage = 0;
                    }
                }

                if ((honesty === 10) && (computerCharacter.damage || userCharacter.damage < 0)) {
                    if (player === true) {
                        battleInfoScript(
                            "Wow, Honest Abe! As promised, thanks to your high honesty, opponent's attack will be reduced by half!"
                        );
                        computerCharacter.damage /= 2;
                    } else if (player === false) {
                        battleInfoScript(
                            "Thanks to your opponents high honesty, your attack is sadly reduced by half!");
                        userCharacter.damage /= 2;
                    }
                }
                document.getElementById("userAttackInformation").textContent = userCharacter.damage;
                document.getElementById("computerAttackInformation").textContent = computerCharacter.damage;
                return;
                console.log("You should not be able too see!")

            }
        }

        //function för att altera knapparna
        function alterButtons(orderedTurns) {
            const startBtn = document.getElementById("startRound");
            const evadeBtn = document.getElementById("evade");
            const attackBtn = document.getElementById("attack");
            const computerChoiceBtn = document.getElementById("computerChoice")

            if (orderedTurns === 1) {
                startBtn.style.display = "none"
                attackBtn.style.display = "none";
                evadeBtn.style.display = "none";
                computerChoiceBtn.style.display = "inline"
            } else if (orderedTurns === 2) {
                evadeBtn.style.display = "inline";
                attackBtn.style.display = "inline";
                computerChoiceBtn.style.display = "none";
                startBtn.style.display = "none"
            } else if (orderedTurns === 3) {
                evadeBtn.style.display = "none";
                startBtn.style.display = "none"
                computerChoiceBtn.style.display = "none";
                attackBtn.style.display = "inline";
            } else if (orderedTurns === 4) {
                startBtn.style.display = "inline"
                attackBtn.style.display = "none";
                evadeBtn.style.display = "none";
                computerChoiceBtn.style.display = "none";
            }
        }

        function gameoverScreen(message) {
            let gameOverBox = document.getElementById("gameOverScreen");
            gameOverBox.style.display = "block";
            document.getElementById("Gameovertext").textContent = message
            }


        //function för att kalkulera skada på objecten
        function dealDamage(player) {
            if (player === true) {
            
                computerCharacter.health -= userCharacter.damage;
       
                userCharacter.damage = 0;
         
                document.getElementById("userAttackInformation").textContent = userCharacter.damage;
           
                document.getElementById("computerHealthDisplay").textContent = computerCharacter.health;
                
                if (computerCharacter.health <= 0) {
                    gameoverScreen("You won the game! Congrats!")
                    setTimeout(function(){      location.reload(); }, 5000);
                }
            } else if (player === false) {
                userCharacter.health -= computerCharacter.damage;
                computerCharacter.damage = 0;
           
                document.getElementById("computerAttackInformation").textContent = computerCharacter.damage;
                document.getElementById("userHealthDisplay").textContent = userCharacter.health;
             
                if (userCharacter.health <= 0) {
                    gameoverScreen("You lost the game! booo.. You suck!")
                    setTimeout(function(){      location.reload(); }, 5000);
                }
            }
            console.log("user health is = ", userCharacter.health, "computer health is = ", computerCharacter.health);
            return;
        };

        //function för datorn att välja om den ska evade, eller attackera
        function computerDecision() { //1 för evade 2 för attack
            let computerDecisionValue = Math.floor(Math.random() * 2);
            if (computerDecisionValue === 0) {
                battleInfoScript("Your Opponent decided to evade!");
                reduceDamage(computerCharacter.honest, computerCharacter.userObject);
                return;
            } else if (computerDecisionValue === 1) {
                battleInfoScript("Your Opponent decided to not risk it and keeps his damage output!");
                return;
            }
        }


        const randomLoadingResponse = () => {

            //Find more fun stuff to add
            const list = [
                "Media doing its thing...", "placeholder"
            ]

            let anwser = pickRandomFromArray(list);
            return anwser;
        };

        //function för att fuska med laddtid mellan drag!
        function fakeLoadStart() {
            let fakeLoadingBox = document.getElementById("fakeLoadingBox");
            let fakeloaddisplay = document.getElementById("fakeLoading");
            fakeLoadingBox.style.display = "block";

            let randomizedLoadingResponse = randomLoadingResponse()

            fakeloaddisplay.textContent = randomizedLoadingResponse;

            let hideEveryBtn = document.querySelectorAll("button");
            for (i = 0; i < hideEveryBtn.length; i++) {
                hideEveryBtn[i].style.display = "none";
                console.log(hideEveryBtn);
            };
            return;
        }

        function fakeloadEnd() {
            let fakeLoadingBox = document.getElementById("fakeLoadingBox");
            fakeLoadingBox.style.display = "none";
        }
        let GameButton = document.getElementById("startRound").addEventListener("click", function () {
            //Fake loading screen!
            fakeLoadStart()
            setTimeout(function () {
                fakeloadEnd();
                //Call damage being dealt on enemy
                calculateDamage(userCharacter.lie, userCharacter.userObject);
                document.getElementById("userAttackInformation").textContent = userCharacter.damage;
                //call damage being dealt on user
                calculateDamage(computerCharacter.lie, computerCharacter.userObject);
                document.getElementById("computerAttackInformation").textContent = computerCharacter
                    .damage;
                alterButtons(1);
                console.log("user", userCharacter);
            }, 1500);

        });

        let computerDecisionGame = document.getElementById("computerChoice").addEventListener("click", function () {
            //Fake loading screen!
            fakeLoadStart()
            setTimeout(function () {
                fakeloadEnd();
                alterButtons(2);
                computerDecision();
                battleInfoScript(
                    "You want to evade or attack right away? If you choose evade, you have a 50% chance of losing ALL of your CURRENT damage! BUT YOU ALSO have a chance to reduce your OPPONENT'S damage, the luck to reduce it is based on your honesty!"
                );
            }, 1500);
        });

        let evadeGame = document.getElementById("evade").addEventListener("click", function () {
            //Fake loading screen!
            fakeLoadStart()
            setTimeout(function () {
                fakeloadEnd();
                alterButtons(3);
                reduceDamage(userCharacter.honest, userCharacter.userObject);
            }, 1500);
        });

        let attackGame = document.getElementById("attack").addEventListener("click", function () {
            fakeLoadStart()
            setTimeout(function () {
                fakeloadEnd();
                alterButtons(4);
                dealDamage(userCharacter.userObject);
               dealDamage(computerCharacter.userObject);
                deleteInformation();
            }, 1500);
        });


//TO DOO!!!!!!!!!!!!!!!!!!!!!

//ADD VECTOR IMAGES..
//CEIL OR FLOOR OFF ENEMY NUMBER...  
