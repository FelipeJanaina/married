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
    import { getFirestore,collection,getDoc,setDoc, where,addDoc, query, getDocs,doc } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js'
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
   const db = getFirestore(app);

   const form = document.querySelector("#formulario");
   const form_presente = document.querySelector("#form_presente");
   const form_sugest = document.querySelector("#form_sugest");

   
   //await setDoc(doc(db, "Sugestao", "cvichkEM0R94pMr2TMPR"), {
   //nome:'teste2'
     //});
     form_sugest.addEventListener("submit", async function(event) {
       event.preventDefault();
   
  
      // Seu código para lidar com o envio do formulário aqui
      var id = document.getElementById("doc-id").value;
      var celular = document.getElementById("celular").value;
      var opcoes = document.getElementsByName("rdo");
      // Percorre a lista de opções e verifica qual delas está selecionada
for (var i = 0; i < opcoes.length; i++) {
    if (opcoes[i].checked) {
      // Retorna o valor da opção selecionada
      var valorSelecionado = opcoes[i].value;
      break;
    }
  }
  
  

                   console.log("ok");
                   //cadastra novo presente
                   let successMsg = document.createElement("div");
                   console.log(id + " id: " + valorSelecionado + " " + celular)
                   try {
                       setDoc(doc(db, 'Sugestao', id),{ dividir: valorSelecionado,escolhido:true,numero:celular }, { merge: true });
                        //alert('ok')
                        // cria um elemento de mensagem de sucesso e adiciona-o ao corpo da página
                        successMsg.innerHTML = "Escolha cadastrada com sucesso!";
                        successMsg.classList.add("toast");
                        document.body.appendChild(successMsg);
                        // define um tempo limite para o toast e remove-o após 5 segundos
                        setTimeout(function() {
                          successMsg.remove();
                        }, 5000);
                        var divErro = document.querySelector('#modal-escolher');
                        divErro.style.display = 'none';

                    } catch (e) {
                        console.log("catch")
                        var divErro = document.querySelector('.error-sugest');
                        divErro.style.display = 'block';
                        
                        divErro.innerHTML = ' Erro ao informar'
                    }
                    
               });   
   form.addEventListener("submit", async function(event) {
     event.preventDefault();
 

    // Seu código para lidar com o envio do formulário aqui
    var nome = document.getElementById("input-presence").value;
    var opcoes = document.getElementsByName("acompanhante");
    // Percorre a lista de opções e verifica qual delas está selecionada
for (var i = 0; i < opcoes.length; i++) {
  if (opcoes[i].checked) {
    // Retorna o valor da opção selecionada
    var acompanhante = opcoes[i].value;
    break;
  }
}

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
                     const docRef = await addDoc(collection(db, 'Sugestao'),{
                        nome:presente,
                        escolhido:true,
                        dividir:false
                     }
                     );
                     successMsg.innerHTML = "Presente cadastrado com sucesso!";
                     successMsg.classList.add("toast");
                     document.body.appendChild(successMsg);
                     // define um tempo limite para o toast e remove-o após 5 segundos
                     setTimeout(function() {
                       successMsg.remove();
                     }, 5000);
                     var divErro = document.querySelector('#modal-present');
                     divErro.style.display = 'none';    
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
        produto.value = produto.value.toLowerCase()
        const q = query(collection(db, "Sugestao"), where("nome", "==", produto.value));
        let i = 0;

        const resultados = await getDocs(q);
        resultados.forEach((doc) => {
            
            i++
            
        });
        console.log(i + "tamanho")
        present_info.innerHTML = 'Mais ' + i + ' registro(s)';

    })

   
