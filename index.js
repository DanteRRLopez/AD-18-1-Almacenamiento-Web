const itemsContainer = document.querySelector("#list-items")

function addItem(item) {
  const colourCard = document.createElement("section")
  colourCard.className = "card w-75"
  itemsContainer.append(colourCard)

  const colourCardBody = document.createElement("article")
  colourCardBody.className = "card-body"
  colourCard.append(colourCardBody)

  const colourCardTitle = document.createElement("h5")
  colourCardTitle.className = "card-title"
  colourCardTitle.innerText = item.name
  colourCardBody.append(colourCardTitle)

  const colourCardText = document.createElement("p")
  colourCardText.className = "card-text"
  colourCardText.innerText = item.pantone_value
  colourCardBody.append(colourCardText)

  const colourCardColour = document.createElement("figure")
  colourCardColour.style = "background-color: " + item.color + ";"
  colourCardColour.innerText = item.color
  colourCardBody.append(colourCardColour)

  const colourCardBreak = document.createElement("br")
  itemsContainer.append(colourCardBreak)
}

function clearList() {
  itemsContainer.innerHTML = "";
}

// === Configuración de la API ===
const API_URL = "https://reqres.in/api/unknown?per_page=12";
// Clave gratuita que se obtiene en "Get Free API Key" en reqres.in
const API_KEY = "reqres-free-v1";

// === Tarea 1 y 3: Fetch + guardar en localStorage ===
async function fetchColorsList() {
  try {
    const response = await fetch(API_URL, {
      headers: {
        "x-api-key": API_KEY, // necesario para evitar "Missing API key"
      },
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const json = await response.json();
    const data = Array.isArray(json.data) ? json.data : [];

    // Guardar en localStorage (Tarea 3)
    localStorage.setItem("colors", JSON.stringify(data));

    // Pintar en pantalla (Tarea 2)
    clearList();
    data.forEach(addItem);
  } catch (err) {
    console.error(err);
    alert("No se pudo obtener la lista desde la API. Cargaré lo guardado (si existe).");
    loadColorsFromStorage();
  }
}

// === Tarea 4: Cargar desde localStorage ===
function loadColorsFromStorage() {
  clearList();
  const raw = localStorage.getItem("colors");
  if (!raw) return;
  try {
    const data = JSON.parse(raw);
    (data || []).forEach(addItem);
  } catch (e) {
    console.error("Error al parsear localStorage:", e);
  }
}

// === Tarea 5: Botón borrar ===
function clearColors() {
  localStorage.removeItem("colors");
  clearList();
}

// === Eventos de botones (Tarea 6 y borrar) ===
document.getElementById("btn-load").addEventListener("click", fetchColorsList);
document.getElementById("btn-clear").addEventListener("click", clearColors);

// Al entrar a la página, intenta mostrar lo guardado
loadColorsFromStorage();