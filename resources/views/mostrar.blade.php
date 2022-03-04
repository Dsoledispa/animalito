<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" id="token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="../public/css/style.css">
    <script src="js/ajax.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <title>Animales</title>
</head>
<body class="m-5">
    <form method="POST" onsubmit="createJS(); return false;">
        <div class="form-group">
        <label class="col-sm-2 col-form-label">Nombre:</label>
        <input type="text" class="form-control" id="nombre" name="nombre" placeholder="Introduce un nombre" value="{{old('nombre')}} " required>
        </div>
        <div class="form-group">
        <label class="col-sm-2 col-form-label">Peso:</label>
        <input type="text" class="form-control" id="peso" name="peso" placeholder="Introduce un peso" value="{{old('peso')}}" required>
        </div>
        <div class="form-group">
        <label class="col-sm-2 col-form-label">Numero Serie:</label>
        <input type="text" class="form-control" id="num_serie" name="num_serie" placeholder="Introduce un numero de serie" value="{{old('num_serie')}}" required><br>
        </div>
        <button type="submit" class="btn btn-primary">Enviar</button>
    </form>
    <div id="message"></div>
    <label>Nombre:</label>
    <input type="text" onkeyup="leerJS()" id="filtro"><br><br>
    <table class="table" id="tabla">
        {{-- contenido ajax --}}
    </table>
    <div id="myModal" class="modal">
        <div>
            <span class="close">&times;</span>
        </div>
        <div id="contentm" class="modal-content">
        </div>
    </div>
</body>
</html>