document.addEventListener("DOMContentLoaded", () => {
    const emojis = ["🍎", "🍌", "🍇", "🍉", "🍒", "🍍", "🥭", "🍓"];
    let cardsArray = [...emojis, ...emojis]; // Duplica os emojis para formar pares
    let shuffledCards = shuffle(cardsArray);
    let gameBoard = document.getElementById("game-board");
    let selectedCards = [];
    let matchedCards = [];

    function createBoard() {
        gameBoard.innerHTML = "";
        shuffledCards.forEach((emoji, index) => {
            let card = document.createElement("div");
            card.classList.add("card", "hidden");
            card.setAttribute("data-index", index);
            card.setAttribute("data-emoji", emoji);
            card.innerHTML = emoji;
            card.addEventListener("click", flipCard);
            gameBoard.appendChild(card);
        });
    }

    function flipCard() {
        if (selectedCards.length < 2 && !this.classList.contains("matched")) {
            this.classList.remove("hidden");
            selectedCards.push(this);
        }

        if (selectedCards.length === 2) {
            checkMatch();
        }
    }

    function checkMatch() {
        let [card1, card2] = selectedCards;
        if (card1.getAttribute("data-emoji") === card2.getAttribute("data-emoji")) {
            card1.classList.add("matched");
            card2.classList.add("matched");
            matchedCards.push(card1, card2);
            selectedCards = [];
            if (matchedCards.length === shuffledCards.length) {
                setTimeout(() => alert("🎉 Você venceu!"), 300);
            }
        } else {
            setTimeout(() => {
                card1.classList.add("hidden");
                card2.classList.add("hidden");
                selectedCards = [];
            }, 1000);
        }
    }

    function shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    document.getElementById("restart-button").addEventListener("click", () => {
        shuffledCards = shuffle([...emojis, ...emojis]);
        matchedCards = [];
        selectedCards = [];
        createBoard();
    });

    createBoard();
});
