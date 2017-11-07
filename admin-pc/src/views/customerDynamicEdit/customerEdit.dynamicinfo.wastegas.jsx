/**
 * 废气污染物排放情况
 */
import React from 'react';
import {
  Modal
} from 'antd';

import connectEeditableSectionApi from '../../components/hoc.editable.section';

//废气排放基本信息详情
// import WasteGasDischargeDetail from './customerEdit.dynamicinfo.wastegas.discharge';

//废气因子基本情况
import WasteGasDischargeFactor from './customerEdit.dynamicinfo.wastegas.dischargefactor';

import {
  getWasteGasDischargeRecordList,
  getWasteGasDischargeRecordDelete,
  getWasteGasDischargeRecordAdd,
  getWasteGasDischargeRecordUpdate,
} from '../../common/api/api.customer.dynamic.plus.js';

import {
  getWasteGasDischargeList
} from '../../common/api/api.customer.plus.js';

import {
  getLocQueryByLabel,
  convertObjectLabel,
  MyToast
} from '../../common/utils';

const dynamicId = getLocQueryByLabel("dynamicId");

import moment from 'moment';
const dateFormat = 'YYYY-MM-DD';

/**
 * table head
 */
const columns = [{
  title: '废气排放口',
  dataIndex: 'wasteGasDischargePortId'
}, {
  title: '实测排放量',
  dataIndex: 'measuredExhaustVolume',
}, {
  title: '排放时间',
  dataIndex: 'emissionTime',
}, {
  title: '废气排放量',
  dataIndex: 'exhaustEmission',
}, {
  title: '数据来源',
  dataIndex: 'dataSources',
}, {
  title: '燃料',
  dataIndex: 'fuel',
}, {
  title: '林格曼黑度',
  dataIndex: 'ringermanBlackness',
}, {
  title: '废气类型',
  dataIndex: 'exhaustGasType',
}, {
  title: '操作',
  dataIndex: 'operation',
  width: 120
}];

/**
 * 新数据默认值
 */
const itemDataModel = {
  measuredExhaustVolume: '',
  emissionTime: '',
  exhaustEmission: '',
  dataSources: '',
  fuel: '',
  ringermanBlackness: '',
  exhaustGasType: '',
  wasteGasDischargePortId: {
    value: '',
    options: []
  }
};

const WasteGasDischargeRecordBase = connectEeditableSectionApi({
  secTitle: '废气排放基本信息列表',
  columns: columns,
  apiLoader: function () {
    return new Promise((resolve, reject) => {
      //获取数据
      if (!dynamicId) return;

      //获取所有排放口
      getWasteGasDischargeList({}).then(res => {
        if (res.data.result !== 'success') {
          MyToast(res.data.info)
          return;
        }
        var data = res.data.wasteGasDischargePortList;

        var wasteGasDischargePortListOptions = convertObjectLabel(data, 'tableId', 'serialNumber');

        return wasteGasDischargePortListOptions;
      }).then(wasteGasDischargePortListOptions => {
        itemDataModel.wasteGasDischargePortId.options = wasteGasDischargePortListOptions;

        getWasteGasDischargeRecordList({
          customerMonthDclarationId: dynamicId,
        }).then(res => {
          console.log('getWasteGasDischargeRecordList res ---', res);

          if (res.data.result !== 'success') {
            resolve({
              code: -1,
              info: res.data.info,
            })
            return;
          }

          var data = res.data.wasteGasDischargeRecordList;

          data = data.map(item => {
            return {
              ...item,
              wasteGasDischargePortId: {
                value: item.wasteGasDischargePort.tableId + '',
                disabled: true,
                options: wasteGasDischargePortListOptions
              }
            }
          });

          resolve({
            code: 0,
            data,
          })
        }).catch(err => {
          MyToast('接口调用失败')
        })
      }).catch(err => MyToast(err));
    })
  },
  apiSave: function (record) {
    console.log('apiListItemId record------------', record)
    // 新增
    var self = this;

    if (record.tableId === '') {
      return new Promise((resolve, reject) => {
        // 新增
        getWasteGasDischargeRecordAdd({
          ...record,
          customerMonthDclarationId: dynamicId,
          wasteGasDischargePortId: record.wasteGasDischargePortId.value,
        }).then(res => {
          // console.log('getWasteGasDischargeRecordAdd res----------', res)
          if (res.data.result !== 'success') {
            resolve({
              code: 1,
              info: res.data.info,
            });
            return;
          }

          resolve({
            code: 0 // success
          })
        }).catch(err => {
          // console.log('getWasteGasDischargeRecordAdd err----------', err)
          reject(err)
        });
      });
    } else {
      // 编辑
      return new Promise((resolve, reject) => {
        getWasteGasDischargeRecordUpdate({
          ...record,
          customerMonthDclarationId: dynamicId,
          wasteGasDischargePortId: record.wasteGasDischargePortId.value,
        }).then(res => {
          if (res.data.result !== 'success') {
            resolve({
              code: 1,
              info: res.data.info,
            });
            return;
          }

          resolve({
            code: 0 // success
          })
        }).catch(err => {
          reject(err)
        });
      });
    }
  },
  apiDel: function (tableId) {
    //删除
    console.log(`apiDel ${tableId}`);

    return new Promise((resolve, reject) => {
      getWasteGasDischargeRecordDelete(tableId).then(res => {
        if (res.data.result !== 'success') {
          resolve({
            code: 1,
            info: res.data.info,
          });
          return;
        }
        console.log(res);
        resolve({
          code: 0 // success
        });
      }).catch(err => {
        reject(err)
      });
    });
  },

  itemDataModel: itemDataModel
});

class WasteGasDischargeRecord extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      eidtId: ''
    }
  }

  onCheckClick(eidtId) {
    if (eidtId === '') return;

    this.setState({
      modalVisible: true,
      eidtId: eidtId
    });
  }

  handleCancel() {
    this.setState({
      modalVisible: false,
      eidtId: ''
    })
  }


  render() {
    return (
      <div>
        <WasteGasDischargeRecordBase checkInNewpage={this.onCheckClick.bind(this)} />

        <Modal
          width="90%"
          visible={this.state.modalVisible}
          title="废气排放因子"
          onCancel={this.handleCancel.bind(this)}
          footer={null}>
          {this.state.eidtId === '' ? null : <WasteGasDischargeFactor apiListItemId={this.state.eidtId} />}
        </Modal>
      </div>
    )
  }
}

export default WasteGasDischargeRecord;