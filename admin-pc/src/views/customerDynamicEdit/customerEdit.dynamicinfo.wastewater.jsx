/**
 * 废水污染物排放情况
 */
import React from 'react';
import {
  Modal
} from 'antd';

import DraggableModal from '../../components/modal.draggable';

import connectEeditableSectionApi from '../../components/hoc.editable.section';

/**
 * 废水污染物排放情况
 *   - 废水因子基本情况
 */
import WasteWaterDischargeFactor from './customerEdit.dynamicinfo.wastewater.dischargefactor';

/**
 * 已弃用，基本信息自带编辑功能
 * 废水排放基本信息详情
 */
// import WasteWaterDischargeDetail from './customerEdit.dynamicinfo.wastewater.discharge';


import {
  getWastewaterDischargeList, // 选择废水排放口
} from '../../common/api/api.customer.plus';

import {
  getWastewaterDischargeRecordList,
  getWastewaterDischargeRecordDelete,
  getWastewaterDischargeRecordAdd,
  getWastewaterDischargeRecordUpdate,
} from '../../common/api/api.customer.dynamic.plus';

import {
  getLocQueryByLabel,
  convertObjectLabel,
  MyToast
} from '../../common/utils';

const dynamicId = getLocQueryByLabel("dynamicId");

/**
 * table head
 */
const columns = [{
  title: '排放量',
  dataIndex: 'emissionAmount',
}, {
  title: '排放去向',
  dataIndex: 'emissionDestination',
}, {
  title: '排放口',
  dataIndex: 'portsNumber',
}, {
  title: '操作',
  dataIndex: 'operation',
  width: 120
}];


/**
 * 新数据默认值
 */
const itemDataModel = {
  emissionAmount: '',
  emissionDestination: '',
  portsNumber: {
    value: '',
    options: []
  }
};

const WasteWaterDischargeRecordBase = connectEeditableSectionApi({
  secTitle: '废水排放基本信息列表',
  columns: columns,
  apiLoader: function () {
    return new Promise((resolve, reject) => {
      //获取数据
      if (!dynamicId) return;

      //获取所有排放口
      getWastewaterDischargeList({}).then(res => {
        if (res.data.result !== 'success') {
          MyToast(res.data.info)
          return;
        }

        var data = res.data.wasteWaterDischargePortList;

        var wasteWaterDischargePortListOptions = convertObjectLabel(data, 'tableId', 'serialNumber');

        return wasteWaterDischargePortListOptions;
      }).then(wasteWaterDischargePortListOptions => {
        itemDataModel.portsNumber.options = wasteWaterDischargePortListOptions;
        //获取废水列表
        getWastewaterDischargeRecordList({
          customerMonthDclarationId: dynamicId,
        }).then(res => {
          console.log('getWastewaterDischargeRecordList res ---', res);

          if (res.data.result !== 'success') {
            resolve({
              code: -1,
              info: res.data.info,
            })
            return;
          }

          var data = res.data.wasteWaterDischargeRecordList;

          data = data.map(item => {
            return {
              ...item,
              portsNumber: {
                value: item.portsNumber,
                disabled: true,
                options: wasteWaterDischargePortListOptions
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
    // 新增
    var self = this;

    if (record.tableId === '') {
      return new Promise((resolve, reject) => {
        // 新增
        getWastewaterDischargeRecordAdd({
          ...record,
          customerMonthDclarationId: dynamicId,
          wasteWaterDischargePortId: record.portsNumber.value,
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
    } else {
      // 编辑
      return new Promise((resolve, reject) => {
        getWastewaterDischargeRecordUpdate({
          ...record,
          customerMonthDclarationId: dynamicId,
          wasteWaterDischargePortId: record.portsNumber.value,
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
      getWastewaterDischargeRecordDelete(tableId).then(res => {
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

class WasteWaterDischargeRecord extends React.Component {
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
        <WasteWaterDischargeRecordBase checkInNewpage={this.onCheckClick.bind(this)} />

        <DraggableModal
          width="90%"
          visible={this.state.modalVisible}
          title="废水排放因子"
          onCancel={this.handleCancel.bind(this)}
          footer={null}>
          {this.state.eidtId === '' ? null : <WasteWaterDischargeFactor apiListItemId={this.state.eidtId} />}
        </DraggableModal>
      </div>
    )
  }
}



export default WasteWaterDischargeRecord;