define([
	'jquery',
	'collection/operativos',
	'view/operativos',
	'chart'
], function ($, OperativosColeccion, OperativosVista, Chart) {
	var App = {
		iniciarApp: function () {
			var operativosColeccion = new OperativosColeccion();

			var promesaPeticion = $.ajax(
				{
					url: 'http://api.datosabiertos.msi.gob.pe/datastreams/invoke/APOYO-OPERA-A-PNP',
					jsonp: 'callback',
					dataType: 'jsonp',
					data: {
						auth_key: '21d66613f28deea018bc3d1b0f8fcd7e79c5bded',
						output: 'json_array'
					}
				}
			);

			$.when(promesaPeticion).done(function (datosApi) {
				$.each(datosApi.result, function (index, dato) {
					if (index >= 1) {
						operativosColeccion.add({
							tipo: dato[1],
							categoria: dato[2],
							numero: dato[3],
							caso: dato[4],
							dia: dato[5],
							fecha: dato[6],
							hora: dato[7],
							modalidad: dato[8],
							medio: dato[9],
							sector: dato[10]
						});
					}
				});

				//agrupar por categorías
				var modelosPorCategorias = operativosColeccion.indexBy('categoria');

				var categorias = new Array();
				var cantidades = new Array();

				for (categoria in modelosPorCategorias) {
					//generar etiquetas de la categoría
					categorias.push(categoria);

					//generar datos de la categoría
					var operativosFiltrados = operativosColeccion.where({
						categoria: categoria
					});

					cantidades.push(operativosFiltrados.length);
				}

				console.log(categorias, cantidades);

				var operativosVista = new OperativosVista({
					collection: operativosColeccion
				});
				operativosVista.render();

				//Generar gráfico
				var contexto = document.getElementById('operativos-grafico')
					.getContext('2d');

				var data = {
					labels: categorias,
					datasets: [
						{
							label: "My First dataset",
				            fillColor: "rgba(220,220,220,0.2)",
				            strokeColor: "rgba(220,220,220,1)",
				            pointColor: "rgba(220,220,220,1)",
				            pointStrokeColor: "#fbb",
				            pointHighlightFill: "#fff",
				            pointHighlightStroke: "rgba(220,220,220,1)",
				            data: cantidades
						}
					]
				};

				var grafico = new Chart(contexto).Bar(data, {});
			});
		}
	};

	return App;
});
