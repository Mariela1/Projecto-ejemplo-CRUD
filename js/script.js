import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import {auth} from './firebase.js';
import {loginCheck} from './loginCheck.js';
import {saveTask, 
    getTasks, 
    // 18. Desde Script.js importo onSnapshot
  //  onSnapshot,
// 21. importo el collection y db 
   // collection,
  //  db
  // 25. Traigo la funcion onGetTasks, que es tiempo real
  onGetTasks,
  // 39. importo el deleteTask
  deleteTask,

  // 48. Importo el getTask en singular
  getTask,
  // 56. Importar el UpdateTask
  updateTask

} from './firebase.js';
import './signupForm.js';
import './logout.js';
import './signinForm.js';
import './googleLogin.js';

//. 10. ordeno el task-form
const taskForm = document.getElementById('task-form')

// 9. Selecciono el contenedor de las tareas
const taskContainer = document.getElementById('task-container')
// 4. se le coloca el async

// 51. Creo una variable llamada Edit Status
let editStatus = false;
// 58. Creo una variable global que este vacia al inicio
let id = '';

window.addEventListener('DOMContentLoaded', async() => {
    //1. getTasks();
    //console.log("DOM cargado");
    // 2. Un querySnapshot son los datos que existen en este momento
    //const querySnapshot = await getTasks(); 19. lo quito para reemplazarlo por el Snapshot
   
// 22. ahora coloco el snapshot
// cuando ocurra un cambio en la bd de test
// voy a recibir los datos nuevos,
// creo una constante html
//recorro los datos y lo coloco en el taskcontainer
//onSnapshot(collection(db, 'test'), (querySnapshot) => {


// 23. Voy a acortar el codigo
// 26. Escribimos la nueva funcion onGetTasks y ese es el callbacks

onGetTasks((querySnapshot) => {

    // 3. Muestro el querySnapshot en consola
    //5. Puedo ver el querySnapshot por consola
   // console.log(querySnapshot)
   // onGetTasks((querySnapshot) => {

       //11. Muestro el task container
       // console.log(taskContainer)
  
        // 13. Creamos una variable Html vacio
        let html = '';
        // 6. Hago que de querySnaphot recorra los datos, por cada documento
        //7. quiero ver por consola ese documento
        querySnapshot.forEach((doc) => {
         //8. para ver los documentos en consola
          //  console.log(doc)
          //9. Para ver realmente el documento
          // con los objetos de javascript
          //console.log(doc.data())

          // 15. Creamos una variable task
          // que va a ser igual a doc.data
           // doc.data es el objeto que tiene description
            //y title
          const task = doc.data();
     
        console.log(doc.data())
                
// 32. Para ver los ids de cada tarea
// console.log(doc.id) 
                   
    // 14. Creamos una interface desde JS
        
    html += `
          
                <div>
                    <h3>${task.title}</h3>
                    <p>${task.description}</p>
                
                <button class='btn btn-delete btn-danger' data-id='${doc.id}'>Eliminar</button>
              
                <button class='btn-edit btn-success' data-id="${doc.id}">Editar</button>
                </div>
                `
                
    });

     //11. Muestro el task container
     taskContainer.innerHTML = html;
   
// 28. quiero seleccionar todos los botones     
const btnsDelete = taskContainer.querySelectorAll('.btn-delete')
// 29. pruebo en el console.log
    //console.log(btnsDelete)
// 30. Por cada boton, vamos a agregar un evento
    btnsDelete.forEach(btn => {
    // 36. cambio el e por lo que sigue
            //btn.addEventListener('click', (event) => {
            btn.addEventListener('click', ({target: {dataset}}) => {
            // 31. al dar click a cada boton, me aparece deleting
                //console.log(event.target.dataset.id) 
                console.log(dataset.id) 
            // 34. Para ver el id de cada boton
            //console.log(e)
            // 35. Buscamos la propiedad target, dataset, id
            // console.log(e.target.dataset.id)

             // 37. lo resumo
            //console.log(dataset.id)

            // 40. llamo a la funcion deleteTask
            deleteTask(dataset.id)
})
})

// 43. Creamos una lista de botones editar

const btnsEdit = taskContainer.querySelectorAll('.btn-edit')

// 44. Por cada boton, vamos a agregar un evento
btnsEdit.forEach((btn) => {
   //console.log(btn)
    // 45. Agregamos el evento
  btn.addEventListener('click', async (e) => {
    e.preventDefault()
    //console.log(e.target.dataset.id)
    // 49. Voy a llamar el getTask
        const doc = await getTask(e.target.dataset.id)
        //console.log(doc.data())
    // 50. Lo convierto a datos la tarea y descripcion
        const task = doc.data()
        taskForm['task-title'].value = task.title
        taskForm['task-description'].value = task.description
        // 52. Cambio es status
        editStatus = true;
        // 59. 
        //id = e.target.dataset.id; o tambien se puede guardar como
        id = doc.id;
        taskForm['btn-task-save'].innerText = 'Update'
        });
    });

    })


});


onAuthStateChanged(auth, (user) => {
    if (user) {
        loginCheck(user)
        try {
            console.log("sesión iniciada");
        } catch (error) {
            console.log(error);
        }
    } else {
        loginCheck(user)
    }
})


taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
  //  console.log('enviado')

    const title = taskForm['task-title']
    const description = taskForm['task-description']
    
    // 53. Vamos a agregar una condicional
    if (!editStatus) {
        //console.log('editando');
      console.log(title.value, description.value);
      saveTask(title.value, description.value);
    } else {
    // 57. llamo a la funcion UpdateTask
        updateTask(id , {
        title: title.value, 
        description: description.value});
        editStatus = false;
    }
    taskForm.reset();
});
