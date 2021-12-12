import logo from './static/logo.png';
import './App.css';

import { Button, Card } from 'antd';
import 'antd/dist/antd.css';

import UploadFiles from './components/UploadFile';
import ExcelReader from './ExcelReader';
// import {html2canvas, jsPDF} from 'app/ext';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import { useState } from 'react';

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
  // Create State
  const [traffic_lights, setTraficLight] = useState([]);
  const [precipitous, setPrecipitous] = useState([]);
  const [ktsm, setKtsm] = useState([]);
  const [lap, setLap] = useState([]);

  var mock1 = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
  var mock2 = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
  var indexs = ["0", "1", "3", "4"];

  const maxKm = 375;

  let arrKilomet = []
  for(let i = maxKm; i > 0; i--) { arrKilomet.push(i.toString()) }
  
  const icons = [];
  for(let i = maxKm; i > 0; i--) { icons.push([]) }

  // var icons = [["0", "1"], ["1"], ["3", ], [], ["4", "1"], [], ["0"], [], ["3"], [], ["4", "1"], ["1"], [], [], [], []];

  const uploadTraficLight = traficLight => setTraficLight(traficLight);
  const uploadPrecipitous = precipitous => setPrecipitous(precipitous);
  const uploadKtsm = ktsm => setKtsm(ktsm);
  const uploadLap = lap => setLap(lap);

  function createTable(tableNumbers) {
    const preprocess_traffic_lights = [];

    traffic_lights.forEach(el => {
      preprocess_traffic_lights.push({
        "name": el.name,
        "km": el.value.split('+')[0],
        "picket": el.value.split('+')[1][0],
        "meters": el.value.split('+')[1].slice(1,3)
      })
    });

    let final_table = [];

    
    if(preprocess_traffic_lights.length > 0) {
      for (var i = 0; i < arrKilomet.length; i++) {
        var kilometer_number = arrKilomet[i];
        var item = {
          "km": kilometer_number
        }
        var light = "";
        for (var j = 0; j < preprocess_traffic_lights.length; j++) {
          var curr_light = preprocess_traffic_lights[j];
          if (curr_light["km"] == kilometer_number) {
            light = curr_light;
          }
        }
        item["traffic_light"] = light;
        final_table.push(item);
      }
    }

    if(precipitous.length > 0) {
      for (var i = 0; i < final_table.length; i++) {
        let prec = false;
        for(let j = 0; j < precipitous.length; j++) {
          if(precipitous[j].value.indexOf('+') !== -1) {

            let km = precipitous[j].value.split('+')[0]
            if(km == final_table[i]['km']) {
              prec = true
            }

          }
        }
        if(prec) icons[i].push("3")
      }
    }

    if(ktsm.length > 0) {
      for (var i = 0; i < final_table.length; i++) {
        let ktsmBool = false;
        for(let j = 0; j < ktsm.length; j++) {
          if(ktsm[j].value.indexOf('+') !== -1) {

            let km = ktsm[j].value.split('+')[0]
            if(km == final_table[i]['km']) {
              ktsmBool = true
            }

          }
        }
        if(ktsmBool) icons[i].push("0")
      }
    }

    if(lap.length > 0) {
      for (var i = 0; i < final_table.length; i++) {
        let lapBool = false;
        for(let j = 0; j < lap.length; j++) {
          if(lap[j].value.indexOf('+') !== -1) {

            let km = lap[j].value.split('+')[0]
            if(km == final_table[i]['km']) {
              lapBool = true
            }

          }
        }
        if(lapBool) icons[i].push("4")
      }
    }

    console.log('final_table', final_table)

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
        <UploadFiles uploadTrafic={uploadTraficLight} uploadPrecipitous={uploadPrecipitous} uploadKtsm={uploadKtsm} uploadLap={uploadLap}/>
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
