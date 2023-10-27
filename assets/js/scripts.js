
    let section = 0;
    const sections = document.querySelectorAll("section");
    

    getLocation()


    document.addEventListener("keydown", (event) => {

	if(event.srcElement.className !== "form-control") {
      if (event.key === "a") {
        section = Math.max(0, section - 1);
      } else if (event.key === "b") {
        section = Math.min(sections.length - 1, section + 1);
      } else if (event.key === "h") { // Si la tecla pulsada es h
            addModal(); // Abrirá el modal de ayuda
            console.log("Estoy apretando letra h");
      } else if (event.key === "Escape") { // Si la letra pulsada es Escape
            closeModal(); // Cerrará el modal de ayuda
      //} else if (event.key > 0 && event.key < 6) {
      } else if (event.key > 0 && event.key < 7) {
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




  async function getCountries() {
    console.log("getCountries")
    let results = await fetch('https://countries.trevorblades.com', {
      method: 'POST',
  
      headers: {
        "Content-Type": "application/json"
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
        }`
      })
    })
    let countries = await results.json();
    console.log(countries.data)



let randomNumber = Math.floor(Math.random() * countries.data.countries.length);
let randomcountry = countries.data.countries[randomNumber];

console.log(randomcountry.name)
 
document.getElementById("eastereggQuestion").innerHTML = "What is the capital of "+ randomcountry.name;

  }


  // Función para crear elementos

  function element(tag, options, children) { // Le pasaremos la etiqueta de lo que queremos crear, después los atributos  y los hijos
    let {classNames: classNames, ...atributs} = options; 

    const el = document.createElement(tag); // Guardará qué elemento vamos a crear en una variable
    for (const child of children) { // Recorrerá los hijos que queremos añadir
        el.append(child); // Los añadirá al padre
    }
    for (const className of classNames || []) { // Recorrerá las clases que queramos
        el.classList.add(className); //Añadirá las clases
    }
    for (const atributName in atributs) { // Recorrerá el resto de atributos
      el.setAttribute(atributName, atributs[atributName]); // Y los añadirá
    }
    return el; // Devuelve el elemento creado
}


// Función para crear el modal de ayuda

function createModal()  {
  
  //let titulos = [...document.querySelectorAll('section[data-key]')] // Captura las secciones que saldrán en el modal
  let titulos = [...document.querySelectorAll('section')] // Captura las secciones que saldrán en el modal

  .map(section => { // Recorre las secciones para crear los li de la ul de secciones
    if(section.dataset.key != 0){ // Si la sección no es 0

      const key = section.dataset.key // Captura el data key

      console.log("key: " + key);

      const title = section.querySelector('h2').textContent // Captura el título
      return element('li', {classNames : ['list-group-item']}, [element('kbd', {}, [key]), ' ', title]) // Crea el elemento li usando la función de crear elementos hecha antes, añadiendo la clase y el hijo que será un elemento nuevo con el parámetro de la variable key para el número de sección y el título de la misma
    }
  })

  let modal = element('div', {classNames: ['modal', 'show']}, [ // Creamos el modal con la función de crear elementos
    element('div', {classNames: ['modal-dialog']}, [ // Diferentes div con clases
      element('div', {classNames: ['modal-content']}, [
        element('div', {classNames: ['modal-header']}, [
          element('h5', {classNames: ['modal-title']}, ['Help']), // El título del modal
          element('button', {classNames: ['btn-close'], type: 'button', onclick: 'closeModal()'}, []) // El botón para cerrar la ventana
        ]),
        element('div', {classNames: ['modal-body']}, [element('p', {classNames: ['ms-2', 'fs-5']}, ['Select 1-5 to jump to webpage sections.']), // El título del modal

          element('ul', {classNames : ['list-group']}, titulos) // Creamos la lista de secciones usando los titulos de antes
        ])
      ])
    ])
  ]);
  return modal; // devuelve el modal construido
}

// Funcion para añadir modal al segundo de cargar la página y quitarlo a los 5 segundos

function addModal(){
  console.log("Hola!!!!");
  let modalToAdd = createModal(); // Llama a la función para crear el modal
  document.body.appendChild(modalToAdd); // Lo añade al documento

  console.log("=============================");
  console.log(modalToAdd);

}

function closeModal(){
  let modalToClose = document.getElementsByClassName("modal"); // Captura el modal
  if(modalToClose.length > 0) { // Si la array es más larga de 0, o sea, contiene un modal
    modalToClose[0].remove(); // Quita el primer elemento de la array (el modal)
  }
}

getCountries()

//addModal()

setTimeout(addModal, 1000) // Para que se visualice en pantalla al segundo de cargar la página
setTimeout(closeModal, 5000) // Para que desaparezca a los 5 segundos
