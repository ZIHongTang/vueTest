import utils from "@/utils.js";
const {getObj, ajax} = utils;
const _ajax = ajax();
export default {
  menuAuthCheck:()=>{
    var obj = getObj({
      process_code: 'UniMenuAuthCheck'
    }, {
        channelid: 'UNIAPP',
        route_value: '999'
    }, {
        menuIDList: {
          menu: [{
            menuID: 'CustomerInfoQueryStat_WEB'
          }, {
            menuID: '60102002057'
          }, {
            menuID: 'ANDROID_TWO_COMMODITYORDER'
          }]
        }
    });
  },
  qryMainOfferList:(o,fn)=>{//1.2
    var _o = getObj({
      process_code: 'UniQryMainOfferList',
      req_seq:'6',
      testflag:'0'
    }, {
        "channelid": "",
        "unitid": ""
    }, {
        queryType: 'searchMainOffering',
        recType: o.recType || 'CreateSubscriber',
        catalogID: o.catalogID || '',
        categoryID: o.categoryID || '',
        keyWord: o.keyWord || '',
        salesTagList: o.salesTagList,
        pageInfo: {
            beginRowNumber: o.beginRowNumber || "0",
            recordPerPage:'100'
        }
    });
    _ajax(_o,function(obj){
      fn && fn(obj);
    });
  },
};
