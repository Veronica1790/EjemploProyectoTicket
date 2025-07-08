///// este script es lo mismo que se encuentra en el html. Solo que acá se los subi separado para que lo analicen tambien.



const form = document.getElementById('clienteForm');
    const tableBody = document.querySelector('#clientesTable tbody');

    // POST: enviar datos
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      // ENVIO DE DATOS CON FETCH POR LA URL 

      const response = await fetch('http://localhost:3000/api/clientes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        alert('Cliente registrado');
        form.reset();
        cargarClientes(); // actualizar tabla
      } else {
        alert('Error al registrar');
      }
    });

    // GET: obtener y mostrar datos OBTENEMOS LOS DATOS Y DETERMINAMOS LA RUTA URL PARA CONECTAR CON EL BACKEND
    async function cargarClientes() {
      const response = await fetch('http://localhost:3000/api/clientes');
      const clientes = await response.json();

      tableBody.innerHTML = '';
      clientes.forEach(cliente => {
        const row = `
          <tr>
            <td>${cliente.nombre}</td>
            <td>${cliente.contacto}</td>
            <td>${cliente.email}</td>
            <td>${cliente.computadora}</td>
            <td>${cliente.problema}</td>
            <td>${cliente.diagnostico}</td>
          </tr>
        `;
        tableBody.innerHTML += row;
      });
    }

    // Cargar al iniciar
    cargarClientes();
