
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
    import { getFirestore,collection,getDoc, addDoc, query, getDocs,doc } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js'
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
   const db = getFirestore(app);

export class Storage {
    static async setData(name, content) {
        console.log(content + "entrou 19")
        name = 'presenca'
        content = '{nome:casa}}'
        try {
            const docRef = await addDoc(collection(db, name),content
            );
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
       
/*             return true
 */   
    }

    static async getData(name) {
        const docRef = doc(db, name);
const docSnap = await getDoc(docRef);

        try {
            const response = await getDocs(collection(db, "Sugestao"));


            if (!response.ok) {
                throw new Error(response.text)
            }
            return response.text
        } catch (e) {
            console.error(e)
/*             return null
 */        }
    }
}