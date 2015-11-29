define([
	'jquery',
	'underscore',
	'backbone',
	'text!template/operativo.html'
], function ($, _, Backbone, plantilla) {
	var OperativoVista = Backbone.View.extend({
		tagName: 'tr',
		template: _.template(plantilla),
		render: function () {
			var plantillaHTML = this.template(
				this.model.toJSON()
			);

			this.el.innerHTML = plantillaHTML;

			return this;
		}
	});

	return OperativoVista;
});
