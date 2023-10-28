

function element(tag, options, children) {
  // Le pasaremos la etiqueta de lo que queremos crear, después los atributos  y los hijos
  let { classNames: classNames, ...atributs } = options;

  const el = document.createElement(tag); // Guardará qué elemento vamos a crear en una variable
  for (const child of children) {
    // Recorrerá los hijos que queremos añadir
    el.append(child); // Los añadirá al padre
  }
  for (const className of classNames || []) {
    // Recorrerá las clases que queramos
    el.classList.add(className); //Añadirá las clases
  }
  for (const atributName in atributs) {
    // Recorrerá el resto de atributos
    el.setAttribute(atributName, atributs[atributName]); // Y los añadirá
  }
  return el; // Devuelve el elemento creado
}

function createModal() {
  console.log("createModal");
  let titulos = [...document.querySelectorAll("section[data-key]")] // Captura las secciones que saldrán en el modal

    .map((section) => {
      // Recorre las secciones para crear los li de la ul de secciones
      if (section.dataset.key != 0) {
        // Si la sección no es 0
        const key = section.dataset.key; // Captura el data key
        const title = section.querySelector("h2").textContent; // Captura el título
        return element("li", { classNames: ["list-group-item"] }, [
          element("kbd", {}, [key]),
          " ",
          title,
        ]); // Crea el elemento li usando la función de crear elementos hecha antes, añadiendo la clase y el hijo que será un elemento nuevo con el parámetro de la variable key para el número de sección y el título de la misma
      }
    });

  let modal = element("div", { classNames: ["modal", "show"] }, [
    // Creamos el modal con la función de crear elementos
    element("div", { classNames: ["modal-dialog"] }, [
      // Diferentes div con clases
      element("div", { classNames: ["modal-content"] }, [
        element("div", { classNames: ["modal-header"] }, [
          element("h5", { classNames: ["modal-title"] }, ["Help"]), // El título del modal
          element(
            "button",
            {
              classNames: ["btn-close"],
              type: "button",
              onclick: "closeModal()",
            },
            []
          ), // El botón para cerrar la ventana
        ]),
        element("div", { classNames: ["modal-body"] }, [
          element("p", { classNames: ["ms-2", "fs-5"] }, [
            "Select 1-5 to jump to webpage sections.",
          ]), // El título del modal

          element("ul", { classNames: ["list-group"] }, titulos), // Creamos la lista de secciones usando los titulos de antes
        ]),
      ]),
    ]),
  ]);
  return modal;
}

function addModal() {
  console.log("addModal");
  let modalToAdd = createModal(); // Llama a la función para crear el modal
  console.log("append");

  document.body.appendChild(modalToAdd); // Lo añade al documento
}
setTimeout(addModal, 1000); // Para que se visualice en pantalla al segundo de cargar la página
setTimeout(closeModal, 2000); // Para que desaparezca a los 5 segundos

// Función para cerrar el modal

function closeModal() {
  let modalToClose = document.getElementsByClassName("modal"); // Captura el modal
  if (modalToClose.length > 0) {
    // Si la array es más larga de 0, o sea, contiene un modal
    modalToClose[0].remove(); // Quita el primer elemento de la array (el modal)
  }
}

