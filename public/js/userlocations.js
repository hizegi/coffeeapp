$(function (){


//this checks to see if user submitted an img url. if not, use default

	// $('form').submit(function(){
	//     var input = $('#test').val();
	//     if(input == null){
	//          $('#test').val('http://i127.photobucket.com/albums/p142/cy360/image-missing.jpg');
	//     }    
	// });

	function check() {
    if(document.forms["newreview"]["imgurl"].value == "")
        document.forms["newreview"]["imgurl"].value = "http://i127.photobucket.com/albums/p142/cy360/image-missing.jpg";
}

})