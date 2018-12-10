import Vue from "vue";

  var XML = function () { };
  XML.ObjTree = function () {
      return this
  };
  XML.ObjTree.VERSION = "0.23";
  XML.ObjTree.prototype.xmlDecl = '<?xml version="1.0" encoding="UTF-8" ?>\n';
  XML.ObjTree.prototype.attr_prefix = '';
  XML.ObjTree.prototype.parseXML = function (xml) {
      var root;
      if (window.DOMParser) {
          var xmldom = new DOMParser();
          var dom = xmldom.parseFromString(xml, "application/xml");
          if (!dom)
              return !1;
          root = dom.documentElement
      } else if (window.ActiveXObject) {
          xmldom = new ActiveXObject('Microsoft.XMLDOM');
          xmldom.async = false;
          xmldom.loadXML(xml);
          root = xmldom.documentElement
      }
      if (!root)
          return !1;
      return this.parseDOM(root)
  }
      ;
  XML.ObjTree.prototype.parseElement = function (elem) {
      if (elem.nodeType == 7) {
          return !1
      }
      if (elem.nodeType == 3 || elem.nodeType == 4) {
          var bool = elem.nodeValue.match(/[^\x00-\x20]/);
          if (bool == null)
              return !1;
          return elem.nodeValue
      }
      var retval;
      var cnt = {};
      if (elem.attributes && elem.attributes.length) {
          retval = {};
          for (var i = 0; i < elem.attributes.length; i++) {
              var key = elem.attributes[i].nodeName;
              if (typeof (key) != "string")
                  continue;
              var val = elem.attributes[i].nodeValue;
              if (!val)
                  continue;
              key = this.attr_prefix + key;
              if (typeof (cnt[key]) == "undefined")
                  cnt[key] = 0;
              cnt[key]++;
              this.addNode(retval, key, cnt[key], val)
          }
      }
      if (elem.childNodes && elem.childNodes.length) {
          var textonly = true;
          if (retval)
              textonly = false;
          for (var i = 0; i < elem.childNodes.length && textonly; i++) {
              var ntype = elem.childNodes[i].nodeType;
              if (ntype == 3 || ntype == 4)
                  continue;
              textonly = false
          }
          if (textonly) {
              if (!retval)
                  retval = "";
              for (var i = 0; i < elem.childNodes.length; i++) {
                  retval += elem.childNodes[i].nodeValue
              }
          } else {
              if (!retval)
                  retval = {};
              for (var i = 0; i < elem.childNodes.length; i++) {
                  var key = elem.childNodes[i].nodeName;
                  if (typeof (key) != "string")
                      continue;
                  var val = this.parseElement(elem.childNodes[i]);
                  if (val !== "" && !val)
                      continue;
                  if (typeof (cnt[key]) == "undefined")
                      cnt[key] = 0;
                  cnt[key]++;
                  this.addNode(retval, key, cnt[key], val)
              }
          }
      } else {
          retval = '';
      }
      return retval
  }
      ;
  XML.ObjTree.prototype.parseDOM = function (root) {
      if (!root) {
          return !1
      }
      ; this.__force_array = {};
      if (this.force_array) {
          for (var i = 0; i < this.force_array.length; i++) {
              this.__force_array[this.force_array[i]] = 1
          }
      }
      var json = this.parseElement(root);
      if (this.__force_array[root.nodeName]) {
          json = [json]
      }
      if (root.nodeType != 11) {
          var tmp = {};
          tmp[root.nodeName] = json;
          json = tmp
      }
      return json
  }
      ;
  XML.ObjTree.prototype.addNode = function (hash, key, cnts, val) {
      if (this.__force_array[key]) {
          if (cnts == 1)
              hash[key] = [];
          hash[key][hash[key].length] = val
      } else if (cnts == 1) {
          hash[key] = val
      } else if (cnts == 2) {
          hash[key] = [hash[key], val]
      } else {
          hash[key][hash[key].length] = val
      }
  }
      ;
  XML.ObjTree.prototype.writeXML = function (tree) {
      var xml = this.hash_to_xml(null, tree);
      return this.xmlDecl + xml
  }
      ;
  XML.ObjTree.prototype.hash_to_xml = function (name, tree) {
      var elem = [];
      var attr = [];
      for (var key in tree) {
          if (!tree.hasOwnProperty(key))
              continue;
          var val = tree[key];
          if (key.charAt(0) != this.attr_prefix) {
              if (typeof (val) == "undefined" || val == null) {
                  elem[elem.length] = "<" + key + " />"
              } else if (typeof (val) == "object" && val.constructor.name == 'Array') {
                  elem[elem.length] = this.array_to_xml(key, val)
              } else if (typeof (val) == "object") {
                  elem[elem.length] = this.hash_to_xml(key, val)
              } else {
                  elem[elem.length] = this.scalar_to_xml(key, val)
              }
          } else {
              attr[attr.length] = " " + (key.substring(1)) + '="' + (this.xml_escape(val)) + '"'
          }
      }
      var jattr = attr.join("");
      var jelem = elem.join("");
      if (typeof (name) == "undefined" || name == null) { } else if (elem.length > 0) {
          if (jelem.match(/\n/)) {
              jelem = "<" + name + jattr + ">\n" + jelem + "</" + name + ">\n"
          } else {
              jelem = "<" + name + jattr + ">" + jelem + "</" + name + ">\n"
          }
      } else {
          jelem = "<" + name + jattr + " />\n"
      }
      return jelem
  }
      ;
  XML.ObjTree.prototype.array_to_xml = function (name, array) {
      var out = [];
      for (var i = 0; i < array.length; i++) {
          var val = array[i];
          if (typeof (val) == "undefined" || val == null) {
              out[out.length] = "<" + name + " />"
          } else if (typeof (val) == "object" && val.constructor == Array) {
              out[out.length] = this.array_to_xml(name, val)
          } else if (typeof (val) == "object") {
              out[out.length] = this.hash_to_xml(name, val)
          } else {
              out[out.length] = this.scalar_to_xml(name, val)
          }
      }
      return out.join("")
  }
      ;
  XML.ObjTree.prototype.scalar_to_xml = function (name, text) {
      if (name == "#text") {
          return this.xml_escape(text)
      } else {
          return "<" + name + ">" + this.xml_escape(text) + "</" + name + ">\n"
      }
  }
      ;
  XML.ObjTree.prototype.xml_escape = function (text) {
      return (text + '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
  }
      ;
  var JKL = function () { };
  JKL.Dumper = function () {
      return this
  }
      ;
  JKL.Dumper.prototype.dump = function (data, offset) {
      if (typeof (offset) == "undefined")
          offset = "";
      var nextoff = offset + "  ";
      switch (typeof (data)) {
          case "string":
              return '"' + this.escapeString(data) + '"';
              break;
          case "number":
              return data;
              break;
          case "boolean":
              return data ? "true" : "false";
              break;
          case "undefined":
              return "null";
              break;
          case "object":
              if (data == null) {
                  return "null"
              } else if (data.constructor == Array) {
                  var array = [];
                  for (var i = 0; i < data.length; i++) {
                      array[i] = this.dump(data[i], nextoff)
                  }
                  return "[\n" + nextoff + array.join(",\n" + nextoff) + "\n" + offset + "]"
              } else {
                  var array = [];
                  for (var key in data) {
                      var val = this.dump(data[key], nextoff);
                      key = '"' + this.escapeString(key) + '"';
                      array[array.length] = key + ": " + val
                  }
                  if (array.length == 1 && !array[0].match(/[\n\{\[]/)) {
                      return "{ " + array[0] + " }"
                  }
                  return "{\n" + nextoff + array.join(",\n" + nextoff) + "\n" + offset + "}"
              }
              break;
          default:
              return data;
              break
      }
  }
      ;
  JKL.Dumper.prototype.escapeString = function (str) {
      return str.replace(/\\/g, "\\\\").replace(/\"/g, "\\\"")
  }
      ;
  var formatXml = function (xml) {
      var reg = /(>)(<)(\/*)/g;
      var wsexp = / *(.*) +\n/g;
      var contexp = /(<.+>)(.+\n)/g;
      xml = xml.replace(reg, '$1\n$2$3').replace(wsexp, '$1\n').replace(contexp, '$1\n$2');
      var pad = 0;
      var formatted = '';
      var lines = xml.split('\n');
      var indent = 0;
      var lastType = 'other';
      var transitions = {
          'single->single': 0,
          'single->closing': -1,
          'single->opening': 0,
          'single->other': 0,
          'closing->single': 0,
          'closing->closing': -1,
          'closing->opening': 0,
          'closing->other': 0,
          'opening->single': 1,
          'opening->closing': 0,
          'opening->opening': 1,
          'opening->other': 1,
          'other->single': 0,
          'other->closing': -1,
          'other->opening': 0,
          'other->other': 0
      };
      for (var i = 0; i < lines.length; i++) {
          var ln = lines[i];
          var single = Boolean(ln.match(/<.+\/>/));
          var closing = Boolean(ln.match(/<\/.+>/));
          var opening = Boolean(ln.match(/<[^!].*>/));
          var type = single ? 'single' : closing ? 'closing' : opening ? 'opening' : 'other';
          var fromTo = lastType + '->' + type;
          lastType = type;
          var padding = '';
          indent += transitions[fromTo];
          for (var j = 0; j < indent; j++) {
              padding += '\t'
          }
          if (fromTo == 'opening->closing')
              formatted = formatted.substr(0, formatted.length - 1) + ln + '\n';
          else
              formatted += padding + ln + '\n'
      }
      return formatted
  };

  var xotree = new XML.ObjTree();
  var xml2json = function (xmlStr) {
      return xotree.parseXML(xmlStr);
  };
  var json2xml = function (json) {
      return xotree.writeXML(json);
  };

  const _getObj = function (head, others, Body) {
    var xmlHead = {
        "menuid": "",
        "process_code": "",
        "verify_code": "",
        "req_seq": "",
        "unicontact": "",
        "testflag": "0",
        "route": {
            "route_type": "0",
            "route_value": "951"
        },
        "channelinfo": {
            "channelid": "bsacSms",
            "unitid": "bsacSms"
        }
    };

    for (var k in head) {
        xmlHead[k] = head[k];
    }
    others.route_type != undefined && (xmlHead.route.route_type = others.route_type);
    others.route_value != undefined && (xmlHead.route.route_value = others.route_value);
    others.channelid != undefined && (xmlHead.channelinfo.channelid = others.channelid);
    others.unitid != undefined && (xmlHead.channelinfo.unitid = others.unitid);

    xmlHead.req_time = new Date().toISOString().split('.')[0].replace(/[-T:]/g, '');
    // xmlHead.channelinfo.operatorid = JSON.parse(ysp.appMain.getActiveWindow().localStorage.userInfo).userCode;
    return { message: { head: xmlHead, Body: Body } };
  };
  const _ajax = function () {
    return function (json, fn) {
      Vue.http.post('' + '',{
        xml: json2xml(json),
      }).then(function(res){
          var obj = xml2json(res.body.data);
          if (!obj.message || !obj.message.head || !obj.message.head.retinfo
              || obj.message.head.retinfo.retcode != '0') {
              console.error('接口返回了异常数据', JSON.stringify(obj));
              alert('接口返回了异常数据,'+JSON.stringify(obj),'提示');
          }else {
              fn(obj)
          }
      });
    };
  }
export default {
    ajax: _ajax,
    getObj: _getObj
}
