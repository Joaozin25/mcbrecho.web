// Importa o Firebase (CDN, sem npm)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { 
  getFirestore,
  doc,
  setDoc,
  getDoc 
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

// --- Configuração do seu projeto ---
const firebaseConfig = {
  apiKey: "AIzaSyC9eC7lQs0OT9hQWkOUP4q5ZuJ8vRFQr54",
  authDomain: "mc-brecho.firebaseapp.com",
  projectId: "mc-brecho",
  storageBucket: "mc-brecho.appspot.com",
  messagingSenderId: "471255548659",
  appId: "1:471255548659:web:cebdbcf01159705a6b2d86"
};

// --- Inicializa Firebase ---
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// --- Cadastro ---
const cadastroBtn = document.getElementById("cadastroBtn");
if (cadastroBtn) {
  cadastroBtn.addEventListener("click", async () => {
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const endereco = document.getElementById("endereco").value;

    try {
      // Cria o usuário na autenticação
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;

      // Salva dados adicionais no Firestore
      await setDoc(doc(db, "usuarios", user.uid), {
        nome,
        email,
        endereco
      });

      alert("✅ Cadastro realizado com sucesso!");
      window.location.href = "index.html";
    } catch (err) {
      alert("❌ Erro ao cadastrar: " + err.message);
    }
  });
}

// --- Login ---
const loginBtn = document.getElementById("loginBtn");
if (loginBtn) {
  loginBtn.addEventListener("click", async () => {
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    try {
      await signInWithEmailAndPassword(auth, email, senha);
      alert("✅ Login realizado com sucesso!");
      window.location.href = "index.html";
    } catch (err) {
      alert("❌ Erro ao fazer login: " + err.message);
    }
  });
}

// --- Exibir nome no cabeçalho ---
const loginButton = document.getElementById("loginButton");
const userMenu = document.getElementById("userMenu");
const userName = document.getElementById("userName");
const logoutBtn = document.getElementById("logoutBtn");

onAuthStateChanged(auth, async (user) => {
  if (user) {
    // Busca dados do Firestore
    const userDoc = await getDoc(doc(db, "usuarios", user.uid));
    const dados = userDoc.exists() ? userDoc.data() : { nome: "Usuário" };

    if (loginButton) loginButton.style.display = "none";
    if (userMenu) userMenu.style.display = "block";
    if (userName) userName.textContent = dados.nome;
  } else {
    if (loginButton) loginButton.style.display = "block";
    if (userMenu) userMenu.style.display = "none";
  }
});

// --- Logout ---
if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    await signOut(auth);
    alert("Você saiu da conta!");
    window.location.href = "index.html";
  });
}
