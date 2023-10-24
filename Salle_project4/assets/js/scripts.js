
    let section = 0;
    const sections = document.querySelectorAll("section");
    

    getLocation()


    document.addEventListener("keydown", (event) => {

	if(event.srcElement.className !== "form-control") {
      if (event.key === "a") {
        section = Math.max(0, section - 1);
      } else if (event.key === "b") {
        section = Math.min(sections.length - 1, section + 1);
      } else if (event.key > 0 && event.key < 6) {
        section = event.key-1
        window.location.hash = sections[section].id;
      }

        window.scrollTo({
          top: sections[section].offsetTop
        });
    }      
    });


    const x = document.getElementById("demo");
    let lat;
    let lon;

    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else {
        console.log("Geolocation is not supported by this browser.")
      }
    }
    
    function showPosition(position) {
      lat = position.coords.latitude
      lon = position.coords.longitude
      getWeatherData()
    }

  async function getWeatherData() {
    let response;

try {
  console.log('URL: https://api.openweathermap.org/data/2.5/weather?units=metric&lang=es&lat='+lat+'&lon='+lon+'&limit=1&appid=13fd320ea826dcf519670ed2757e0cf6')
  response = await fetch('https://api.openweathermap.org/data/2.5/weather?units=metric&lang=es&lat='+lat+'&lon='+lon+'&limit=1&appid=13fd320ea826dcf519670ed2757e0cf6');
} catch (error) {
  console.log('There was an error', error);
}

if (response?.ok) {
  console.log(response)
  const data = await response.json();
  console.log(data.main.temp)
  document.getElementById("weatherBar").style.display = "block";
  document.getElementById("weather").innerHTML = data.main.temp+" C°"
} else {
  console.log(`HTTP Response Code: ${response?.status}`)
}


  }


  function hideWeatherBar() {
    document.getElementById("weatherBar").style.display = "none";

  }