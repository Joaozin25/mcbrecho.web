// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut 
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

// 🔧 Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC9eC7lQs0OT9hQWkOUP4q5ZuJ8vRFQr54",
  authDomain: "mc-brecho.firebaseapp.com",
  projectId: "mc-brecho",
  storageBucket: "mc-brecho.appspot.com",
  messagingSenderId: "471255548659",
  appId: "1:471255548659:web:cebdbcf01159705a6b2d86"
};

// 🔥 Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 🧠 Funções úteis de autenticação
export async function login(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("✅ Login realizado com sucesso!");
    window.location.href = "index.html";
  } catch (error) {
    alert("❌ Erro ao fazer login: " + error.message);
  }
}

export async function register(email, password) {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    alert("✅ Conta criada com sucesso!");
    window.location.href = "index.html";
  } catch (error) {
    alert("❌ Erro ao criar conta: " + error.message);
  }
}

export async function logout() {
  try {
    await signOut(auth);
    alert("👋 Você saiu da conta.");
    window.location.href = "login.html";
  } catch (error) {
    alert("❌ Erro ao sair: " + error.message);
  }
}

// 📤 Exporta o auth para outras páginas usarem
export { auth };
