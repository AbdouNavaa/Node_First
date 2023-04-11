function deleteEvent() {
    let btn = document.getElementById('deleteBtn')
    let id = btn.getAttribute('data-id')
    if (confirm("Êtes-vous sûr de vouloir supprimer cet event?")) {
        axios.delete('/events/delete/'+ id)
            .then((res) => {
                console.log(res.data)
                alert('event was deleted')
                window.location.href = '/events'
            })
            .catch((err) => {
                console.log(err);
            })
    }
}
function deletematiere() {
    let btn = document.getElementById('deleteMatiere')
    let id = btn.getAttribute('data-matiere')
    if (confirm("Êtes-vous sûr de vouloir supprimer cette Matiere?")) {
        axios.delete('/matieres/delete/'+ id)
            .then((res) => {
                console.log(res.data)
                alert('matier was deleted')
                window.location.href = '/matieres'
            })
            .catch((err) => {
                console.log(err);
            })
    }
}
function deleteprof() {
    let btn = document.getElementById('deleteProf')
    let id = btn.getAttribute('data-prof')

    if (confirm("Êtes-vous sûr de vouloir supprimer ce professeur?")) {
        axios.delete('/profs/delete/'+ id)
            .then((res) => {
                console.log(res.data)
                alert('Prof was deleted')
                window.location.href = '/profs'
            })
            .catch((err) => {
                console.log(err);
            })
    }
}


//upload avatar
function readUrl(input) {
    if (input.files && input.files[0] ) {
        var reader = new FileReader()

        reader.onload = function (e) {
            let image = document.getElementById("imagePlaceholder")
            image.style.display = "block"
            image.src = e.target.result
        }

        reader.readAsDataURL(input.files[0])
    }
}