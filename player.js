var isPlayed;
var players;
var showing;
var audios;

$(document).ready(function(){
	isPlayed = false;
    
    players = $('.player');	
	audios = $('.audio');

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

	$("#Controls").css('position','absolute');
	$("#Controls").css('top',($(mainPlayer).offset().top + $(players.eq(showing)).height() - $("#Controls").height()) +'px');
    
    $(".volume").css('-webkit-appearance','slider-vertical');
    $(".volume").css('width','20px');
    $(".volume").css('height',$(players.eq(showing)).height()/3 + 'px');
    $(".volume").css('margin-top',2 * $(players.eq(showing)).height()/3 +'px');
    
    
    $(".player").on("click", function(event){
        var id = $(this).attr("id").substr($(this).attr("id").length -1);
        setView(id);
        
    });
});

function play_pause(){
	if(isPlayed){
		for (i = 0; i < players.length; i++)players.eq(i).trigger("pause");
		for (var i = 0; i < audios.length; i++)audios.eq(i).trigger("pause");
        
		isPlayed = false;
	}
	else {
		for (i = 0; i < players.length; i++)players.eq(i).trigger("play");
		for (var i = 0; i < audios.length; i++)audios.eq(i).trigger("play");
		
		isPlayed = true;
	}
}

function change(next){
	for (var i = 0; i < players.length; i++) {
		players.eq(i).addClass("col-lg-3");
		if(!$("#preview-checkbox").is(":checked"))players.eq(i).css('display','none');
	}

	showing = (showing + next) % players.length;


	players.eq(showing).addClass('col-lg-12');
	players.eq(showing).css('display','block');

	$("#players").html('');

	$("#players").append('<div id="mainPlayer">');
	$("#players").append(players.eq(showing));
	$("#players").append('</div>');

	for (var i = 0; i < players.length; i++)
		if(i !=showing)$("#players").append(players.eq(i));

	play_pause();
}

function setView(index){
	for (var i = 0; i < players.length; i++) {
		players.eq(i).addClass("col-lg-3");
		if(!$("#preview-checkbox").is(":checked"))players.eq(i).css('display','none');
	}

	showing = index;

	players.eq(showing).addClass("col-lg-12");
	players.eq(showing).css("display:block");

	$("#players").html('');

	$("#players").append('<div id="mainPlayer">');
	$("#players").append(players.eq(showing));
	$("#players").append('</div>');

	for (var i = 0; i < players.length; i++)
		if(i !=showing)$("#players").append(players.eq(i));

	play_pause();
}

function togglePreview(){
	console.log($("#preview-checkbox").is(":checked"));
	if($("#preview-checkbox").is(":checked"))
	{
		for (var i = 0; i < players.length; i++) {
			players.eq(i).css('display','block');
		}
	}
	else
	{
		for (var i = 0; i < players.length; i++) {
			players.eq(i).css('display','none');
		}

		players.eq(showing).css('display','block');

	}
}

function updateAudio(){
	console.log($("#volume0").val());
	$(audios.eq(0).get(0)).prop('volume',$("#volume0").val());
	$(audios.eq(1).get(0)).prop('volume',$("#volume1").val());
}