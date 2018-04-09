var modal = document.getElementById('filter-background');
var btn = document.getElementById("sub");

btn.onclick = function() {
    modal.style.display = "block";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}