var app = app||{};
$(function(){
	var books=[
		{title:'JavaScript',author:'ikeda masaki',releaseDate:'2014/01/01', keywords:'are' }
	];
	new app.LibraryView(books);
});
