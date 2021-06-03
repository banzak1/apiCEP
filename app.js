var submitButton = document.querySelector('#app form button')
var zipCodeField = document.querySelector('#app form input')
var content = document.querySelector('#app main')

submitButton.addEventListener('click', run)

function run(event) {
    event.preventDefault()

    var zipCode = zipCodeField.value

    zipCode = zipCode.replace(' ', '')
    zipCode = zipCode.replace('.', '')
    zipCode = zipCode.trim()

    axios
    .get('https://viacep.com.br/ws/' + zipCode + '/json/')
    .then(function (response) {
        if(response.data.erro) {
            throw new Error('CEP Inválido')
        }

        content.innerHTML = ''
        
        if(response.data.logradouro != '' && response.data.bairro != ''){
            createLine(response.data.logradouro + ', ' + response.data.bairro)        
        }

        createLine(response.data.localidade + ', ' + response.data.uf)
        console.log(response.data.logradouro)
        
    })
    .catch(function (error) {
        content.innerHTML = ''
        createLine('Ops, algo deu errado!')
    })
}

function createLine(text) {
    var line = document.createElement('p')
    var text = document.createTextNode(text)

    line.appendChild(text)
    content.appendChild(line)
}