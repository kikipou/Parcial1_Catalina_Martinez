import * as components from './components/indexPadre.js'

class AppContainer extends HTMLElement {
    constructor(){
        super()
        this.attachShadow({mode: 'open'});
    }

    connectedCallback(){
        this.render()
    }

    render(){
        this.shadowRoot.innerHTML = `
        <h1>Añadir pacientes</h1>
        <patient-board></patient-board>
        `
    }
}

customElements.define('app-container', AppContainer)