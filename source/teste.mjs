import { onInputChange } from './inputPresent.mjs';

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

   const form = document.querySelector("#formulario");
   const form_presente = document.querySelector("#form_presente");

   form.addEventListener("submit", async function(event) {
     event.preventDefault();
 

    // Seu código para lidar com o envio do formulário aqui
    var nome = document.getElementById("input-presence").value;
    var acompanhante = document.getElementById("acompanhante").value;

                 console.log("ok");
                 //cadastra novo presente
                 try {
                     const docRef = await addDoc(collection(db, 'presenca'),{
                        nome,acompanhante
                     }
                     );
                     console.log("Document written with ID: ", docRef.id);
                 } catch (e) {
                    var divErro = document.querySelector('.error-presence');
                    divErro.style.display = 'block';

                    divErro.innerHTML = ' Erro ao informar'
                 }
             });   
    form_presente.addEventListener("submit", async function(event) {
     event.preventDefault();
 

    // Seu código para lidar com o envio do formulário aqui
    var presente = document.getElementById("input-present").value;

                 console.log("ok");
                 //cadastra novo presente
                 try {
                     const docRef = await addDoc(collection(db, 'convite'),{
                        presente
                     }
                     );
                     console.log("Document written with ID: ", docRef.id);
                 } catch (e) {
                    var divErro = document.querySelector('.error-present');
                    divErro.style.display = 'block';

                    divErro.innerHTML = ' Erro ao informar'
                 }
             });

    var produto = document.querySelector('#input-present');
    var present_info = document.querySelector('#input-present-info');
    onInputChange(produto, function() {
        //console.log('O usuário está digitando algo!');
      });
      
    produto.addEventListener('input', async function (event) {
        const q = query(collection(db, "convite"), where("presente", "==", produto.value));
        let i = 0;

        const resultados = await getDocs(q);
        resultados.forEach((doc) => {
            
            i++
            
        });
        console.log(i + "tamanho")
        present_info.innerHTML = 'Mais ' + i + ' registro(s)';

    })

   