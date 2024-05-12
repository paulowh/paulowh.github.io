<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="utf-8">
    <meta content="width=device-width, initial-scale=1.0" name="viewport">

    <title>Paulo "Who" Santos</title>
    <meta content="" name="description">
    <meta content="" name="keywords">

    <link href="assets/img/favicon.webp" rel="icon">
    <link href="assets/img/favicon.webp" rel="apple-touch-icon">
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Raleway:300,300i,400,400i,500,500i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i"
          rel="stylesheet">
    <link href="assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link href="assets/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet">
    <link href="assets/vendor/fontawesome/css/all.min.css" rel="stylesheet">

    <link href="assets/css/style.css" rel="stylesheet">
</head>

<body>

<header id="header">
    <main class="container">

        <h1><a href="index.php">Paulo H. Santos</a></h1>
        <h2>Sou um <span>Desenvolvedor</span> apaixonado por transformar ideias em realidade digital.</h2>

        <nav id="navbar" class="navbar">
            <!--desativado temporariamente-->
            <ul>
                <li><a class="nav-link active" href="#header">Início</a></li>
                <li><a class="nav-link" href="#about">Sobre</a></li>
                <li><a class="nav-link" href="#resume">Resumo</a></li>
                <li><a class="nav-link" href="#services">Serviços</a></li>
                <li><a class="nav-link" href="#portfolio">Portfolio</a></li>
                <li><a class="nav-link" href="#contact">Contato</a></li>
            </ul>
            <i class="bi bi-list mobile-nav-toggle"></i>
        </nav>

        <div class="social-links">
            <a href="https://wa.me/5519992632392" class="whatsapp" target="_blank"><i class="bi bi-whatsapp"></i></a>
            <a href="https://instagram.com/paulowh" class="instagram" target="_blank"><i
                    class="bi bi-instagram"></i></a>
            <a href="https://linkedin.com/in/paulowh" class="linkedin" target="_blank"><i
                    class="bi bi-linkedin"></i></a>
            <a href="mailto:paulo.whsantos@hotmail.com?subject=Contato Web Site" class="linkedin" target="_blank"><i
                    class="bi bi-envelope-fill"></i></a>
        </div>

    </main>
</header>

<?php
    include 'pages/sobre.html';
    include 'pages/experiencia.html';
    include 'pages/servicos.html';
    include 'pages/portfolio.html';
    include 'pages/contato.html';
?>

<script src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
<script src="assets/js/main.js"></script>

</body>

</html>