import validator from "validator";

let alertLogin = document.getElementById('alert-login')

export default class Login {
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
        const emailInput = el.querySelector('input[name="email"]');
        const passwordInput = el.querySelector('input[name="password"]');
        let error = false;

        if(!validator.isEmail(emailInput.value)) {
            this.criarAlert('Email invalido');
            error = true;
        }

        if(passwordInput.value.length < 3 || passwordInput.value.length > 50) {
            this.criarAlert('Senha invalida');
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
        alertLogin.classList.add('row');
        divColMy.classList.add('col', 'my-3');
        divAlert.classList.add('alert', 'alert-danger');

        // criando a heranca
        alertLogin.appendChild(divColMy);
        divColMy.appendChild(divAlert);

        // messagem de alerta
        divAlert.innerHTML = e;

        this.alertCreated = true;
    }

    removeAlert() {
        alertLogin.innerHTML = '';
        this.alertCreated = false;
    }
}