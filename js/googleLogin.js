import { GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js"
import { showMessage } from "./showMessage.js";
import { auth } from "./firebase.js"

const googleButton = document.querySelector('#googleLogin');

googleButton.addEventListener('click', async (e) => {
    e.preventDefault();

const provider = new GoogleAuthProvider();

try {
    const credentials = await signInWithPopup(auth, provider)
    console.log(credentials);
    console.log("sesion iniciada con google");

    // Cerrar el modal de logueo de usuario
    const modal = bootstrap.Modal.getInstance(document.querySelector('#signinModal'));
    modal.hide();
    
    // Mostrar mensaje de bienvenida
    showMessage('Bienvenido  ' + credentials.user.displayName, 'success');
} catch (error) {
    console.log(error);
}
});