import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js"
import { auth } from "./firebase.js"
import { showMessage } from "./showMessage.js";

const signInForm = document.querySelector('#login-form');

signInForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = signInForm["signin-email"].value;
    const password = signInForm["signin-password"].value;
    try {
        const userCredentials = await signInWithEmailAndPassword(auth, email, password)
        //console.log(userCredentials)
        
        // cerrar el modal de logueo de usuario
        const modal = bootstrap.Modal.getInstance(signInForm.closest('.modal'));
        modal.hide();
        
        // Mensaje de bienvenida
        showMessage('Bienvenido  ' + userCredentials.user.email);

    } catch (error) {
        //console.log(error)
        if (error.code === 'auth/wrong-password')
        {
            showMessage('Contraseña incorrecta', 'error')
        } else if (error.code === 'auth/user-not-found') {
            showMessage('Usuario no encontrado', 'error')
        } else if (error.code === 'auth/invalid-email') {
            showMessage('Correo electrónico no válido', 'error')
        } else {
            showMessage('Otro tipo de error','error')
        }
    }
    
});