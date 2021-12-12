import logo from './static/logo.png';
import './App.css';

import { Button, Card } from 'antd';
import 'antd/dist/antd.css';

import ExcelReader from './ExcelReader';
// import {html2canvas, jsPDF} from 'app/ext';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';

function printDocument() {
  const input = document.getElementById('nomogramma');
  htmlToImage.toPng(input, { cacheBust: true, })
    .then((dataUrl) => {
      var img = new Image();
      img.src = dataUrl;
      // const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        // orientation: "landscape",
        format: [1000, 1000]
      });
      pdf.addImage(img, 'PNG', 0, 0);
      // pdf.output('dataurlnewwindow');
      pdf.save("download.pdf");
    })
  ;
}

function App() {
  var mock1 = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
  var mock2 = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
  var indexs = ["0", "1", "3", "4"];


  var kilometers = ["234", "123", "234", "348", "234", "123", "234", "123", "234", "123", "234", "388", "234", "123", "234", "123"];
  var icons = [["0", "1"], ["1"], ["3", ], [], ["4", "1"], [], ["0"], [], ["3"], [], ["4", "1"], ["1"], [], [], [], []];
  var traffic_lights = [{"name": "H1", "value": "234+600"}, {"name": "H", "value": "123+756"}]


  var final_table = [];

  var preprocess_traffic_lights = [];
  for (var i = 0; i < traffic_lights.length; i++) {
    var light = traffic_lights[i];

    var name = light["name"];
    var km = light["value"].split("+")[0];
    var picket = light["value"].split("+")[1][0];
    var meters = light["value"].split("+")[1].slice(1, 3);
    
    preprocess_traffic_lights.push({
      "name": name,
      "km": km,
      "picket": picket,
      "meters": meters
    });
  }

  for (var i = 0; i < kilometers.length; i++) {
    var kilometer_number = kilometers[i];
    
    var item = {
      "km": kilometer_number
    }

    var light = "";
    for (var j = 0; j < preprocess_traffic_lights.length; j++) {
      var curr_light = preprocess_traffic_lights[j];
      if (curr_light["km"] === kilometer_number) {
        light = curr_light;
      }
    }
    item["traffic_light"] = light;
    final_table.push(item);
  }
  console.log(final_table);

  // createTable(numbers);

  function createTable(tableNumbers) {
      var table = document.createElement('table');
      var tableBody = document.createElement('tbody');

      var row = document.createElement('tr');
      mock1.forEach(function(cellData) {
          var cell_special = document.createElement('th');
          var cell = document.createElement('span');

          cell.appendChild(document.createTextNode(cellData));
          cell_special.appendChild(cell);
          row.appendChild(cell_special);
      });
      tableBody.appendChild(row);

      var row = document.createElement('tr');
      final_table.forEach(function(cellData) {
          var cell_special = document.createElement('th');
          var cell = document.createElement('span');

          if (cellData["traffic_light"] === "") {
            cell.appendChild(document.createTextNode(cellData["traffic_light"]));
          } else {
            cell.appendChild(document.createTextNode(cellData["traffic_light"]["picket"] + "+" + cellData["traffic_light"]["meters"]));
          }
          
          cell_special.appendChild(cell);
          row.appendChild(cell_special);
      });
      tableBody.appendChild(row);

      var row = document.createElement('tr');
      final_table.forEach(function(cellData) {
          var cell_special = document.createElement('th');
          var cell = document.createElement('span');

          cell.appendChild(document.createTextNode(cellData["km"]));
          cell_special.appendChild(cell);
          row.appendChild(cell_special);
      });
      tableBody.appendChild(row);

      var row = document.createElement('tr');
      icons.forEach(function(iconsList) {
          var cell = document.createElement('td');
          // var cell = document.createElement('span');

          iconsList.forEach(function(icon) {
              var img = document.createElement('img');
              img.src = require(`./static/${icon}.png`).default;
              // img.src = `./static/${icon}.png`;
              cell.appendChild(img);
              cell.appendChild(document.createElement('br'));
          });
          row.appendChild(cell);
      });
      tableBody.appendChild(row);

      table.appendChild(tableBody);

      document.getElementById('nomogramma').appendChild(table);  
      // document.body.appendChild(table);   
  }

  
  return (
    <div className="App">
      <div class="logo-menu_wrap">
        <div class="logo">
          <img src={logo} style={{width: "100px"}}/>
        </div>
        <div class="menu-search">
        </div>
      </div>
      <Card id="container">
        <ExcelReader/>
      </Card>
      <Card id="nomogramma">
      </Card>
      <Button onClick={createTable}> Draw </Button>

      <Button onClick={printDocument}> Save </Button>
    </div>
  );
}

export default App;
