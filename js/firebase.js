        // Import the functions you need from the SDKs you need
        import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
        import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
        import {  getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
        // import { } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js"
        // import { } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js"
        import {getFirestore,
           collection, 
           addDoc,
           getDocs,
           //15. para no tener que actualizar 
           //la pagina, usamos la funcion onSnapshot
           onSnapshot,
           // 40. llamo la funcion deleteDoc
            deleteDoc,
            doc,
            // 47. Obtener una sola tarea
            getDoc,
              // 55. Importo una funcion updateDoc
            updateDoc
          }
         from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js"

        // TODO: Add SDKs for Firebase products that you want to use
        // https://firebase.google.com/docs/web/setup#available-libraries
      
        // Your web app's Firebase configuration
        // For Firebase JS SDK v7.20.0 and later, measurementId is optional
        const firebaseConfig = {
          apiKey: "AIzaSyD9_mTe1t_C34mAEqdG3zXsxbX4jSHDkyk",
          authDomain: "unidad4-7e24c.firebaseapp.com",
          projectId: "unidad4-7e24c",
          storageBucket: "unidad4-7e24c.appspot.com",
          messagingSenderId: "1059673990918",
          appId: "1:1059673990918:web:8096dde83de017d2c7a087",
          measurementId: "G-4W89RT0ZLH"
        };
      
        // Initialize Firebase
        export const app = initializeApp(firebaseConfig);
        const analytics = getAnalytics(app);
        export const auth = getAuth(app);

       
        
        export const db = getFirestore();
        
        export const saveTask = (title, description) => 
          //  console.log(title, description);
          addDoc(collection(db, 'test'), {title, description})
      
        //export const getTasks = () => console.log('tasks-list')

        export const getTasks = async () => getDocs(collection(db, 'test'))

       // export const onGetTasks = () => console.log('onGetTasks')
        

       //16. Cuando se obtengan tareas
       //export const onGetTasks = () => console.log('onGetTasks');
     
        
       // 17. exporto el objeto onSnapshot
       //export {

        //  onSnapshot,
          //20. exporto el collection y db, conexion con firestore
         // collection,
        
       //}

       // 24. vamos a generar una nueva funcion, cuando se obtengan tareas

      export const onGetTasks = (callback) => onSnapshot(collection(db, 'test'), callback)

  

     
      
      // 38. export const deleteTask = id => console.log(id);
      
       // 41. llamo a la coleccion, de donde quiero eliminar
      // solo quiero eliminar un solo dato
      export const deleteTask = id => deleteDoc(doc(db, 'test', id));

      // 46. Creo una funcion que me traiga/ obtenga una tarea en singular
      export const getTask = (id) => getDoc(doc(db, 'test', id));

      // 54. Creo una funcion que me actualice una tarea
      export const updateTask = (id,newFields ) => 
      updateDoc(doc(db, 'test', id), newFields);