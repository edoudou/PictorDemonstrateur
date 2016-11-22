var isPlayed;
var player = new Array();
var showing;
var audios;

$(document).ready(function(){
	isPlayed = false;
	player.push(document.getElementById('player0'));
	player.push(document.getElementById('player1'));
	player.push(document.getElementById('player2'));

	audios = document.getElementsByClassName('audio-player');

	player[0].style.display = 'block';
	player[0].volume = 0;
	for (var i = 1; i < player.length; i++){
		if(document.getElementById("preview-checkbox").checked == false)player[i].style.display = 'none';
		player[i].class = "col-lg-3";
		player[i].volume = 0;
	}
	showing = 0;

	audios[0].volume = 1;
	for (var i = 1; i < audios.length; i++){
		
		audios[i].volume = 0;
	}

	$("#Controls").css('position','absolute');
	$("#Controls").css('top',($(mainPlayer).offset().top + $(player[showing]).height() - $("#Controls").height()) +'px');

	$("#volume0").css('-webkit-appearance','slider-vertical');
	$("#volume0").css('width','20px');
	$("#volume0").css('height',$(player[showing]).height()/3 + "px");
	$("#volume0").css('margin-top',2 * $(player[showing]).height()/3 + "px");
	$("#volume1").css('-webkit-appearance','slider-vertical');
	$("#volume1").css('width','20px');
	$("#volume1").css('height',$(player[showing]).height()/3 + "px");
	$("#volume1").css('margin-top',2 * $(player[showing]).height()/3 + "px");
});

function play_pause(){
	if(isPlayed){
		player[0].pause();
		player[1].pause(); 
		player[2].pause();
		for (var i = 0; i < audios.length; i++) {
			audios[i].pause();
		}
		isPlayed = false;
	}
	else {
		player[0].play();
		player[1].play();
		player[2].play();
		for (var i = 0; i < audios.length; i++) {
			audios[i].play();
		}
		isPlayed = true;
	}
}

function next(){
	for (var i = 0; i < player.length; i++) {
		player[i].className = "col-lg-3";
		if(document.getElementById("preview-checkbox").checked == false)player[i].style.display = 'none';
	}

	showing = (showing + 1) % player.length;


	player[showing].className = "col-lg-12";
	player[showing].style.display = 'block';

	$("#players").html('');

	$("#players").append('<div id="mainPlayer">');
	$("#players").append(player[showing]);
	$("#players").append('</div>');

	for (var i = 0; i < player.length; i++)
		if(i !=showing)$("#players").append(player[i]);

	if(isPlayed){
		player[0].play();
		player[1].play();
		player[2].play();
	}
}

function previous(){
	for (var i = 0; i < player.length; i++) {
		player[i].className = "col-lg-3";
		if(document.getElementById("preview-checkbox").checked == false)player[i].style.display = 'none';
	}

	showing = (showing - 1) % player.length;
	if(showing < 0) showing += player.length;

	player[showing].className = "col-lg-12";
	player[showing].style.display = 'block';

	$("#players").html('');

	$("#players").append('<div id="mainPlayer">');
	$("#players").append(player[showing]);
	$("#players").append('</div>');

	for (var i = 0; i < player.length; i++)
		if(i !=showing)$("#players").append(player[i]);

	if(isPlayed){
		player[0].play();
		player[1].play();
		player[2].play();
	}
}

function setView(index){
	for (var i = 0; i < player.length; i++) {
		player[i].className = "col-lg-3";
		if(document.getElementById("preview-checkbox").checked == false)player[i].style.display = 'none';
	}

	showing = index;

	player[showing].className = "col-lg-12";
	player[showing].style.display = 'block';

	$("#players").html('');

	$("#players").append('<div id="mainPlayer">');
	$("#players").append(player[showing]);
	$("#players").append('</div>');

	for (var i = 0; i < player.length; i++)
		if(i !=showing)$("#players").append(player[i]);

	if(isPlayed){
		player[0].play();
		player[1].play();
		player[2].play();
	}
}

function togglePreview(){
	console.log(document.getElementById("preview-checkbox").checked);
	if(document.getElementById("preview-checkbox").checked)
	{
		for (var i = 0; i < player.length; i++) {
			player[i].style.display = 'block';
		}
	}

	else
	{
		for (var i = 0; i < player.length; i++) {
			player[i].style.display = 'none';
		}

		player[showing].style.display = 'block';

	}
}

function updateAudio(){
	console.log($("#volume0").val());
	$(audios[0]).prop('volume',$("#volume0").val());
	$(audios[1]).prop('volume',$("#volume1").val());
}