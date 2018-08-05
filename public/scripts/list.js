function setCharVal(xLine, before, after){
  var xAxis = xLine;
  var dataBefore = before;
  var dataAfter = after;
  //Fill X xAxis

  Highcharts.theme = {
    colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572',
             '#FF9655', '#FFF263', '#6AF9C4'],
    chart: {
        backgroundColor: '#ced3db',
    },
    title: {
        style: {
            color: '#000',
            font: 'bold 16px "Trebuchet MS", Verdana, sans-serif'
        }
    },
    subtitle: {
        style: {
            color: '#666666',
            font: 'bold 12px "Trebuchet MS", Verdana, sans-serif'
        }
    },

    legend: {
        itemStyle: {
            font: '9pt Trebuchet MS, Verdana, sans-serif',
            color: 'black'
        },
        itemHoverStyle:{
            color: 'gray'
        }
    }
};

Highcharts.setOptions(Highcharts.theme);

  Highcharts.chart('container', {
      chart: {
          type: 'line'
      },
      title: {
          text: 'Felicidad del niño antes y después de jugar con el dispositivo'
      },
      xAxis: {
          categories: xAxis
      },
      yAxis: {
          title: {
              text: 'Animo'
          }
      },
      plotOptions: {
          line: {
              dataLabels: {
                  enabled: true
              },
              enableMouseTracking: false
          }
      },
      series: [{
          name: 'Antes de jugar',
          data: dataBefore
      }, {
          name: 'Despues de jugar',
          data: dataAfter
      }]
  });
}

function setCharVal2(x,y){
  Highcharts.setOptions(Highcharts.theme);
  Highcharts.chart('playtime', {
      chart: {
          type: 'column'
      },
      title: {
          text: 'Tiempo de juego por actividad realizada por el niño'
      },
      xAxis: {
          categories: x
      },
      yAxis: {
          title: {
              text: 'Tiempo(h)'
          }
      },
      plotOptions: {
          line: {
              dataLabels: {
                  enabled: true
              },
              enableMouseTracking: false
          }
      },
      series: [{
          name: 'Tiempo de juego',
          data: y
      }]
  });
}
