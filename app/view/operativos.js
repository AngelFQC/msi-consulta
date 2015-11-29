define([
	'jquery',
	'underscore',
	'backbone',
	'view/operativo'
], function ($, _, Backbone, OperativosVista) {
	var OperativosVista = Backbone.View.extend({
		el: '#operativos-lista',
		render: function () {
			this.collection.each(function (operativo, indice) {
				var operativoVista = new OperativosVista({
					model: operativo
				});

				this.el.appendChild(
					operativoVista.render().el
				);
			}, this);

			return this;
		}
	});
});