const container = document.getElementById('container');

function getHelloWorld() {
    var req = new XMLHttpRequest();
    req.onreadystatechange = () => {
        if(req.readyState === 4) {
                req.status === 200 ?
                    container.innerHTML += req.responseText : container.innerHTML += 'ERROR';
        }
    }
    req.open("GET", "./backend.php", true);
    req.send();

}

getHelloWorld();