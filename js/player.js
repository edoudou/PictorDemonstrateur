var isPlayed;
var players;
var showing;
var audios;

$(document).ready(function(){
    
	isPlayed = false;
    
    //Définition des ressources audios et vidéos
    players = $('.player');	
	audios = $('.audio');
    
    //Initialisation de l'agencement des players et du volume des flux audios
	players.eq(0).css('display','block;');
	players.eq(0).get(0).volume = 0;
	for (var i = 1; i < players.length; i++){
		if(!$("#preview-checkbox").is(':checked'))players.eq(i).css('display','none');
		players.eq(i).addClass("col-lg-3");
		players.eq(i).prop("volume",0);
	}
	showing = 0;

	audios.eq(0).prop("volume",1);
	for (var i = 1; i < audios.length; i++){
		
		audios.eq(i).prop("volume",0);
	}
    
    //Ajustement de la position des boutons
	$("#Controls").css('position','absolute');
	$("#Controls").css('top',($(mainPlayer).offset().top + $(players.eq(showing)).height() - $("#Controls").height()) +'px');
    $("#Controls").css('display','hidden');
    
    //Ajustement de l'affichage des barres de controle des volumes
    $(".volume").css('-webkit-appearance','slider-vertical');
    $(".volume").css('width','20px');
    $(".volume").css('height',$(players.eq(showing)).height()/3 + 'px');
    $(".volume").css('margin-top',2 * $(players.eq(showing)).height()/3 +'px');
    
    //Initialisation de l'event onClick sur les miniatures pour changer le flux en lecture principale
    $(".player").on("click", function(event){
        var id = $(this).attr("id").substr($(this).attr("id").length -1);
        console.log(id);
        setView(id);
        
    });
    
    $(document).keydown(function(event){
        switch(event.which) {
            //SpaceBar
            case 32: play_pause();
            break;
            //Left  
            case 37: change(-1);
            break;

            case 38: // up
            break;
                
            //Right
            case 39: change(1);
            break;

            case 40: // down
            break;

            default: console.log(event.which); // exit this handler for other keys
        }
        //event.preventDefault();
    });
    
    $('#players').hover(function(){
        $('#Controls').show(300);
    },function(){
        if(!$('#Controls').is(':hover')){
            $('#Controls').hide(300);
        }
    });
});

function play_pause(forced){
    
    //Mise en pause des lecteurs
	if(isPlayed&&!forced){
		for (i = 0; i < players.length; i++)players.eq(i).trigger("pause");
		for (var i = 0; i < audios.length; i++)audios.eq(i).trigger("pause");
        
		isPlayed = false;
	}
    //Mise en lecture des lecteurs
	else {
		for (i = 0; i < players.length; i++)players.eq(i).trigger("play");
		for (var i = 0; i < audios.length; i++)audios.eq(i).trigger("play");
		
		isPlayed = true;
	}
}

//Fonction de changement de flux vidéo par bouton < >
function change(next){
	
    //Selection du player suivant à mettre en lecture principale
	showing = (showing + next +players.length) % players.length;
    //Appel de la fonction de changement de flux vidéo
    setView(showing);
}

//Fonction de réagencement des flux vidéos
function setView(index){
    //Réinitialisation des propriété css des lecteurs
	for (var i = 0; i < players.length; i++) {
		players.eq(i).attr("class","player col-lg-3");
		if(!$("#preview-checkbox").is(":checked"))players.eq(i).css('display','none');
	}

	showing = index;
    
    //Mise en place du lecteur principal
	players.eq(showing).attr("class","player col-lg-12");
	players.eq(showing).css("display","block");
	$("#players").html('');

	$("#players").append('<div id="mainPlayer"></div>');
	$("#mainPlayer").append(players.eq(showing));

    //Mise en place des lecteurs miniatures
	for (var i = 0; i < players.length; i++)
		if(i !=showing)$("#players").append(players.eq(i));
    
    //Réinitialisation de l'event onClick sur les miniatures
    $(".player").on("click", function(event){
        var id = $(this).attr("id").substr($(this).attr("id").length -1);
        console.log(id);
        setView(id);
    });

    //Réactivation de la lecture
	if(isPlayed)play_pause(true);
}

//Fonction de toggle des miniatures
function togglePreview(){
    
    //Si la checkbox est coché, affichage des miniatures
	if($("#preview-checkbox").is(":checked"))for (var i = 0; i < players.length; i++)players.eq(i).css('display','block');
    //Sinon, dissimulation par css
	else for (var i = 0; i < players.length; i++)players.eq(i).css('display','none');
		
    players.eq(showing).show();	
}

//Fonction d'ajustage du volume des flux audio
function updateAudio(){
    
	$(audios.eq(0).get(0)).prop('volume',$("#volume0").val());
	$(audios.eq(1).get(0)).prop('volume',$("#volume1").val());
}