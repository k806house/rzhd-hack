import React, {useState} from 'react';
import XLSX from 'xlsx';
import { Row, Col } from 'antd';
import { SheetJSFT } from '../types';

const UploadFile = ({ uploadTrafic, uploadPrecipitous, uploadKtsm, uploadLap }) => {
  let [classTrafic, setClassTrafic] = useState(false)
  let [classPrec, setClassPrec] = useState(false)
  let [classKtsm, setClassKtsm] = useState(false)
  let [classLap, setClassLap] = useState(false)

  async function handlerFileTrafic(event) {
    const file = event.target.files[0];
    NormalizeData(file, 'trafic');
    if (file) setClassTrafic(event.target.files[0].name);
  }
  async function handlerFilePrecipitous(event) {
    const file = event.target.files[0];
    NormalizeData(file, 'precipitous');
    if (file) setClassPrec(event.target.files[0].name);
  }

  async function handlerFileKtsm(event) {
    const file = event.target.files[0];
    NormalizeData(file, 'ktsm');
    if (file) setClassKtsm(event.target.files[0].name);
  }

  async function handlerFileLap(event) {
    const file = event.target.files[0];
    NormalizeData(file, 'lap');
    if (file) setClassLap(event.target.files[0].name);
  }

  function NormalizeData(data, type) {
    const traficLights = [];
    const precipitous = [];
    const ktsm = [];
    const lap = [];

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

        } else if(type == 'ktsm') {

          data.forEach(el => {
            if(el[2]) {
              ktsm.push({"value": el[2]});
            }
          });

        } else if(type == 'lap') {

          data.forEach(el => {
            if(el[2]) {
              lap.push({"value": el[2]});
            }
          });

        }
    };
    reader.readAsBinaryString(data);

    if(type == 'trafic') {
      uploadTrafic(traficLights);
    } else if (type == 'precipitous') {
      uploadPrecipitous(precipitous)
    } else if (type == 'ktsm') {
      uploadKtsm(ktsm)
    } else if (type == 'lap') {
      uploadLap(lap)
    }
  };

  return (
    <div className='uploadFile'>
      <div>
        <label for="custom-file-upload1" className={classTrafic ? 'active filupp' : 'filupp'}>
          <span class="filupp-file-name js-value">{classTrafic ? classTrafic : 'Светофоры' }</span>
          <input type="file" name="attachment-file" onChange={handlerFileTrafic} accept={SheetJSFT} id="custom-file-upload1"/>
        </label>
      </div>
      <div>
        <label for="custom-file-upload2" className={classPrec ? 'active filupp' : 'filupp'}>
          <span class="filupp-file-name js-value">{classPrec ? classPrec : 'Обрывные места' }</span>
          <input type="file" name="attachment-file" onChange={handlerFilePrecipitous} accept={SheetJSFT} id="custom-file-upload2"/>
        </label>
      </div>
      <div>
        <label for="custom-file-upload3" className={classKtsm ? 'active filupp' : 'filupp'}>
          <span class="filupp-file-name js-value">{classKtsm ? classKtsm : 'КТСМ' }</span>
          <input type="file" name="attachment-file" onChange={handlerFileKtsm} accept={SheetJSFT} id="custom-file-upload3"/>
        </label>
      </div>
      <div>
        <label for="custom-file-upload4" className={classLap ? 'active filupp' : 'filupp'}>
          <span class="filupp-file-name js-value">{classLap ? classLap : 'ЛЭП' }</span>
          <input type="file" name="attachment-file" onChange={handlerFileLap} accept={SheetJSFT} id="custom-file-upload4"/>
        </label>
      </div>
    </div>
  )
}

export default UploadFile;