define([
	'underscore',
	'backbone',
	'model/operativo'
], function (_, Backbone, Operativo) {
	var Operativos = Backbone.Collection.extend({
		model: Operativo
	});

	return Operativos;
});