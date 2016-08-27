$(document).ready(function(){

var topics = ['Awkward', 'Hungry', 'Tired', 'Sad', 'Bored'];

function displayGifInfo(){

	var gif = $(this).attr('data-name');
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=dc6zaTOxFJmzC&limit=10";

	$.ajax({url: queryURL, method: 'GET'}).done(function(response){

		console.log(queryURL);
		console.log(response);

		var results = response.data;

		console.log(results);

		for(var i = 0; i < results.length; i++){
			var gifDiv = $('<div class="item">')
			var rating = results[i].rating;
			var p = $('<p>').text("Rating: " + rating);
			p.addClass('pRating');

			var stillImg = results[i].images.fixed_height_still.url;
			var animateImg = results[i].images.fixed_height.url;

			var topicsImage = $('<img>');
			topicsImage.addClass('emotionImg');
			topicsImage.attr('src', stillImg);
			topicsImage.attr('data-state', 'still');
			topicsImage.attr('data-still', stillImg);
			topicsImage.attr('data-animate', animateImg);

			gifDiv.append(topicsImage);
			gifDiv.append(p);
			$('#gifsView').prepend(gifDiv);
		}

	});

}

function renderButtons(){

	$('#buttonsView').empty();

	for(i=0; i < topics.length; i++){
		var a = $('<button>')
		a.addClass('gif');
		a.attr('data-name', topics[i]);
		a.text(topics[i]);
		$('#buttonsView').append(a);
	}
}

$('#addGif').on('click', function(){
	var newButton = $('#gif-input').val().trim();
	topics.push(newButton);
	renderButtons();
	return false; 
});

	$(document).on('click', '.emotionImg', function(){
		var src = $(this).attr('src');
		var still = $(this).attr('data-still');
		var active = $(this).attr('data-animate');

		if(src === still){
			$(this).attr('src', active);
		}
		else if(src === active){
			$(this).attr('src', still);
		}
	});

$(document).on('click', '.gif', displayGifInfo);

renderButtons();

}); //document.ready close
