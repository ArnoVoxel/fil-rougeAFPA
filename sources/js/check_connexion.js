//déclaration
var input_identifiant = document.getElementById('bouton_connexion');

input_identifiant.addEventListener('click', verif_nom);

function verif_nom(){
    var input_value = document.getElementById('identifiant').value;
    console.log(input_value);
    console.log(utilisateurs.get("1"));
    console.log(utilisateurs.get("2"));
    if (input_value == utilisateurs.get("1").nom){
        console.log('vous êtes gestionnaire');
    } else {
        console.log('entrez un autre identifiant');
    }
}