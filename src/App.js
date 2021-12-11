import logo from './static/logo.png';
import './App.css';

import { Button, Card } from 'antd';
import 'antd/dist/antd.css';
import { Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import ExcelReader from './ExcelReader';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

const uploadButton = (
  <div>
    <PlusOutlined />
    <div style={{ marginTop: 8 }}>Upload</div>
  </div>
);

function App() {
  var mock1 = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
  var mock2 = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
  var indexs = ["0", "1", "3", "4"];
  var numbers = ["234", "123", "234", "348", "234", "123", "234", "123", "234", "123", "234", "388", "234", "123", "234", "123"];
  var icons = [["0", "1"], ["1"], ["3", ], [], ["4", "1"], [], ["0"], [], ["3"], [], ["4", "1"], ["1"], [], [], [], []];

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
      mock2.forEach(function(cellData) {
          var cell_special = document.createElement('th');
          var cell = document.createElement('span');

          cell.appendChild(document.createTextNode(cellData));
          cell_special.appendChild(cell);
          row.appendChild(cell_special);
      });
      tableBody.appendChild(row);

      var row = document.createElement('tr');
      numbers.forEach(function(cellData) {
          var cell_special = document.createElement('th');
          var cell = document.createElement('span');

          cell.appendChild(document.createTextNode(cellData));
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
      document.body.appendChild(table);
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
      
      <div id="cartographer">

      </div>
      <Button onClick={createTable}> Draw </Button>
    </div>
  );
}

export default App;
