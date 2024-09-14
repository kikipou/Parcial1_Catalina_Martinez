class PatientCard extends HTMLElement {
    constructor(){
        super()
        this.attachShadow({mode: 'open'});
    }

    static get observedAttributes(){
        return ['name', 'specie', 'breed', 'date', 'symptoms', 'state']
    }

    connectedCallback(){
        this.render()
    }

    attributeChangedCallback(propName, oldValue, newValue){
        this.render()
        if (oldValue !== newValue) {
            this[propName] = propName === 'state' ? newValue === 'true' : newValue
            this.render()
        }
    }

    togglePatient(){
        this.state = !this.state
        this.render()
    }

    render(){
        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="./src/components/patientCard/patientCard.css">
        <li class=${this.state ? "completed" : "patient"}>
            <h3>${this.name}</h3>
            <h3>${this.specie}</h3>
            <h3>${this.breed}</h3>
            <h3>${this.date}</h3>
            <p>${this.symptoms}</p>
            <p>${!this.state ? "Pendiente" : "Atendido"}</p>
            <input type="checkbox" ${this.state ? "checked" : ""} class="patient-checkbox">
        </li>
        `

        const checkbox = this.shadowRoot.querySelector('.patient-checkbox')
        checkbox.addEventListener('change', () => this.togglePatient())
    }
}

customElements.define('patient-item', PatientCard)
export default PatientCard