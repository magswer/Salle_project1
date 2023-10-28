let countries;

async function getCountries() {
  console.log("getCountries");
  let results = await fetch("https://countries.trevorblades.com", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      query: `query getCountries {
          countries{
           name
          emoji
          capital
          currency
          code
          }
        }`,
    }),
  });
  countries = await results.json();
  console.log(countries.data);
  startRound(countries);
}

let round = 1;
let rounds = 5;
let points = 0;
let randomCountry;

function startRound() {
   document.getElementById("easteregg").style.display = "block";


  let randomNumber = Math.floor(
    Math.random() * countries.data.countries.length
  );
  randomCountry = countries.data.countries[randomNumber];

  console.log(randomCountry.name);

  document.getElementById("eastereggQuestion").innerHTML =
    "What is the capital of " + randomCountry.name + " " + randomCountry.emoji;

  let randomNumberFalseAnswer1 = Math.floor(
    Math.random() * countries.data.countries.length
  );
  let randomNumberFalseAnswer2 = Math.floor(
    Math.random() * countries.data.countries.length
  );

  let randomCountryFalse1 = countries.data.countries[randomNumberFalseAnswer1];
  let randomCountryFalse2 = countries.data.countries[randomNumberFalseAnswer2];

  const array = [
    randomCountry.capital,
    randomCountryFalse1.capital,
    randomCountryFalse2.capital,
  ];
  const shuffledArray = array.sort((a, b) => 1 - Math.random());

  document.getElementById("answer1").value = shuffledArray[0];
  document.getElementById("labelAnswer1").innerHTML = shuffledArray[0];

  document.getElementById("answer2").value = shuffledArray[1];
  document.getElementById("labelAnswer2").innerHTML = shuffledArray[1];

  document.getElementById("answer3").value = shuffledArray[2];
  document.getElementById("labelAnswer3").innerHTML = shuffledArray[2];
  document.getElementById("rounds").innerHTML = round + " / " + rounds;
  document.getElementById("points").innerHTML = points;
}

function checkAnswer() {
  var ele = document.getElementsByName("quiz");

  for (i = 0; i < ele.length; i++) {
    if (ele[i].checked) {
      if (ele[i].value === randomCountry.capital) {
        points++;
        document.getElementById("result").innerHTML = "Verdadero";
      } else {
        document.getElementById("result").innerHTML = "Falso";
      }
    }
    ele[i].checked = false;
  }
  round++;
  document.getElementById("rounds").innerHTML = round + " / " + rounds;
  document.getElementById("points").innerHTML = points;
  startRound();
}
