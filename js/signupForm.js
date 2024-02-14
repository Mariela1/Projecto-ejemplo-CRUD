import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js"
import { auth } from "./firebase.js"        
import { showMessage } from "./showMessage.js"

const signupForm = document.querySelector('#signup-form')

signupForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    const email = signupForm['signup-email'].value
    const password = signupForm['signup-password'].value

    //console.log(email, password)

    try {
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
        console.log(userCredentials)

        // cerrar el modal de registro de usuario
        const signupModal = document.querySelector('#signupModal')
        const modal = bootstrap.Modal.getInstance(signupModal).hide()
        modal.hide()


    
        //Mostrar el mensaje de bienvenida
        showMessage('Bienvenido' + userCredentials.user.email);

    } catch (err) {
        console.log(err.message)
        console.log(err.code)

        if (err.code === 'auth/email-already-in-use') {
            showMessage('El correo electrónico ya está en uso')
        } else if (err.code === 'auth/invalid-email') {
            showMessage('El correo electrónico no es válido')
        } else if (err.code === 'auth/weak-password') {
            showMessage('La contraseña debe tener al menos 6 caracteres')
        } else if (err.code) {
            showMessage('Algo salio mal')
        }
    
    
    }
})