//déclaration
var input_identifiant = document.getElementById('bouton_connexion');

input_identifiant.addEventListener('click', verif_nom);

function verif_nom(){
    var input_value = document.getElementById('identifiant').value;
    var password_value = document.getElementById('password').value;

    if(input_value == "" || password_value == ""){
        alert("entrez un identifiant et un mot de passe");
    } else if (input_value == utilisateurs.get("1").nom && password_value == utilisateurs.get("1").mdp){
        alert('vous êtes gestionnaire');
    } else if (input_value == utilisateurs.get("2").nom && password_value == utilisateurs.get("2").mdp){
        alert('Bonjour cher client, bienvenue sur votre site préféré');
    } else {
        alert("l'identifiant ou le mot de passe sont incorrects");
    }
}