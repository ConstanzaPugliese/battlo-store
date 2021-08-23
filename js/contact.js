/////Entidad
class Contact {
    constructor (name, email, mobile, message) {
        this.name = name;
        this.email = email;
        this.mobile = mobile;
        this.message = message;
    }
}
//variables
//Funciones
function print(e) {
    e.preventDefault()
    let contacts = new Contact($(`#nameContact`).val(), $(`#emailContact`).val(), $(`#mobileContact`).val(), $(`#messageContact`).val());
    sessionStorage.setItem(`contacts`, JSON.stringify(contacts));
    let answer = $(`#answer`).textContent
    answer = `En las próximas horas nos vamos a estar comunicando con vos :)`;
    $(`#answer`).append(answer);
}
//Eventos
$(`#sendContact`).click(print)