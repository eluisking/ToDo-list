const fecha = document.querySelector('#fecha');
const lista = document.querySelector('#lista');
const input = document.querySelector('#input');
const btnAgregar = document.querySelector('#enter');



function agregarTarea(tarea){
    const elemento = `
    <li id="elemento">
        <i class="far fa-circle co" data="realizado" id="0"></i>
        <p class="text">${tarea}</p>
        <i class="fas fa-trash de" data="eliminado" id="0"></i>
    </li>
    `;

    // Este indica donde los va insertar segun los parametros
    lista.insertAdjacentHTML("beforeend", elemento);
}

//Evento con el botn de agregar
btnAgregar.addEventListener('click', () => {
    const tarea = input.value;
    if(tarea){
        agregarTarea(tarea);
    };

    input.value = "";
});

//Este responde con el enter pero hace lo mismo que la de arriba
document.addEventListener('keyup', function(event){
    if(event.key=='Enter'){
        const tarea = input.value;
        if(tarea){
            agregarTarea(tarea);
            };

        input.value = "";
    }
})