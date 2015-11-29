define([
	'underscore', 'backbone'
], function (_, Backbone) {
	var Operativo = Backbone.Model.extend({
		defaults: {
			tipo: '',
			categoria: '',
			numero: '',
			caso: '',
			dia: '',
			fecha: '',
			hora: '',
			modalidad: '',
			medio: '',
			sector: ''
		}
	});

	return Operativo;
});