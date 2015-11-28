requirejs.config({
	baseUrl: 'app',
	paths: {
		jquery: '../libs/jquery/jquery-min',
		underscore: '../libs/underscore/underscore-min',
		backbone: '../libs/backbone/backbone-min'
		text: '../libs/require/text'
	}
});

requirejs(['app'], function (App) {

});
