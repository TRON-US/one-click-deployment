(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-53ae684c"],{"012e":function(e,t,r){"use strict";var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"viewBranchDialog"},[r("el-row",{attrs:{gutter:12}},[r("el-col",{attrs:{span:24}},[r("el-card",{attrs:{shadow:"hover"}},[r("div",{on:{click:function(t){e.genesisContentShow=!e.genesisContentShow}}},[r("i",{class:e.genesisContentShow?"el-icon-arrow-down":"el-icon-arrow-right"}),e._v("\n                    "+e._s(e.$t("tronSettingGenesis"))+"\n                ")]),e._v(" "),e.genesisContentShow?r("el-form",{ref:"genesisSettingDialogForm",staticClass:"tronbaseSettingForm",attrs:{"label-width":"200px","label-position":"left"}},[r("el-row",[r("el-col",{attrs:{span:12}},[r("div",{staticClass:"asset"},[r("el-button",{staticClass:"newAsset",on:{click:function(t){return e.newAssetFun()}}},[e._v("new asset")]),e._v(" "),e._l(e.detailInfoData.genesis_block_assets,(function(t,n){return r("el-row",{key:n},[r("el-button",{staticStyle:{width:"100%"},on:{click:function(r){return e.currentAssetFun(t,n)}}},[e._v(e._s(t.accountName))])],1)}))],2)]),e._v(" "),r("el-col",{attrs:{span:12}},[r("div",{staticClass:"witeness"},[r("el-button",{staticClass:"newWiteness"},[e._v("witeness")]),e._v(" "),e._l(e.detailInfoData.genesis_block_witnesses,(function(t,n){return r("el-row",{key:n},[r("el-button",{staticStyle:{width:"100%"},on:{click:function(r){return e.currenWitenessFun(t,n)}}},[e._v(e._s(t.address))])],1)}))],2)])],1)],1):e._e()],1)],1)],1),e._v(" "),r("div",{staticClass:"textRight",attrs:{"label-width":"0"}},[r("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.saveAllData()}}},[e._v(e._s(e.$t("tronSettingNextStep")))])],1),e._v(" "),r("el-dialog",{attrs:{center:"",width:"700px",title:e.$t("tronAssetSetting"),visible:e.innerAssetVisible},on:{"update:visible":function(t){e.innerAssetVisible=t}}},[r("el-form",{ref:"assetDialogForm",staticClass:"assetDialogForm",attrs:{rules:e.assetRules,model:e.assetForm,"label-width":"120px","label-position":"left"}},[r("el-form-item",{attrs:{label:"accountName",prop:"accountName"}},[r("el-input",{attrs:{size:"small",maxlength:50,placeholder:e.$t("tronSettingPlaceholder")},model:{value:e.assetForm.accountName,callback:function(t){e.$set(e.assetForm,"accountName",t)},expression:"assetForm.accountName"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"accountType",prop:"accountType"}},[r("el-select",{attrs:{size:"small",placeholder:e.$t("tronSettingSelectPlaceholder")},model:{value:e.assetForm.accountType,callback:function(t){e.$set(e.assetForm,"accountType",t)},expression:"assetForm.accountType"}},e._l(e.accountTypeOptions,(function(e){return r("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),e._v(" "),r("el-form-item",{attrs:{label:"address",prop:"address"}},[r("el-input",{attrs:{size:"small",maxlength:50,placeholder:e.$t("tronSettingPlaceholder")},model:{value:e.assetForm.address,callback:function(t){e.$set(e.assetForm,"address",t)},expression:"assetForm.address"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"balance",prop:"balance"}},[r("el-input",{attrs:{size:"small",maxlength:50,placeholder:e.$t("tronSettingPlaceholder")},model:{value:e.assetForm.balance,callback:function(t){e.$set(e.assetForm,"balance",t)},expression:"assetForm.balance"}})],1),e._v(" "),r("el-form-item",{staticClass:"textCenter",attrs:{"label-width":"0"}},[r("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.saveData("assetDialogForm")}}},[e._v(e._s(e.$t("tronSettingSave")))]),e._v(" "),r("el-button",{on:{click:function(t){e.innerAssetVisible=!1}}},[e._v(e._s(e.$t("tronSettingCancel")))])],1)],1)],1),e._v(" "),r("el-dialog",{attrs:{center:"",width:"700px",title:e.$t("tronWitenessSetting"),visible:e.innerWitenessVisible},on:{"update:visible":function(t){e.innerWitenessVisible=t}}},[r("el-form",{ref:"witenessDialogForm",attrs:{rules:e.witenessRules,model:e.witenessForm,"label-width":"120px","label-position":"left"}},[r("el-form-item",{attrs:{label:"address",prop:"address"}},[e._v("\n                "+e._s(e.witenessForm.address)+"\n                ")]),e._v(" "),r("el-form-item",{attrs:{label:"url",prop:"url"}},[e._v("\n                "+e._s(e.witenessForm.url)+"\n                ")]),e._v(" "),r("el-form-item",{attrs:{label:"voteCount",prop:"voteCount"}},[e._v("\n                "+e._s(e.witenessForm.voteCount)+"\n                ")])],1)],1)],1)},o=[],s=(r("ac6a"),r("93b6")),i=r("61f7"),a=r("d01b"),l=r.n(a),c={name:"genesisSetting",props:["detailInfoData"],data:function(){var e=this,t=function(t,r,n){Object(i["b"])(r)?n():n(new Error(e.$t("tronSettingNumberPlaceholder")))},r=function(t,r,n){r>0x8000000000000000||r<-0x8000000000000000?n(new Error(e.$t("tronSettingNumberPlaceholder"))):n()},n=function(t,r,n){l.a.isAddress(r)?n():n(new Error(e.$t("tronSettingAddressPlaceholder")))},o=function(t,r,n){var o=l.a.address.fromPrivateKey(r);console.log(o),l.a.isAddress(o)?n():n(new Error(e.$t("tronSettingAddressPlaceholder")))};return{classLoading:!1,genesisContentShow:!0,assetEditStatus:0,currentAssetEditInd:"",currentWitenessEditInd:"",witenessEditStatus:0,innerAssetVisible:!1,innerWitenessVisible:!1,genesisSetting:{genesis_block_assets:[],genesis_block_witnesses:[]},accountTypeOptions:[{value:"AssetIssue",label:"AssetIssue"},{value:"Contract",label:"Contract"}],assetRules:{accountName:[{required:!0,message:this.$t("tronSettingPlaceholder"),trigger:"blur"}],accountType:[{required:!0,message:this.$t("tronSettingPlaceholder"),trigger:"blur"}],address:[{required:!0,message:this.$t("tronSettingPlaceholder"),trigger:"blur"},{required:!0,validator:n,trigger:"blur"}],balance:[{required:!0,message:this.$t("tronSettingPlaceholder"),trigger:"blur"},{required:!0,validator:r,trigger:"blur"}]},assetForm:{accountName:"",accountType:"",address:"",balance:""},witenessRules:{address:[{required:!0,message:this.$t("tronSettingPlaceholder"),trigger:"blur"},{required:!0,validator:n,trigger:"blur"}],url:{required:!0,message:this.$t("tronSettingPlaceholder"),trigger:"blur"},voteCount:[{required:!0,message:this.$t("tronSettingPlaceholder"),trigger:"blur"},{required:!0,validator:t,trigger:"blur"}],privateKey:[{required:!0,message:this.$t("tronSettingPlaceholder"),trigger:"blur"},{required:!0,validator:o,trigger:"blur"}]},witenessForm:{address:"",url:"",voteCount:"",privateKey:""}}},methods:{newAssetFun:function(){this.assetForm={accountName:"",accountType:"",address:"",balance:""},this.innerAssetVisible=!0},newWitenessFun:function(){this.witenessForm={address:"",url:"",voteCount:"",privateKey:""},this.innerWitenessVisible=!0},currentAssetFun:function(e,t){this.assetForm=e,this.assetEditStatus=1,this.currentAssetEditInd=t,this.innerAssetVisible=!0},currenWitenessFun:function(e,t){this.witenessForm=e,this.witenessEditStatus=1,this.currentWitenessEditInd=t,this.innerWitenessVisible=!0},saveData:function(e){var t=this;this.$refs[e].validate((function(e){if(!e)return console.log("error submit!!"),!1;console.log(t.assetForm),0==t.assetEditStatus?t.genesisSetting.genesis_block_assets.push(t.assetForm):t.genesisSetting.genesis_block_assets[t.currentAssetEditInd]=t.assetForm;var r={assets:t.genesisSetting.genesis_block_assets};console.log(r),Object(s["e"])(r).then((function(e){t.$emit("addSettingSuccess",!0),t.$message.success(t.$t("tronSettingGenesisSaveSuccess")),t.innerAssetVisible=!1,t.assetEditStatus=0})).catch((function(e){console.log(e)}))}))},saveWitenessData:function(e){var t=this;this.$refs[e].validate((function(e){if(!e)return console.log("error submit!!"),!1;console.log(t.witenessForm),0==t.witenessEditStatus?t.genesisSetting.genesis_block_witnesses.push(t.witenessForm):t.genesisSetting.genesis_block_witnesses[t.currentWitenessEditInd]=t.witenessForm,console.log(t.genesisSetting,"genesisSetting");var r=t.genesisSetting.genesis_block_assets,n=t.genesisSetting.genesis_block_witnesses;n.forEach((function(e){e.url='"'.concat(e.url,'"')}));var o={assets:r,witness:n};console.log(o)}))},saveAllData:function(){var e=this,t={assets:this.genesisSetting.genesis_block_assets};Object(s["e"])(t).then((function(t){e.$emit("addSettingSuccess",!0),e.$message.success(e.$t("tronSettingGenesisSaveSuccess"))})).catch((function(e){console.log(e)}))}},watch:{detailInfoData:function(e){this.baseSettingForm=this.detailInfoData,this.genesisSetting=this.detailInfoData}}},d=c,m=(r("948c"),r("2877")),g=Object(m["a"])(d,n,o,!1,null,"0db0e339",null);t["a"]=g.exports},1:function(e,t){},"188b":function(e,t,r){},2:function(e,t){},"243a":function(e,t,r){"use strict";var n=r("6054"),o=r.n(n);o.a},"314c":function(e,t,r){"use strict";var n=r("93e9"),o=r.n(n);o.a},"3a28":function(e,t,r){"use strict";var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"viewBranchDialog"},[r("el-form",{ref:"crossSettingDialogForm",staticClass:"tronbaseSettingForm",attrs:{rules:e.branchRules,model:e.baseSettingForm,"label-width":"200px","label-position":"left"}},[r("el-row",{attrs:{gutter:12}},[r("el-col",{attrs:{span:24}},[r("el-card",{attrs:{shadow:"hover"}},[r("div",{on:{click:function(t){e.baseContentShow=!e.baseContentShow}}},[r("i",{class:e.baseContentShow?"el-icon-arrow-down":"el-icon-arrow-right"}),e._v("\n                        "+e._s(e.$t("tronSettingHttp"))+"\n                    ")]),e._v(" "),e.baseContentShow?r("div",[r("el-form-item",{staticClass:"baseFormItem mgt20",attrs:{label:"maxHttpConnectNumber",prop:"node_maxHttpConnectNumber"}},[r("el-input",{attrs:{maxlength:50,placeholder:e.$t("tronSettingPlaceholder")},model:{value:e.baseSettingForm.node_maxHttpConnectNumber,callback:function(t){e.$set(e.baseSettingForm,"node_maxHttpConnectNumber",t)},expression:"baseSettingForm.node_maxHttpConnectNumber"}})],1),e._v(" "),r("el-form-item",{staticClass:"baseFormItem",attrs:{label:"httpFullNodePort",prop:"node_http_fullNodePort"}},[r("el-input",{attrs:{maxlength:50,placeholder:e.$t("tronSettingPlaceholder")},model:{value:e.baseSettingForm.node_http_fullNodePort,callback:function(t){e.$set(e.baseSettingForm,"node_http_fullNodePort",t)},expression:"baseSettingForm.node_http_fullNodePort"}})],1),e._v(" "),r("el-form-item",{staticClass:"baseFormItem",attrs:{label:"httpSolidityPort",prop:"node_http_solidityPort"}},[r("el-input",{attrs:{maxlength:50,placeholder:e.$t("tronSettingPlaceholder")},model:{value:e.baseSettingForm.node_http_solidityPort,callback:function(t){e.$set(e.baseSettingForm,"node_http_solidityPort",t)},expression:"baseSettingForm.node_http_solidityPort"}})],1),e._v(" "),r("el-form-item",{staticClass:"baseFormItem",attrs:{label:"rpcPort",prop:"node_rpc_port"}},[r("el-input",{attrs:{maxlength:50,placeholder:e.$t("tronSettingPlaceholder")},model:{value:e.baseSettingForm.node_rpc_port,callback:function(t){e.$set(e.baseSettingForm,"node_rpc_port",t)},expression:"baseSettingForm.node_rpc_port"}})],1),e._v(" "),r("el-form-item",{staticClass:"baseFormItem",attrs:{label:"rpcSolidityPort",prop:"node_rpc_solidityPort"}},[r("el-input",{attrs:{maxlength:50,placeholder:e.$t("tronSettingPlaceholder")},model:{value:e.baseSettingForm.node_rpc_solidityPort,callback:function(t){e.$set(e.baseSettingForm,"node_rpc_solidityPort",t)},expression:"baseSettingForm.node_rpc_solidityPort"}})],1),e._v(" "),r("el-form-item",{staticClass:"baseFormItem",attrs:{label:"listenPort",prop:"node_listen_port"}},[r("el-input",{attrs:{maxlength:50,placeholder:e.$t("tronSettingPlaceholder")},model:{value:e.baseSettingForm.node_listen_port,callback:function(t){e.$set(e.baseSettingForm,"node_listen_port",t)},expression:"baseSettingForm.node_listen_port"}})],1)],1):e._e()])],1)],1),e._v(" "),r("el-form-item",{staticClass:"textRight",attrs:{"label-width":"0"}},[r("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.previousStepFun}},[e._v(e._s(e.$t("tronSettingPreviousStep")))]),e._v(" "),r("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(t){return e.saveData("crossSettingDialogForm")}}},[e._v(e._s(e.$t("tronSettingNextStep")))])],1)],1)],1)},o=[],s=r("93b6"),i=r("61f7"),a={name:"networkSetting",props:["detailInfoData"],data:function(){var e=this,t=function(t,r,n){Object(i["b"])(r)?n():n(new Error(e.$t("tronSettingNumberPlaceholder")))};return{baseContentShow:!0,baseSettingForm:{node_maxHttpConnectNumber:"",node_http_solidityPort:"",node_http_fullNodePort:"",node_rpc_port:"",node_rpc_solidityPort:"",listenPort:""},branchRules:{node_maxHttpConnectNumber:[{required:!0,message:this.$t("tronSettingPlaceholder"),trigger:"blur"},{message:this.$t("tronSettingNumberPlaceholder"),validator:t,trigger:"blur"}],node_http_fullNodePort:[{required:!0,message:this.$t("tronSettingPlaceholder"),trigger:"blur"},{message:this.$t("tronSettingNumberPlaceholder"),validator:t,trigger:"blur"}],node_http_solidityPort:[{required:!0,message:this.$t("tronSettingPlaceholder"),trigger:"blur"},{message:this.$t("tronSettingNumberPlaceholder"),validator:t,trigger:"blur"}],node_rpc_port:[{required:!0,message:this.$t("tronSettingPlaceholder"),trigger:"blur"},{message:this.$t("tronSettingNumberPlaceholder"),validator:t,trigger:"blur"}],node_rpc_solidityPort:[{required:!0,message:this.$t("tronSettingPlaceholder"),trigger:"blur"},{message:this.$t("tronSettingNumberPlaceholder"),validator:t,trigger:"blur"}],node_listen_port:[{required:!0,message:this.$t("tronSettingPlaceholder"),trigger:"blur"},{message:this.$t("tronSettingNumberPlaceholder"),validator:t,trigger:"blur"}]}}},methods:{previousStepFun:function(){this.$emit("previousSettingStep",!0)},saveData:function(e){var t=this;this.$refs[e].validate((function(e){if(!e)return console.log("error submit!!"),!1;var r={maxHttpConnectNumber:t.baseSettingForm.node_maxHttpConnectNumber,rpcPort:t.baseSettingForm.node_rpc_port,rpcSolidityPort:t.baseSettingForm.node_rpc_solidityPort,httpFullNodePort:t.baseSettingForm.node_http_fullNodePort,httpSolidityPort:t.baseSettingForm.node_http_solidityPort,listenPort:t.baseSettingForm.node_listen_port};Object(s["f"])(r).then((function(e){t.$emit("addSettingSuccess",!0),t.$message.success(t.$t("tronSettingNetworkSaveSuccess")),t.dialogVisible=!1})).catch((function(e){console.log(e)}))}))}},watch:{detailInfoData:function(e){this.baseSettingForm=this.detailInfoData}}},l=a,c=(r("a5a2"),r("2877")),d=Object(c["a"])(l,n,o,!1,null,"7a63d4d1",null);t["a"]=d.exports},6054:function(e,t,r){},"647c":function(e,t,r){},"855b":function(e,t,r){},"93e9":function(e,t,r){},"948c":function(e,t,r){"use strict";var n=r("188b"),o=r.n(n);o.a},"9e25":function(e,t,r){"use strict";var n=r("647c"),o=r.n(n);o.a},a5a2:function(e,t,r){"use strict";var n=r("855b"),o=r.n(n);o.a},a673:function(e,t,r){"use strict";var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"tronp2pSettingForm"},[r("el-form",{ref:"p2pSettingDialogForm",staticClass:"tronbaseSettingForm",attrs:{rules:e.p2pSettingRules,model:e.p2pSettingForm,"label-width":"250px","label-position":"left"}},[r("el-row",{attrs:{gutter:12}},[r("el-col",{attrs:{span:24}},[r("el-card",{attrs:{shadow:"hover"}},[r("div",{on:{click:function(t){e.baseContentShow=!e.baseContentShow}}},[r("i",{class:e.baseContentShow?"el-icon-arrow-down":"el-icon-arrow-right"}),e._v("\n                        "+e._s(e.$t("tronSettingP2p"))+"\n                    ")]),e._v(" "),e.baseContentShow?r("div",[r("el-form-item",{staticClass:"baseFormItem mgt20",attrs:{label:"p2pVersion",prop:"node_p2p_version"}},[r("el-input",{attrs:{maxlength:50,placeholder:e.$t("tronSettingPlaceholder")},model:{value:e.p2pSettingForm.node_p2p_version,callback:function(t){e.$set(e.p2pSettingForm,"node_p2p_version",t)},expression:"p2pSettingForm.node_p2p_version"}})],1),e._v(" "),r("el-form-item",{staticClass:"baseFormItem",attrs:{label:"maxActionNodes",prop:"node_maxActiveNodes"}},[r("el-input",{attrs:{maxlength:50,placeholder:e.$t("tronSettingPlaceholder")},model:{value:e.p2pSettingForm.node_maxActiveNodes,callback:function(t){e.$set(e.p2pSettingForm,"node_maxActiveNodes",t)},expression:"p2pSettingForm.node_maxActiveNodes"}})],1),e._v(" "),r("el-form-item",{staticClass:"baseFormItem",attrs:{label:"node_maxActiveNodesWithSameIp",prop:"node_maxActiveNodesWithSameIp"}},[r("el-input",{attrs:{maxlength:50,placeholder:e.$t("tronSettingPlaceholder")},model:{value:e.p2pSettingForm.node_maxActiveNodesWithSameIp,callback:function(t){e.$set(e.p2pSettingForm,"node_maxActiveNodesWithSameIp",t)},expression:"p2pSettingForm.node_maxActiveNodesWithSameIp"}})],1),e._v(" "),r("el-form-item",{staticClass:"baseFormItem",attrs:{label:"activeConnectFactor",prop:"node_activeConnectFactor"}},[r("el-input-number",{attrs:{"controls-position":"right",min:0,step:.1,maxlength:50,placeholder:e.$t("tronSettingPlaceholder")},model:{value:e.p2pSettingForm.node_activeConnectFactor,callback:function(t){e.$set(e.p2pSettingForm,"node_activeConnectFactor",t)},expression:"p2pSettingForm.node_activeConnectFactor"}})],1),e._v(" "),r("el-form-item",{staticClass:"baseFormItem",attrs:{label:"connectFactor",prop:"connectFactor"}},[r("el-input-number",{attrs:{"controls-position":"right",min:0,step:.1,maxlength:50,placeholder:e.$t("tronSettingPlaceholder")},model:{value:e.p2pSettingForm.connectFactor,callback:function(t){e.$set(e.p2pSettingForm,"connectFactor",t)},expression:"p2pSettingForm.connectFactor"}})],1),e._v(" "),r("el-form-item",{staticClass:"baseFormItem",attrs:{label:"seedNode",prop:"seedNode"}},[r("el-checkbox-group",{on:{change:e.checkBoxChangeFun},model:{value:e.p2pSettingForm.defalutSelectedIp,callback:function(t){e.$set(e.p2pSettingForm,"defalutSelectedIp",t)},expression:"p2pSettingForm.defalutSelectedIp"}},e._l(e.seedNodeIpList,(function(t,n){return r("el-checkbox",{key:n,staticClass:"checkBox",attrs:{label:t.ip}},[r("el-input",{attrs:{size:"small",placeholder:e.$t("tronSettingPortPlaceholder"),disabled:""},model:{value:t.port,callback:function(r){e.$set(t,"port",r)},expression:"item.port"}},[r("template",{staticStyle:{width:"100px"},slot:"prepend"},[e._v(e._s(t.ip))])],2)],1)})),1)],1)],1):e._e()])],1)],1),e._v(" "),r("el-form-item",{staticClass:"textRight",attrs:{"label-width":"0"}},[r("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.previousStepFun}},[e._v(e._s(e.$t("tronSettingPreviousStep")))]),e._v(" "),r("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(t){return e.saveData("p2pSettingDialogForm")}}},[e._v(e._s(e.$t("tronSettingNextStep")))])],1)],1)],1)},o=[],s=(r("8e6e"),r("456d"),r("4f7f"),r("5df3"),r("1c4c"),r("28a5"),r("ac6a"),r("bd86")),i=r("2f62"),a=r("93b6"),l=r("61f7");function c(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function d(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?c(r,!0).forEach((function(t){Object(s["a"])(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):c(r).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var m={name:"p2pSettingDialog",props:["detailInfoData","seedNodeIpList"],computed:d({},Object(i["b"])(["tronSetting"])),data:function(){var e=this,t=function(t,r,n){Object(l["b"])(r)?n():n(new Error(e.$t("tronSettingNumberPlaceholder")))};return{baseContentShow:!0,p2pSettingForm:{node_p2p_version:"",node_maxActiveNodes:"",node_maxActiveNodesWithSameIp:"",connectFactor:"",node_activeConnectFactor:""},checkedSeedNodeList:[],p2pSettingRules:{node_p2p_version:[{required:!0,message:this.$t("tronSettingPlaceholder"),trigger:"blur"},{message:this.$t("tronSettingNumberPlaceholder"),validator:t,trigger:"blur"}],node_maxActiveNodes:[{required:!0,message:this.$t("tronSettingPlaceholder"),trigger:"blur"},{message:this.$t("tronSettingNumberPlaceholder"),validator:t,trigger:"blur"}],node_maxActiveNodesWithSameIp:[{required:!0,message:this.$t("tronSettingPlaceholder"),trigger:"blur"},{message:this.$t("tronSettingNumberPlaceholder"),validator:t,trigger:"blur"}],node_activeConnectFactor:[{required:!0,message:this.$t("tronSettingPlaceholder"),trigger:"blur"}],connectFactor:[{required:!0,message:this.$t("tronSettingPlaceholder"),trigger:"blur"}]}}},methods:{previousStepFun:function(){this.$emit("previousSettingStep",!0)},checkBoxChangeFun:function(e){console.log(e),this.checkedSeedNodeList=e},saveData:function(e){var t=this;this.$refs[e].validate((function(e){if(!e)return console.log("error submit!!"),!1;var r={p2pVersion:t.p2pSettingForm.node_p2p_version,maxActiveNodes:t.p2pSettingForm.node_maxActiveNodes,nodeActiveConnectFactor:t.p2pSettingForm.node_activeConnectFactor,nodeMaxActiveNodesWithSameIp:t.p2pSettingForm.node_maxActiveNodesWithSameIp,connectFactor:t.p2pSettingForm.connectFactor},n=t.p2pSettingForm.seed_node_ip_list,o=[],s=[];n&&null!=n&&(n.forEach((function(e){s.push(e.split(":")[0])})),t.checkedSeedNodeList=Array.from(new Set(t.checkedSeedNodeList.concat(s)))),t.seedNodeIpList.forEach((function(e){t.checkedSeedNodeList.forEach((function(t){t==e.ip&&o.push(e)}))}));var i=[];o.forEach((function(e){i.push("".concat(e.ip,'":"').concat(e.port))})),Object(a["h"])(r,i).then((function(e){t.$emit("addSettingSuccess",!0),t.$message.success(t.$t("tronSettingp2pSaveSuccess"))})).catch((function(e){console.log(e)}))}))}},watch:{detailInfoData:function(e){this.p2pSettingForm=d({},this.detailInfoData),console.log(this.p2pSettingForm)}}},g=m,u=(r("243a"),r("2877")),p=Object(u["a"])(g,n,o,!1,null,"7eaa1adf",null);t["a"]=p.exports},c31b:function(e,t,r){"use strict";var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"viewBranchDialog"},[r("div",{staticClass:"tronp2pSettingForm"},[r("el-form",{ref:"dbSettingDialogForm",staticClass:"trondbSettingForm",attrs:{rules:e.dbSettingRules,model:e.dbSettingForm,"label-width":"250px","label-position":"left"}},[r("el-row",{attrs:{gutter:12}},[r("el-col",{attrs:{span:24}},[r("el-card",{attrs:{shadow:"hover"}},[r("div",{on:{click:function(t){e.baseContentShow=!e.baseContentShow}}},[r("i",{class:e.baseContentShow?"el-icon-arrow-down":"el-icon-arrow-right"}),e._v("\n                            "+e._s(e.$t("tronSettingDb"))+"\n                        ")]),e._v(" "),e.baseContentShow?r("div",[r("el-form-item",{staticClass:"mgt20",attrs:{label:e.$t("tronSettingwriteSynchronously"),prop:"storage_db_sync"}},[r("el-switch",{model:{value:e.dbSettingForm.storage_db_sync,callback:function(t){e.$set(e.dbSettingForm,"storage_db_sync",t)},expression:"dbSettingForm.storage_db_sync"}})],1),e._v(" "),r("el-form-item",{attrs:{label:e.$t("tronSettingOpenTransaction"),prop:"storage_transHistory_switch"}},[r("el-switch",{attrs:{"active-value":"on","inactive-value":"off"},model:{value:e.dbSettingForm.storage_transHistory_switch,callback:function(t){e.$set(e.dbSettingForm,"storage_transHistory_switch",t)},expression:"dbSettingForm.storage_transHistory_switch"}})],1),e._v(" "),r("el-form-item",{attrs:{label:e.$t("tronSelectDatabaseConfiguration"),prop:"storage_db_engine"}},[r("el-radio-group",{model:{value:e.dbSettingForm.storage_db_engine,callback:function(t){e.$set(e.dbSettingForm,"storage_db_engine",t)},expression:"dbSettingForm.storage_db_engine"}},[r("el-radio",{attrs:{label:"LEVELDB"}},[e._v("leveldb")]),e._v(" "),r("el-radio",{attrs:{label:"ROCKSDB"}},[e._v("rocksdb")])],1)],1),e._v(" "),r("el-form-item",{attrs:{label:e.$t("tronSettingIndexDirectory"),prop:"storage_index_directory"}},[r("el-switch",{attrs:{"active-value":"index"},model:{value:e.dbSettingForm.storage_index_directory,callback:function(t){e.$set(e.dbSettingForm,"storage_index_directory",t)},expression:"dbSettingForm.storage_index_directory"}})],1),e._v(" "),r("el-form-item",{attrs:{label:e.$t("tronSettingNeedToUpdateAsset"),prop:"storage_needToUpdateAsset"}},[r("el-switch",{model:{value:e.dbSettingForm.storage_needToUpdateAsset,callback:function(t){e.$set(e.dbSettingForm,"storage_needToUpdateAsset",t)},expression:"dbSettingForm.storage_needToUpdateAsset"}})],1)],1):e._e()])],1)],1),e._v(" "),r("el-form-item",{staticClass:"textRight",attrs:{"label-width":"0"}},[r("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.previousStepFun}},[e._v(e._s(e.$t("tronSettingPreviousStep")))]),e._v(" "),r("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(t){return e.saveData("dbSettingDialogForm")}}},[e._v(e._s(e.$t("tronSettingNextStep")))])],1)],1)],1)])},o=[],s=r("93b6"),i={name:"dbetting",props:["detailInfoData"],data:function(){return{baseContentShow:!0,dbSettingForm:{},radioVal:0,dbSettingRules:{storage_db_sync:[{required:!0,message:this.$t("tronSettingPlaceholder"),trigger:"change"}],storage_transHistory_switch:{required:!0,message:this.$t("tronSettingPlaceholder"),trigger:"change"},storage_db_engine:{required:!0,message:this.$t("tronSettingPlaceholder"),trigger:"change"},storage_index_directory:{required:!0,message:this.$t("tronSettingPlaceholder"),trigger:"change"},storage_needToUpdateAsset:{required:!0,message:this.$t("tronSettingPlaceholder"),trigger:"change"}}}},methods:{previousStepFun:function(){this.$emit("previousSettingStep",!0)},saveData:function(e){var t=this;this.$refs[e].validate((function(e){if(!e)return console.log("error submit!!"),!1;var r={isDBSync:t.dbSettingForm.storage_db_sync,isOpenTransaction:t.dbSettingForm.storage_transHistory_switch,dbEnine:t.dbSettingForm.storage_db_engine,indexDirectory:t.dbSettingForm.storage_index_directory,needToUpdateAsset:t.dbSettingForm.storage_needToUpdateAsset};Object(s["d"])(r).then((function(e){t.$emit("addSettingSuccess",!0),t.$message.success(t.$t("tronSettingDBSaveSuccess"))})).catch((function(e){console.log(e)}))}))}},watch:{detailInfoData:function(e){this.dbSettingForm=this.detailInfoData}}},a=i,l=(r("9e25"),r("2877")),c=Object(l["a"])(a,n,o,!1,null,"ac5cd336",null);t["a"]=c.exports},d1ba:function(e,t,r){},e2d6:function(e,t,r){"use strict";var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"viewBranchDialog"},[r("el-form",{ref:"baseSettingDialogForm",staticClass:"tronbaseSettingForm",attrs:{rules:e.branchRules,model:e.baseSettingForm,"label-width":"230px","label-position":"left"}},[r("el-row",{attrs:{gutter:12}},[r("el-col",{attrs:{span:24}},[r("el-card",{attrs:{shadow:"hover"}},[r("div",{on:{click:function(t){e.baseContentShow=!e.baseContentShow}}},[r("i",{class:e.baseContentShow?"el-icon-arrow-down":"el-icon-arrow-right"}),e._v("\n                        "+e._s(e.$t("tronSettingBase"))+"\n                    ")]),e._v(" "),e.baseContentShow?r("div",[r("el-form-item",{staticClass:"baseFormItem mgt20",attrs:{label:"chainId",prop:"chainId"}},[r("el-input",{attrs:{maxlength:50,placeholder:e.$t("tronSettingPlaceholder")},model:{value:e.baseSettingForm.chainId,callback:function(t){e.$set(e.baseSettingForm,"chainId",t)},expression:"baseSettingForm.chainId"}})],1),e._v(" "),r("el-form-item",{staticClass:"baseFormItem",attrs:{label:"chainName",prop:"chainName"}},[r("el-input",{attrs:{maxlength:50,placeholder:e.$t("tronSettingPlaceholder")},model:{value:e.baseSettingForm.chainName,callback:function(t){e.$set(e.baseSettingForm,"chainName",t)},expression:"baseSettingForm.chainName"}})],1),e._v(" "),r("el-form-item",{staticClass:"baseFormItem",attrs:{label:"blockProducedTimeOut",prop:"block_proposalExpireTime"}},[r("el-input",{attrs:{maxlength:50,placeholder:e.$t("tronSettingPlaceholder")},model:{value:e.baseSettingForm.block_proposalExpireTime,callback:function(t){e.$set(e.baseSettingForm,"block_proposalExpireTime",t)},expression:"baseSettingForm.block_proposalExpireTime"}})],1),e._v(" "),r("el-form-item",{staticClass:"baseFormItem",attrs:{label:"blockMaintenanceTimeInterval",prop:"block_maintenanceTimeInterval"}},[r("el-input",{attrs:{maxlength:50,placeholder:e.$t("tronSettingPlaceholder")},model:{value:e.baseSettingForm.block_maintenanceTimeInterval,callback:function(t){e.$set(e.baseSettingForm,"block_maintenanceTimeInterval",t)},expression:"baseSettingForm.block_maintenanceTimeInterval"}})],1),e._v(" "),r("el-form-item",{staticClass:"baseFormItem",attrs:{label:"nodeBlockProducedTimeOut",prop:"node_blockProducedTimeOut"}},[r("el-input",{attrs:{maxlength:50,placeholder:e.$t("tronSettingPlaceholder")},model:{value:e.baseSettingForm.node_blockProducedTimeOut,callback:function(t){e.$set(e.baseSettingForm,"node_blockProducedTimeOut",t)},expression:"baseSettingForm.node_blockProducedTimeOut"}})],1),e._v(" "),r("el-form-item",{staticClass:"baseFormItem",attrs:{label:"nodeMinParticipationRate",prop:"node_minParticipationRate"}},[r("el-input",{attrs:{maxlength:50,placeholder:e.$t("tronSettingPlaceholder")},model:{value:e.baseSettingForm.node_minParticipationRate,callback:function(t){e.$set(e.baseSettingForm,"node_minParticipationRate",t)},expression:"baseSettingForm.node_minParticipationRate"}})],1)],1):e._e()])],1)],1),e._v(" "),r("el-form-item",{staticClass:"textRight",attrs:{"label-width":"0"}},[r("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.previousStepFun}},[e._v(e._s(e.$t("tronSettingPreviousStep")))]),e._v(" "),r("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(t){return e.saveData("baseSettingDialogForm")}}},[e._v(e._s(e.$t("tronSettingNextStep")))])],1)],1)],1)},o=[],s=r("93b6"),i=r("61f7"),a={name:"baseSetting",props:["detailInfoData","editStatus"],data:function(){var e=this,t=function(t,r,n){Object(i["b"])(r)?n():n(new Error(e.$t("tronSettingNumberPlaceholder")))};return{classLoading:!1,baseSettingForm:{},baseContentShow:!0,branchRules:{chainId:[{required:!0,message:this.$t("tronSettingPlaceholder"),trigger:"blur"},{message:this.$t("tronSettingNumberPlaceholder"),validator:t,trigger:"blur"}],chainName:[{required:!0,message:this.$t("tronSettingPlaceholder"),trigger:"blur"}],block_proposalExpireTime:[{required:!0,message:this.$t("tronSettingPlaceholder"),trigger:"blur"},{message:this.$t("tronSettingNumberPlaceholder"),validator:t,trigger:"blur"}],block_maintenanceTimeInterval:[{required:!0,message:this.$t("tronSettingPlaceholder"),trigger:"blur"},{message:this.$t("tronSettingNumberPlaceholder"),validator:t,trigger:"blur"}],node_blockProducedTimeOut:[{required:!0,message:this.$t("tronSettingPlaceholder"),trigger:"blur"},{message:this.$t("tronSettingNumberPlaceholder"),validator:t,trigger:"blur"}],node_minParticipationRate:[{required:!0,message:this.$t("tronSettingPlaceholder"),trigger:"blur"},{message:this.$t("tronSettingNumberPlaceholder"),validator:t,trigger:"blur"}]}}},methods:{previousStepFun:function(){this.$emit("previousSettingStep",!0)},saveData:function(e){var t=this;this.$refs[e].validate((function(e){if(!e)return console.log("error submit!!"),!1;console.log(t.baseSettingForm);var r={chainId:t.baseSettingForm.chainId,chainName:t.baseSettingForm.chainName,blockProducedTimeOut:t.baseSettingForm.node_blockProducedTimeOut,maintenanceTimeInterval:t.baseSettingForm.block_maintenanceTimeInterval,proposalExpireTime:t.baseSettingForm.block_proposalExpireTime,minParticipationRate:t.baseSettingForm.node_minParticipationRate};Object(s["a"])(r).then((function(e){t.$emit("addSettingSuccess",!0),t.$message.success(t.$t("tronSettingBaseSaveSuccess"))})).catch((function(e){console.log(e)}))}))}},watch:{detailInfoData:function(e){this.baseSettingForm=this.detailInfoData}}},l=a,c=(r("f4bc"),r("2877")),d=Object(c["a"])(l,n,o,!1,null,"3c972562",null);t["a"]=d.exports},eae2:function(e,t,r){"use strict";var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"viewBranchDialog"},[r("el-form",{ref:"crossSettingDialogForm",staticClass:"tronbaseSettingForm",attrs:{rules:e.branchRules,model:e.baseSettingForm,"label-width":"200px","label-position":"left"}},[r("el-row",{attrs:{gutter:12}},[r("el-col",{attrs:{span:24}},[r("el-card",{attrs:{shadow:"hover"}},[r("div",{on:{click:function(t){e.baseContentShow=!e.baseContentShow}}},[r("i",{class:e.baseContentShow?"el-icon-arrow-down":"el-icon-arrow-right"}),e._v("\n                        "+e._s(e.$t("tronSettingP2p"))+"\n                    ")]),e._v(" "),e.baseContentShow?r("div",[r("el-form-item",{staticClass:"baseFormItem mgt20",attrs:{label:"enableCrossChain",prop:"enableCrossChain"}},[r("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#ff4949"},model:{value:e.baseSettingForm.enableCrossChain,callback:function(t){e.$set(e.baseSettingForm,"enableCrossChain",t)},expression:"baseSettingForm.enableCrossChain"}})],1),e._v(" "),r("el-form-item",{staticClass:"baseFormItem",attrs:{label:"maxValidatorNumber",prop:"maxValidatorNumber"}},[r("el-input",{attrs:{maxlength:50,placeholder:e.$t("tronSettingPlaceholder")},model:{value:e.baseSettingForm.maxValidatorNumber,callback:function(t){e.$set(e.baseSettingForm,"maxValidatorNumber",t)},expression:"baseSettingForm.maxValidatorNumber"}})],1),e._v(" "),r("el-form-item",{staticClass:"baseFormItem",attrs:{label:"minValidatorNumber",prop:"minValidatorNumber"}},[r("el-input",{attrs:{maxlength:50,placeholder:e.$t("tronSettingPlaceholder")},model:{value:e.baseSettingForm.minValidatorNumber,callback:function(t){e.$set(e.baseSettingForm,"minValidatorNumber",t)},expression:"baseSettingForm.minValidatorNumber"}})],1),e._v(" "),r("el-form-item",{staticClass:"baseFormItem",attrs:{label:"crossChainFee",prop:"crossChainFee"}},[r("el-input-number",{attrs:{"controls-position":"right",min:0,step:.01,maxlength:50,placeholder:e.$t("tronSettingPlaceholder")},model:{value:e.baseSettingForm.crossChainFee,callback:function(t){e.$set(e.baseSettingForm,"crossChainFee",t)},expression:"baseSettingForm.crossChainFee"}})],1)],1):e._e()])],1)],1),e._v(" "),r("el-form-item",{staticClass:"textRight",attrs:{"label-width":"0"}},[r("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.previousStepFun}},[e._v(e._s(e.$t("tronSettingPreviousStep")))]),e._v(" "),r("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(t){return e.saveData("crossSettingDialogForm")}}},[e._v(e._s(e.$t("tronSettingNextStep")))])],1)],1)],1)},o=[],s=r("93b6"),i=r("61f7"),a={name:"corssChain",props:["detailInfoData"],data:function(){var e=this,t=function(t,r,n){Object(i["b"])(r)?n():n(new Error(e.$t("tronSettingNumberPlaceholder")))},r=function(t,r,n){Object(i["c"])(r)?n():n(new Error(e.$t("validTwoDecimal")))};return{baseContentShow:!0,baseSettingForm:{},branchRules:{enableCrossChain:[{required:!0,message:this.$t("tronSettingPlaceholder"),trigger:"change"}],maxValidatorNumber:[{required:!0,message:this.$t("tronSettingPlaceholder"),trigger:"change"},{message:this.$t("tronSettingNumberPlaceholder"),validator:t,trigger:"blur"}],minValidatorNumber:[{required:!0,message:this.$t("tronSettingPlaceholder"),trigger:"change"},{message:this.$t("tronSettingNumberPlaceholder"),validator:t,trigger:"blur"}],crossChainFee:[{required:!0,message:this.$t("tronSettingPlaceholder"),trigger:"change"},{message:this.$t("tronSettingNumberTwoDecimal"),validator:r,trigger:"blur"}]}}},methods:{previousStepFun:function(){this.$emit("previousSettingStep",!0)},saveData:function(e){var t=this;this.$refs[e].validate((function(e){if(!e)return console.log("error submit!!"),!1;Object(s["c"])(t.baseSettingForm).then((function(e){t.$emit("addSettingSuccess",!0),t.$message.success(t.$t("tronSettingCrossChainSaveSuccess")),t.$router.push({path:"/plugin/list"})})).catch((function(e){console.log(e)}))}))}},watch:{detailInfoData:function(e){this.baseSettingForm=this.detailInfoData}}},l=a,c=(r("314c"),r("2877")),d=Object(c["a"])(l,n,o,!1,null,"e77d9e86",null);t["a"]=d.exports},f4bc:function(e,t,r){"use strict";var n=r("d1ba"),o=r.n(n);o.a}}]);