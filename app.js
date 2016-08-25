var topics = ['Peach', 'Pikachu', 'Samus', 'Mario', 'Luigi'];

function displayGifInfo(){

	var gif = $(this).attr('data-name');
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=dc6zaTOxFJmzC&limit=10";

	$.ajax({url: queryURL, method: 'GET'}).done(function(response){

		console.log(queryURL);
		console.log(response);

		var results = response.data;

		for(var i = 0; i < results.length; i++){
			var gifDiv = $('<div class="item">')
			var rating = results[i].rating;
			var p = $('<p>').text("Rating: " + rating);
			var topicsImage = $('<img>');
			topicsImage.attr('src', results[i].images.fixed_height.url);
			gifDiv.append(p);
			gifDiv.append(topicsImage);
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

$(document).on('click', '.gif', displayGifInfo);

renderButtons();