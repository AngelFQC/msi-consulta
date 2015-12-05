requirejs.config({
	baseUrl: 'app',
	paths: {
		jquery: '../libs/jquery/jquery-min',
		underscore: '../libs/underscore/underscore-min',
		backbone: '../libs/backbone/backbone-min',
		text: '../libs/require/text',
		chart: '../libs/chart/Chart'
	}
});

requirejs(['app'], function (App) {
	App.iniciarApp();
});
