// 

// Select and Turns count container

let select_level = document.getElementById("select_level");
let turns = document.getElementById("turns_text");
let open_all_cards_button = document.getElementById("open_all_cards");
let turns_count = 40;
let open_all_cards_count = 2;


function findOption(select) {

    const option = select.querySelector(`option[value="${select.value}"]`);

    switch (option.value) {
        case "easy":
            turns_count = 40;
            open_all_cards_count = 2;
            break;
        case "middle":
            turns_count = 30;
            open_all_cards_count = 1;
            break;
        case "hard":
            turns_count = 20;
            open_all_cards_count = 0;
            break;
        default:
            alert("Error")
            break;
    }

    TurnsCountText();
    OpenAllCardsText();

}

function TurnsCountText() {
    turns.innerText = "Turns: " + turns_count;
}

TurnsCountText();

function OpenAllCardsText() {
    open_all_cards_button.innerText = "Open all cards " + `(${open_all_cards_count})`;
}

OpenAllCardsText();



// Fruit images 

let BackCards = [];
let apple = 'url(./images/apple.png)';
let banana = 'url(./images/banana.png)';
let blackberries = 'url(./images/blackberries.png)';
let grapes = 'url(./images/grapes.png)';
let kiwi = 'url(./images/kiwi.png)';
let lemon = 'url(./images/lemon.png)';
let lime = 'url(./images/lime.png)';
let orange = 'url(./images/orange.png)';
let pear = 'url(./images/pear.png)';
let rosehip = 'url(./images/rosehip.png)';
let strawberry = 'url(./images/strawberry.png)';
let watermelon = 'url(./images/watermelon.png)';

let fruits_arr = [apple,banana,blackberries,grapes,kiwi,lemon,lime,orange,pear,rosehip,strawberry,watermelon];

let score = 0;

let game_end = document.getElementById("end_game");
let reload_button = document.getElementById("game_reload");


// Reload game function


let end_game_text = document.getElementById("end_game_text");

function Reload_game() {
    document.location.reload();
}
reload_button.addEventListener("click",Reload_game);


//////////////////////////////////////////////////////////////////

let FirstPartNumsArray = [];
let SecondPartNumsArray = [];


for (let i = 0; i < 12; i++) {
    FirstPartNumsArray.push(i);
    SecondPartNumsArray.push(i);
}


let RandomNumsArr = RandNumbers([...FirstPartNumsArray,...SecondPartNumsArray]);

function RandNumbers(array) {

    let j = 0;
    let temp = 0;

    for (let i = array.length - 1; i > 0; i -= 1) {

        j = Math.floor(Math.random() * (i + 1));
        temp = array[i];
        array[i] = array[j];
        array[j] = temp;

    }

    return array;
}


let indexOfCards = [];
let cards = [];
for (let i = 0; i <= 23; i++) {
    indexOfCards.push(i)
    cards.push(document.getElementById(`card${i}`));
    BackCards.push(document.getElementById(`card_back${i}`))
}


// Random cards images function

const RandomColorsofCards = () => {

    BackCards.map((item,index) => {

        indexOfCards.map(num => {

            if (index === num) {
                item.style = `
                background-image: ${fruits_arr[RandomNumsArr[index]]};
                background-size: cover;
                `
            }
        })

    })

}

// Open cards function

function OpenAllCards() {
    if (open_all_cards_count > 0) {
        open_all_cards_count--;
        OpenAllCardsText();
        open_all_cards_button.disabled = true;
        cards.map((item) => {
            if(item.style.transform !== "rotateY(90deg)"){
                item.style = `
                transform:rotateY(180deg);
                transition: 1s ease;
                pointer-events: none;
                `   
            }
        });
        setTimeout(() => {
            cards.map((item) => {
                if(item.style.transform !== "rotateY(90deg)"){
                    item.style = `
                    transform:rotateY(0deg);
                    transition: 1s ease;
                    `
                }
            });
            open_all_cards_button.disabled = false;
        }, 2000);
    }
}


// Card flip and Check functions

let current = [];


const Cards_flip = (callback) => {

    cards.map((it,index) => {

        it.current_value = RandomNumsArr[index];

        it.addEventListener("click",function () {

            indexOfCards.forEach(num => {

                if (index === num) {

                    it.style = `
                    transform:rotateY(180deg);
                    transition: 1s ease;
                    pointer-events: none;
                    `

                    if (current.length < 2) {
                        current.push(it);
                    }


                    function Check() {

                        if (current.length === 2) {

                            document.body.style.pointerEvents = "none";

                            let promise = function () {
                                return new Promise(function (resolve) {
                                    setTimeout(() => { resolve(Main_logic) },1000);
                                })
                            }


                            function Main_logic() {

                                select_level.disabled = true;
                                turns_count--;
                                TurnsCountText();

                                if (turns_count <= 0) {
                                    end_game_text.innerText = "You are lose!";
                                    end_game.style.top = "30%";
                                }

                                document.body.style.pointerEvents = "auto";

                                if (+current[0].current_value === +current[1].current_value) {

                                    current[0].style = `
                                    visibility: hidden;
                                    opacity: 0;
                                    transition: 1s ease;
                                    transform: rotateY(90deg);
                                    pointer-events: none;
                                    `;

                                    current[1].style = `
                                    visibility: hidden;
                                    opacity: 0;
                                    transition: 1s ease;
                                    transform: rotateY(90deg);
                                    pointer-events: none;
                                    `;

                                    score++;

                                    if (score === 12) {
                                        end_game_text.innerText = "You are win!";
                                        end_game.style.top = "30%";
                                    }

                                } else {
                                    current[0].style = `
                                    transition: 1s ease;
                                    transform:rotateY(0deg);
                                    `;
                                    current[1].style = `
                                    transition: 1s ease;
                                    transform:rotateY(0deg);
                                    `;
                                }

                                current = [];

                            }

                            promise().then(function (func) {
                                func();
                            })

                        }

                    }

                    Check();

                }
            })
        });
    })
}


Cards_flip();
RandomColorsofCards();