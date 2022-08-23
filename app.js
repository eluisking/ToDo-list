const fecha = document.querySelector('#fecha');
const lista = document.querySelector('#lista');
const input = document.querySelector('#input');
const btnAgregar = document.querySelector('#enter');
const check = 'fa-check-circle';
const onCheck = 'fa-circle';
const LineThrough = 'line-throuhg';
let id;
let LIST = [];

//Fecha de la TL
const FECHA = new Date();
fecha.innerHTML = FECHA.toLocaleDateString('es-MX',{weekday:'long', month:'short', day:'numeric'});


function agregarTarea(tarea,id,realizado,eliminado){

    // Si eliminado existe no ejecuta nada
    if(eliminado){
        return
    }

    const REALIZADO = realizado ? check : onCheck;
    const LINE = realizado ? LineThrough : '';


    const elemento = `
        <li id="elemento">
            <i class="far ${REALIZADO}" data="realizado" id="${id}"></i>
            <p class="text ${LINE}">${tarea}</p>
            <i class="fas fa-trash de" data="eliminado" id="${id}"></i> 
        </li>
    `;

    // Este indica donde los va insertar segun los parametros
    lista.insertAdjacentHTML("beforeend", elemento);
}

// Funcion tarea realizada
function tareaRealizada(element){
    //Si detecta que esta en uno lo cambia por el otro y asi
    element.classList.toggle(check);
    element.classList.toggle(onCheck);
    element.parentNode.querySelector('.text').classList.toggle(LineThrough);
    LIST[element.id].realizado = LIST[element.id].realizado ? false : true;
}


//Tarea eliminada
function TareaEliminado(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
}

//Evento con el botn de agregar
btnAgregar.addEventListener('click', () => {
    const tarea = input.value;
    if(tarea){
        agregarTarea(tarea,id,false,false);
        LIST.push({
            nombre: tarea,
            id: id,
            realizado:false,
            eliminado: false
        });
    };


    localStorage.setItem('TODO',JSON.stringify(LIST));

    input.value = "";
    id++;
});

//Este responde con el enter pero hace lo mismo que la de arriba
document.addEventListener('keyup', function(event){
    if(event.key=='Enter'){
        const tarea = input.value;
        if(tarea){
            agregarTarea(tarea,id,false,false);
            LIST.push({
                nombre: tarea,
                id: id,
                realizado:false,
                eliminado: false
            });
            };


        localStorage.setItem('TODO',JSON.stringify(LIST));
        
        input.value = "";
        id++;
    }
});


lista.addEventListener('click',function(event){
    const element = event.target;
    const elementData = element.attributes.data.value;
    //console.log(element.attributes.data.value)

    if(elementData === 'realizado'){
        tareaRealizada(element);
    }else if(elementData === 'eliminado'){
        TareaEliminado(element);
    };
    localStorage.setItem('TODO',JSON.stringify(LIST));

});


//localStorage.setItem('Todo.JOSN.stringify(LIST));


//localStorage.getItem('Todo);
let data = localStorage.getItem('TODO');
if(data){
    LIST=JSON.parse(data);
    id = LIST.length;
    cargarLista(LIST);
}else{
    LIST = [];
    id = 0;
}

function cargarLista(DATA){
    DATA.forEach(function(i){
        agregarTarea(i.nombre,i.id,i.realizado,i.eliminado)
    });
}