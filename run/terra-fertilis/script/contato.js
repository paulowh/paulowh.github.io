const meuFormulario = document.getElementById('meuFormulario')

meuFormulario.addEventListener('submit', function (event) {
    event.preventDefault();

    var nome = document.getElementById('nome').value;
    console.log(nome);

    var email = document.getElementById('email').value;
    var assunto = document.getElementById('assunto').value;
    var mensagem = document.getElementById('mensagem').value;


    var nomeCodificado = encodeURIComponent(nome);
    var emailCodificado = encodeURIComponent(email);
    var assuntoCodificado = encodeURIComponent(assunto);
    var mensagemCodificado = encodeURIComponent(mensagem);


    // Redireciona para a próxima página com os parâmetros na URL
    window.location.href = 'envio.html' +
        '?nome=' + nomeCodificado +
        '&email=' + emailCodificado +
        '&assunto=' + assuntoCodificado +
        '&mensagem=' + mensagemCodificado;
});