window.onload = function() {
    leerJS();

    document.getElementById("nombre").focus();
    //logica de modal

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];


    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        var modal = document.getElementById("myModal");
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        var modal = document.getElementById("myModal");
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

function objetoAjax() {
    var xmlhttp = false;
    try {
        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
        try {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (E) {
            xmlhttp = false;
        }
    }
    if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
        xmlhttp = new XMLHttpRequest();
    }
    return xmlhttp;
}

function leerJS() {
    var tabla = document.getElementById("tabla");
    var formData = new FormData();
    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('filtro', document.getElementById('filtro').value);

    var ajax = objetoAjax();
    ajax.open("POST", "leer", true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(this.responseText);
            // definir las tres consultas sql
            var recarga = '';
            /* Leerá la respuesta que es devuelta por el controlador: */
            recarga += '<div>';
            recarga += '<tr>';
            recarga += '<th scope="col">Nombre</th>';
            recarga += '<th scope="col">Peso</th>';
            recarga += '<th scope="col">Numero Serie</th>';
            recarga += '</tr>';
            for (let i = 0; i < respuesta.length; i++) {
                recarga += '<tr>';
                recarga += '<td>' + respuesta[i].nombre + '</td>';
                recarga += '<td>' + respuesta[i].peso + '</td>';
                recarga += '<td>' + respuesta[i].num_serie + '</td>';
                recarga += '<td><button class="btn btn-secondary" onclick="openmodal(' + respuesta[i].id + ',`' + respuesta[i].num_serie + '`); return false;">Actualizar</button></td>';
                recarga += '<td><button class="btn btn-primary" onclick="deleteJS(' + respuesta[i].id + '); return false;">Eliminar</button></td>';
                recarga += '</tr>';
            }
            recarga += '</div>';
            tabla.innerHTML = recarga;
        }
    }
    ajax.send(formData);
}

function createJS() {
    var message = document.getElementById('message');
    var token = document.getElementById('token').getAttribute("content");
    var nombre = document.getElementById('nombre').value;
    var peso = document.getElementById('peso').value;
    var num_serie = document.getElementById('num_serie').value;
    var formData = new FormData();
    formData.append('_token', token);
    formData.append('_method', 'POST');
    formData.append('nombre', nombre);
    formData.append('peso', peso);
    formData.append('num_serie', num_serie);

    /* Inicializar un objeto AJAX */
    var ajax = objetoAjax();
    ajax.open("POST", "crear", true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(this.responseText);
            if (respuesta.resultado == "OK") {
                message.innerHTML = '<p class="green">Nota creada correctamente</p>';
                document.getElementById('nombre').value = "";
                document.getElementById('peso').value = "";
                document.getElementById('num_serie').value = "";
            } else {
                message.innerHTML = 'Ha habido un error: ' + respuesta.resultado;
            }
            leerJS();
        }
    }
    ajax.send(formData)
}

function openmodal(id, num_serie) {
    var modal = document.getElementById("myModal");
    var contentm = document.getElementById("contentm");
    contentm.innerHTML = "<form method='post' onsubmit='updateJS(" + id + "); return false;'><p>Nota #" + id + "</p><br><p>Num_serie:</p><input type='text' name='num_serie' id='serie' value='" + num_serie + "'><br><button class= 'btn btn-secondary' type='submit' value='Edit'>Editar</button></form>";
    modal.style.display = "block";
}

function updateJS(id) {
    var message = document.getElementById('message');
    var token = document.getElementById('token').getAttribute("content");
    var num_serie = document.getElementById('serie').value;
    var formData = new FormData();
    formData.append('_token', token);
    formData.append('_method', 'PUT');
    formData.append('num_serie', num_serie);

    /* Inicializar un objeto AJAX */
    var ajax = objetoAjax();
    ajax.open("POST", "actualizar/" + id, true);
    ajax.onreadystatechange = function() {
            if (ajax.readyState == 4 && ajax.status == 200) {
                var respuesta = JSON.parse(this.responseText);
                if (respuesta.resultado == "OK") {
                    /* creación de estructura: la estructura que creamos no ha de contener código php ni código blade*/
                    /* utilizamos innerHTML para introduciremos la recarga en el elemento html pertinente */
                    message.innerHTML = '<p class="green">Nota actualizada correctamente</p>';
                } else {
                    /* creación de estructura: la estructura que creamos no ha de contener código php ni código blade*/
                    /* utilizamos innerHTML para introduciremos la recarga en el elemento html pertinente */
                    message.innerHTML = 'Ha habido un error: ' + respuesta.resultado;
                }
                leerJS();
            }
        }
        /*
        send(string)->Sends the request to the server (used for POST)
        */
    ajax.send(formData)
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
}

function deleteJS(id) {
    var token = document.getElementById('token').getAttribute("content");
    var formData = new FormData();
    formData.append('_token', token);
    formData.append('_method', 'delete');

    /* Inicializar un objeto AJAX */
    var ajax = objetoAjax();
    ajax.open("POST", "eliminar/" + id, true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            leerJS();
        }
    }
    ajax.send(formData)
}