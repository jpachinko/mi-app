async function cargarRegistros() {
  const res = await fetch("/registros");
  const data = await res.json();

  const lista = document.getElementById("lista");
  lista.innerHTML = "";

data.forEach((item, i) => {
  const tr = document.createElement("tr");

  tr.innerHTML = `
    <td>${i + 1}</td>
    <td>${item.nombre}</td>
    <td>${item.cantidad}</td>
    <td class="text-end">
      <button class="btn btn-warning btn-sm" onclick="editar(${i})">
        Editar
      </button>
    </td>
  `;

  lista.appendChild(tr);
});


}

document.getElementById("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const cantidad = document.getElementById("cantidad").value;

  await fetch("/agregar", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ nombre, cantidad })
  });

  e.target.reset();
  cargarRegistros();
});

async function editar(index) {
  const nuevoNombre = prompt("Nuevo nombre:");
  const nuevaCantidad = prompt("Nueva cantidad:");

  if (!nuevoNombre || !nuevaCantidad) return;

  const res = await fetch(`/editar/${index}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nombre: nuevoNombre,
      cantidad: nuevaCantidad
    })
  });

  const respuesta = await res.json();
  alert(respuesta.mensaje);

  cargarRegistros();
}

cargarRegistros();
