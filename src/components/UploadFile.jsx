import React, {useState} from 'react';
import XLSX from 'xlsx';
import { Row, Col } from 'antd';
import { SheetJSFT } from '../types';

const UploadFile = ({ uploadTrafic, uploadPrecipitous }) => {

  async function handlerFileTrafic(event) {
    const file = event.target.files[0];
    
    NormalizeData(file, 'trafic');
  }
  async function handlerFilePrecipitous(event) {
    const file = event.target.files[0];
    
    NormalizeData(file, 'precipitous');
  }

  function NormalizeData(data, type) {
    const traficLights = [];
    const precipitous = [];

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

        if(type == 'trafic') {

          data.forEach(el => {
            if(el[1] && el[2]) {
              traficLights.push({"name": el[1].toString(), "value": el[2]});
            }
          });

        } else if(type == 'precipitous') {

          data.forEach(el => {
            if(el[1]) {
              precipitous.push({"value": el[1]});
            }
          });

        }
    };
    reader.readAsBinaryString(data);

    if(type == 'trafic') {
      uploadTrafic(traficLights);
    } else if (type == 'precipitous') {
      uploadPrecipitous(precipitous)
    }
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
            onChange={handlerFileTrafic}
          />
          <br />
          <br />
          <span>Обрывные места</span>
          <input
            type="file"
            className="form-control"
            id="file"
            accept={SheetJSFT}
            onChange={handlerFilePrecipitous}
          />
        </Col>
      </Row>
    </div>
  )
}

export default UploadFile;