function removeBoringStuff(){
    document.querySelectorAll("#app .boring").forEach((e) => e.remove());
}
function readValues(){
    if (document.getElementById("myCheckbox").checked){
        alert(document.getElementById("myTextField").value);
    }
}