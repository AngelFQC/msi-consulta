define([
	'jquery',
	'collection/operativos',
	'view/operativos'
], function ($, OperativosColeccion, OperativosVista) {
	$.getScript('libs/highcharts/highcharts.js');
	$.getScript('libs/highcharts/modules/exporting.js');

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

				$('#operativos-grafico').highcharts({
			        title: {
			            text: 'Apoyo a operativos PNP',
			        },
			        subtitle: {
			            text: 'Ejemplo gráfico con API ',
			        },
			        xAxis: {
			            categories: categorias
			        },
			        yAxis: {
			            title: {
			                text: 'Cantidad de operativos'
			            },
			            plotLines: [{
			                value: 0,
			                width: 1,
			                color: '#808080'
			            }]
			        },
			        legend: {
			            layout: 'vertical',
			            align: 'center',
			            verticalAlign: 'bottom',
			            borderWidth: 0
			        },
			        series: [
			        	{
			            	name: 'Operativos',
			            	data: cantidades
			        	}
			        ]
			    });
			});
		}
	};

	return App;
});
