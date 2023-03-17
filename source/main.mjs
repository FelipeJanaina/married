import { Callable } from './base.mjs'
import { Storage } from './Storage.mjs'

Callable(function presence(element, visible) {
    if (visible) {
        
    }
})

Callable(function present(element, visible) {
    if (visible) {
        element.querySelector('input#input-present').focus()
    }
})

Callable(function search (element) {
    console.log("entrou");
    const value = element.value.trim()
    if (value !== '') {
        const data = Storage.getData('presentes')
        if (data !== null) {
            console.log(data)
            const json = JSON.parse(data)
            let contains = 0
            for (let present of json) {
                if (present.present.find(value)) {
                    contains++
                }
            }
            if (contains > 0) {
                const info = document.body.querySelector('p#input-present-info')
                if (contains > 1) {
                    info.innerHTML = `Outras ${contains} pessoas também vão dar presentes similares a esse`
                } else {
                    info.innerHTML = 'Outra pessoa vai dar um presente similar a esse'
                }
            }
        }
    }
})

Callable(function save (element) {
    const value = element.value.trim()
    if (value !== '') {
        const hash = localStorage.getItem('hash')
        const data = Storage.getData('presentes')
        let json = data === null ? [] : JSON.parse(data)
        for (let present of json) {
            if (present.hash === hash) {
                present.present = value
                Storage.setData('presentes', json)
                return
            }
        }
        json.push({
            hash: hash,
            present: present,
        })
        Storage.setData('presentes', json)
    }
})

Callable(function selected (element) {
    const value = parseInt(element.value)
    const name = localStorage.getItem('name')
    const data = Storage.getData('presenca')
    let json = data === null ? [] : JSON.parse(data)
    for (let presence of json) {
        if (presence.name === name) {
            presence.peoples = value
            Storage.setData('presenca', json)
            return
        }
    }
    json.push({
        name: name,
        peoples: value,
    })
    Storage.setData('presenca', json)
})