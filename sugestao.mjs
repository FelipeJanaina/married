
// arquivo: main.js

import { configurarTabela } from './source/minhaTabela.js';


import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
    const firebaseConfig = {
        apiKey: "AIzaSyBfWS013sT_FQU_BOM-fYTuZimktikxspg",
        authDomain: "casamentof-j.firebaseapp.com",
        projectId: "casamentof-j",
        storageBucket: "casamentof-j.appspot.com",
        messagingSenderId: "496291850377",
        appId: "1:496291850377:web:ee68cee70425e9e7e67e58",
        measurementId: "G-QSZH5VKXC7"
    };
    import { getFirestore,collection,getDoc, where,addDoc, query, getDocs,doc } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js'
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
   const db = getFirestore(app);

    // Aguarda o HTML da página ser totalmente carregado
document.addEventListener('DOMContentLoaded',  async function (event) {
// Obtém a referência para a tabela
var minhaTabela = document.getElementById('sugestoes');
var corpo_tabela = minhaTabela.querySelector("tbody");


    const q = query(collection(db, "Sugestao"));
    let i = 0;
    let dados = "";

    const resultados = await getDocs(q);
    resultados.forEach((doc) => {
        dados = dados + "<tr> <td>" + doc.data().nome + "</td><td>" + doc.data().escolhido + "</td></tr> "
});
// console.log(dados)
corpo_tabela.innerHTML = dados;
$(document).ready(function() {
    configurarTabela();
  });
 
      
  });


  const form = document.querySelector("#formulario");

form.addEventListener("submit", async function(event) {
  event.preventDefault();


 // Seu código para lidar com o envio do formulário aqui
 var nome = document.getElementById("input").value;
 var escolhido = false;


              console.log("ok");
              //cadastra novo presente
              try {
                  const docRef = await addDoc(collection(db, 'Sugestao'),{
                     nome,escolhido 
                  }
                  );
                  console.log("Document written with ID: ", docRef.id);
              } catch (e) {
                 var divErro = document.querySelector('.error-presence');
                 divErro.style.display = 'block';

                 divErro.innerHTML = ' Erro ao informar'
              }
          }); 


   
