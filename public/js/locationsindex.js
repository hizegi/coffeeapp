$(function (){

	$.ajax({
		type: 'get',
		url: 'https://api.yelp.com/v2/search/?term=donuts&location=10010&sort=1&limit=10&category_filter=donuts',
		success: function(data){
			console.log('success', data)
		}
	}
	




})