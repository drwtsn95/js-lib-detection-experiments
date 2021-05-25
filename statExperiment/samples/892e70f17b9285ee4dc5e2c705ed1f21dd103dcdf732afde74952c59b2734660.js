document.addEventListener("DOMContentLoaded", function(event) {
    let formGuard, button;
    getElements();
    guardDisplayNon();

    document.body.addEventListener('click', function (e) {
        if(e.target === button) {
            setTimeout(() => {
                getElements()
                guardDisplayNon()
            }, 1000);
        }
    })

    function getElements() {
        formGuard = document.getElementById('custom-form-guard-template10');
        button = document.querySelector('table.form-table input[type=submit]');
    }

    function guardDisplayNon() {
        formGuard.style.display = 'none';
    }
})