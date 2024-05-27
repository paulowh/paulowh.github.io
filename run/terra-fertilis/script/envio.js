
function obterParametro(nomePesquisa) {
    var parametros = new URLSearchParams(window.location.search);
    return parametros.get(nomePesquisa);
}

// Recupera os valores da query string e exibe na página

var nome = obterParametro('nome');

var email = obterParametro('email');
var assunto = obterParametro('assunto');
var mensagem = obterParametro('mensagem');

elementNome = document.createElement('h1')
elementNome.textContent = nome

elementNome.style = 'background-color: tomato'

elementEmail = document.createElement('p')
elementEmail.textContent = email


elementAssunto = document.createElement('p')
elementAssunto.textContent = assunto

elementMensagem = document.createElement('p')
elementMensagem.textContent = mensagem



document.getElementById('spanNome').append(nome ? elementNome : 'Não informado');


document.getElementById('spanEmail').append(email ? elementEmail : 'Não informado');
document.getElementById('spanAssunto').append(assunto ? elementAssunto : 'Não informado');
document.getElementById('spanMensagem').append(mensagem ? elementMensagem : 'Não informado');

// setTimeout(window.location.href = 'https://www.google.com', 10000)