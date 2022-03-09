//déclaration
const regex_connexion = /[<>]/gi;
var input_identifiant = document.getElementById('bouton_connexion');
var input_password = document.getElementById('password');

input_identifiant.addEventListener('click', verif_nom);
//pour pouvoir valider avec la touche entrée du clavier
input_password.addEventListener('keyup', function(event){
    if(event.key == "Enter"){
        verif_nom();
    }
});

/**
 * vérifie la correspondance entre les input du formulaire de connexion et les éléments de référence
 */
function verif_nom(){
    var input_value = document.getElementById('identifiant').value;
    var password_value = document.getElementById('password').value;

    var input_check = input_value;
    var password_check = password_value;
    input_check = input_value.replace(regex_connexion, "");
    password_check = password_value.replace(regex_connexion, "");

    if(input_check == "" || password_check == ""){
        alert("entrez un identifiant et un mot de passe");
    } else if (input_check == utilisateurs.get("1").nom && password_check == utilisateurs.get("1").mdp){
        alert('vous êtes gestionnaire');
    } else if (input_check == utilisateurs.get("2").nom && password_check == utilisateurs.get("2").mdp){
        alert('Bonjour cher client, bienvenue sur votre site préféré');
    } else {
        alert("l'identifiant ou le mot de passe sont incorrects");
    }
}