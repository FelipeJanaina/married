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
        }
    } else {
        this.setAttribute('_display', display)
        this.style.display = 'none'
    }
    e.preventDefault()

}

document.body.addEventListener('click', e => {
    e.preventDefault()
    if (e.target.hasAttribute('toggle')) {
   
        const target = document.body.querySelector(`#${e.target.getAttribute('toggle')}`);
        if (target !== null) {
          target.classList.toggle('is-active');
            target.toggle()
        }
    }else{
        const element = e.target;
        element.classList.add('is-active');
    }
})