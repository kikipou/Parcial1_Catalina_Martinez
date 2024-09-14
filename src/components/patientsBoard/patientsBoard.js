import '../patientCard/patientCard.js'

class PatientsBoard extends HTMLElement {
    constructor(){
        super()
        this.attachShadow({mode: 'open'});
        this.patients = []
    }

    connectedCallback(){
        this.render()

        const form = this.shadowRoot.querySelector('.patients-form')
        form.addEventListener("submit", (e)=>{
            e.preventDefault()
        
            const name = this.shadowRoot.querySelector('.input-name').value
            const specie = this.shadowRoot.querySelector('.input-specie').value
            const breed = this.shadowRoot.querySelector('.input-breed').value
            const date = this.shadowRoot.querySelector('.input-date').value
            const symptoms = this.shadowRoot.querySelector('.input-symptoms').value

            this.patients.push({name, specie, breed, date, symptoms, state: false})

            this.addPatient({name, specie, breed, date, symptoms, state: false})
            
            form.reset()
        })
    }

    render(){
        this.shadowRoot.innerHTML = `
        <h2>Lista de pacientes</h2>
        <form class="patients-form">
            <input type="text" placeholder="Nombre" class="input-name" required>
            <input type="text" placeholder="Especie" class="input-specie" required>
            <input type="text" placeholder="Raza" class="input-breed" required>
            <input type="date" placeholder="Fecha de ingreso" class="input-date" required>
            <input type="text" placeholder="Síntomas" class="input-symptoms" required>
            <button>Agregar paciente</button>
        </form>
        <ul class="patients-container">
        </ul>
        `

        this.patients.forEach(patients => this.addPatient(patients))
    }

    addPatient({name, specie, breed, date, symptoms, state}){
        
        const patientsContainer = this.shadowRoot.querySelector('.patients-container')
        patientsContainer.innerHTML += `
        <patient-item name="${name}" specie="${specie}" breed="${breed}" date="${date}" symptoms="${symptoms}" state="${state}"></patient-item>
        `
    }
}

customElements.define('patient-board', PatientsBoard)
export default PatientsBoard