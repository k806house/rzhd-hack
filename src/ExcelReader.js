import React, { Component } from 'react';
import XLSX from 'xlsx';
import { make_cols } from './MakeColumns';
import { SheetJSFT } from './types';

import { Row, Col } from 'antd';
import { file } from '@babel/types';

 
// class ExcelReader extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       file: {},
//       data: [],
//       cols: []
//     }
//     this.handleFile = this.handleFile.bind(this);
//     this.handleChange = this.handleChange.bind(this);
//   }
 
//   handleChange(e) {
//     const files = e.target.files;
//     if (files && files[0]) this.setState({ file: files[0] });
//   };
 
//   handleFile() {
//     /* Boilerplate to set up FileReader */
//     const reader = new FileReader();
//     const rABS = !!reader.readAsBinaryString;
 
//     reader.onload = (e) => {
//       /* Parse data */
//       const bstr = e.target.result;
//       const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array', bookVBA : true });
//       /* Get first worksheet */
//       const wsname = wb.SheetNames[0];
//       const ws = wb.Sheets[wsname];
//       /* Convert array of arrays */
//       const data = XLSX.utils.sheet_to_json(ws);
//       /* Update state */
//       this.setState({ data: data, cols: make_cols(ws['!ref']) }, () => {
//         console.log(JSON.stringify(this.state.data, null, 2));
//       });
 
//     };
 
//     if (rABS) {
//       reader.readAsBinaryString(this.state.file);
//     } else {
//       reader.readAsArrayBuffer(this.state.file);
//     };
//   }
 
//   render() {
//     return (
//       <div>
//         <label htmlFor="file">Upload an excel to Process Triggers</label>
//         <br />
//         <input type="file" className="form-control" id="file" accept={SheetJSFT} onChange={this.handleChange} />
//         <br />
//         <input type='submit' 
//           value="Process Triggers"
//           onClick={this.handleFile} />
//           </div>
      
//     )
//   }
// }

function ExcelReader() {
  const [data, setData] = React.useState([]);
  // const [traffic_lights, setTraficLight] = React.useState([{"name": "H1", "value": "234+600"}, {"name": "H", "value": "123+756"}]);

  // UploadFile
  // async function UploadFile(event) {
  //   const file = event.target.files[0];
    
  //   NormalizeData(file);
  // }

  // function NormalizeData(data) {
  //   const traficLights = [];

  //   const reader = new FileReader();
  //   reader.onload = (evt) => {
  //       /* Parse data */
  //       const bstr = evt.target.result;
  //       const wb = XLSX.read(bstr, {type:'binary'});

  //       /* Get first worksheet */
  //       const wsname = wb.SheetNames[0];
  //       const ws = wb.Sheets[wsname];

  //       /* Convert array of arrays */
  //       const data = XLSX.utils.sheet_to_json(ws, {header:1});
  //       /* Update state */

  //       data.forEach(el => {
  //         if(el[1] && el[2]) {
  //           traficLights.push({"name": el[1].toString(), "value": el[2]})
  //         }
  //       });
  //   };
  //   reader.readAsBinaryString(data);

  //   setTraficLight(traficLights);
  // }

  const [cols, setCols] = React.useState([]);

  const [fileCounter, setFileCounter] = React.useState(1);
  const [isSubmitVisible, isSubmitVisibleSet] = React.useState(true);

  const handleFile = (file) => {
    // const reader = new FileReader();
    // reader.onload = (e) => {
    //   /* Parse data */
    //   const ab = e.target.result;
    //   const wb = XLSX.read(ab, {type:'array'});
    //   /* Get first worksheet */
    //   const wsname = wb.SheetNames[0];
    //   const ws = wb.Sheets[wsname];
    //   /* Convert array of arrays */
    //   const data = XLSX.utils.sheet_to_json(ws, {header:1});
    //   /* Update state */
    //   setData(data);
    //   setCols(make_cols(ws['!ref']))
    // };
    // reader.readAsArrayBuffer(file);
    console.log("kek");
  }

  // const addfile = () => {
  //   setFileCounter(fileCounter + 1);
  //   if (fileCounter == 2) {
  //     isSubmitVisibleSet(false);
  //   }
  //   console.log(fileCounter);
  // };

  const exportFile = () => {
    /* convert state to workbook */
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
    /* generate XLSX file and send to client */
    XLSX.writeFile(wb, "sheetjs.xlsx")
  };

  return (
      <div>
        <Row>
          {/* <Col span={2}>
              Светофоры
              <input type="file" className="form-control" id="file" accept={SheetJSFT} onChange={UploadFile} />
              <br />
              <br />
              Обрывные места
              <input type="file" className="form-control" id="file" accept={SheetJSFT} onChange={UploadFile} />
          </Col> */}
          {/* <Col span={2}>
              Обрывные места
          </Col>
          <Col span={2}>
              Места пересечения с ЛЭП
          </Col>
          <Col span={2}>
              Опробование тормозов
          </Col>
          <Col span={2}>
              Устройства контроля схода подвижного состава (УКСПС)
          </Col>
          <Col span={2}>
              Комплексы технических средств мониторинга (КТСМ)
          </Col>
          <Col span={2}>
              Оси станций
          </Col>
          <Col span={2}>
              Граничные стрелки станций
          </Col>
          <Col span={2}>
              Переезды
          </Col>
          <Col span={2}>
              Мосты
          </Col>
          <Col span={2}>
              Профиль пути
          </Col>
          <Col span={2}>
              Ведомость допустимых скоростей
          </Col> */}
        </Row>
        {/* <label htmlFor="file">Upload an excel to Process Triggers</label>
        <br /> */}
        {/* <input type="file" className="form-control" id="file" accept={SheetJSFT} onChange={handleFile} />
        <br />
        <input type='submit' 
          disabled={isSubmitVisible}
          value="Process Triggers"
          onClick={handleFile} /> */}
        </div>
      
    )

  // return (
  // <DragDropFile handleFile={handleFile}>
  //   <div className="row"><div className="col-xs-12">
  //     <DataInput handleFile={handleFile} />
  //   </div></div>
  //   <div className="row"><div className="col-xs-12">
  //     <button disabled={!data.length} className="btn btn-success" onClick={exportFile}>Export</button>
  //   </div></div>
  //   <div className="row"><div className="col-xs-12">
  //     <OutTable data={data} cols={cols} />
  //   </div></div>
  // </DragDropFile>
  // );
}
 
export default ExcelReader;

function DragDropFile({ handleFile, children }) {
  const suppress = (e) => { e.stopPropagation(); e.preventDefault(); };
  const handleDrop = (e) => { e.stopPropagation(); e.preventDefault();
    const files = e.dataTransfer.files;
    if(files && files[0]) handleFile(files[0]);
  };

  return (
    <div
      onDrop={handleDrop}
      onDragEnter={suppress}
      onDragOver={suppress}
    >
    {children}
    </div>
  );
}

function DataInput({ handleFile }) {
  const handleChange = (e) => {
    const files = e.target.files;
    if(files && files[0]) handleFile(files[0]);
  };

  return (
    <form className="form-inline">
      <div className="form-group">
        <label htmlFor="file">Drag or choose a spreadsheet file</label>
        <br />
        <input
          type="file"
          className="form-control"
          id="file"
          accept={SheetJSFT}
          onChange={handleChange}
        />
      </div>
    </form>
  )
}

function OutTable({ data, cols }) {
  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>{cols.map((c) => <th key={c.key}>{c.name}</th>)}</tr>
        </thead>
        <tbody>
          {data.map((r,i) => <tr key={i}>
            {cols.map(c => <td key={c.key}>{ r[c.key] }</td>)}
          </tr>)}
        </tbody>
      </table>
    </div>
  );
}
