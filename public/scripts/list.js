function setCharVal(xLine, before, after){
  var xAxis = xLine;
  var dataBefore = before;
  var dataAfter = after;
  //Fill X xAxis

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
