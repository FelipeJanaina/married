window._callable = {}

Element.prototype.toggle = function () {
    
    let display = this.style.display
    if (display === '') {
        display = window.getComputedStyle(this).getPropertyValue('display')
    }
    if (display === 'none') {
        if (this.hasAttribute('_display')) {
            this.style.display = this.getAttribute('_display')
            this.removeAttribute('_display')
        } else {
            this.style.display = 'block'
            //document.getElementById("sugest").style.display = 'none'
            
        }
    } else {
        this.setAttribute('_display', display)
        this.style.display = 'none'
        //document.getElementById("sugest").style.display = 'block'
    }
    if (this.hasAttribute('ontoggle')) {
        const name = this.getAttribute('ontoggle')
        if(name == 'escolher'){
                            // Recupera o valor do doc.id
                            var docId = document.getElementById('button_escolher').value;
                            //document.getElementById("doc-id").value = docId;
        }
        window._callable[name](this, this.style.display !== 'none')
    }
}

document.body.addEventListener('click', e => {
    if (e.target.hasAttribute('toggle')) {
        const target = document.body.querySelector(`#${e.target.getAttribute('toggle')}`)
        if (target !== null) {
            target.toggle()
        }
        e.preventDefault()
    }
})

document.body.addEventListener('change', e => {
    if (e.target.hasAttribute('onchange')) {
        window._callable[e.target.getAttribute('onchange')](e.target)
    }
})

document.body.addEventListener('submit', e => {
    if (e.target.hasAttribute('onsubmit')) {
        window._callable[e.target.getAttribute('onsubmit')](e.target)
    }
})

export function Callable(func) {
    window._callable[func.name] = func
}