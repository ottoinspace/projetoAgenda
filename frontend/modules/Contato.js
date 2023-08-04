import validator from "validator";

let alertContato = document.getElementById('alert-contato')

export default class Contato {
    constructor(formClass) {
        this.form = document.querySelector(formClass);
        this.alertCreated = false;
    }

    init() {
        this.events();
    }

    events() {
        if(!this.form) return;
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.validate(e);
        });
    }

    validate(e) {
        const el = e.target;
        const nomeInput = el.querySelector('input[name="nome"]');
        const emailInput = el.querySelector('input[name="email"]');
        const telefoneInput = el.querySelector('input[name="telefone"]');
        let error = false;

        if(!nomeInput){
            this.criarAlert('Nome e obrigatorio');
            error = true;
        }
        if(!validator.isEmail(emailInput.value)) {
            this.criarAlert('Email invalido');
            error = true;
        }

        if(!emailInput || !telefoneInput){
            this.criarAlert('Precisa de pelomenos um contato');
            error = true;
        }

        if (!error && this.alertCreated){
            this.removeAlert();
        }

        if(!error) el.submit();

    }

    criarAlert(e) {
        if(this.alertCreated) return;

        // criando as div
        const divColMy = document.createElement('div');
        const divAlert = document.createElement('div');

        // adicionando classes
        alertContato.classList.add('row');
        divColMy.classList.add('col', 'my-3');
        divAlert.classList.add('alert', 'alert-danger');

        // criando a heranca
        alertContato.appendChild(divColMy);
        divColMy.appendChild(divAlert);

        // messagem de alerta
        divAlert.innerHTML = e;

        this.alertCreated = true;
    }

    removeAlert() {
        alertContato.innerHTML = '';
        this.alertCreated = false;
    }
}