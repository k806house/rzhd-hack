import React, {useState} from 'react';
import XLSX from 'xlsx';
import { Row, Col } from 'antd';
import { SheetJSFT } from '../types';

const UploadFile = ({ upload }) => {

  async function handlerFile(event) {
    const file = event.target.files[0];
    
    NormalizeData(file);
  }

  function NormalizeData(data) {
    const traficLights = [];

    const reader = new FileReader();
    reader.onload = (evt) => {
        /* Parse data */
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, {type:'binary'});

        /* Get first worksheet */
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];

        /* Convert array of arrays */
        const data = XLSX.utils.sheet_to_json(ws, {header:1});
        /* Update state */

        data.forEach(el => {
          if(el[1] && el[2]) {
            traficLights.push({"name": el[1].toString(), "value": el[2]});
          }
        });
    };
    reader.readAsBinaryString(data);

    upload(traficLights);
  };

  return (
    <div>
      <Row>
        <Col span={2}>
          <span>Светофоры</span>
          <input
            type="file"
            className="form-control"
            id="file"
            accept={SheetJSFT}
            onChange={handlerFile}
          />
          <br />
          <br />
          <span>Обрывные места</span>
          <input
            type="file"
            className="form-control"
            id="file"
            accept={SheetJSFT}
            onChange={handlerFile}
          />
        </Col>
      </Row>
    </div>
  )
}

export default UploadFile;