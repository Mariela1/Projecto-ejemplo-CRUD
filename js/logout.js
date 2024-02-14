import { signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js"
import {auth } from "./firebase.js"

const logout = document.querySelector("#logout");
logout.addEventListener("click", async (e) => {
    e.preventDefault();
try {
    await signOut(auth)
    console.log("sesión cerrada");
} catch (error) {
    console.log(error);
}
});