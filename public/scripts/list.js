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

function setCharVal2(x,y){
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
