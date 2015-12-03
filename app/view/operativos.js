define([
	'jquery',
	'underscore',
	'backbone',
	'view/operativo'
], function ($, _, Backbone, OperativoVista) {
	var OperativosVista = Backbone.View.extend({
		el: '#operativos-lista',
		render: function () {
			this.collection.each(function (operativo, indice) {
				var operativoVista = new OperativoVista({
					model: operativo
				});

				this.el.appendChild(
					operativoVista.render().el
				);
			}, this);

			return this;
		}
	});

    return OperativosVista;
});
