

function JVoucher()
{
	var _This = this;
	var _Voucher = undefined; 
	var _MID = 0;
	var _VoucherType = 0; 
	var _VoucherTitle = '';
	var _Route = '';
 
	var _AuthRoot = '';
	var _MainToolbar = '_mainToolbar';
	var _MainToolbar_tb = '_mainToolbar_tb';
	var _MainLayout = '_mainLayout';
	var _MainTab = '_mainTab';
	var _MainGrid = '_mainGrid';
	var _QueryDlg = '_queryDlg';

	var _VForm = null;
 	var _VGrids = null;  
 	var _VLayout = null;
 	var _ToolBar = null;


	this.parent_JVoucher = function (){ 	return _This; 	}
	this.super = function(method, _this, larguments){	return method.apply(_this, larguments);	}
	this.voucher = function(){	return _Voucher;	}
	this.mid = function (){	return _MID;	}
	this.voucherTitle = function (){	return _VoucherTitle;	}
	this.route = function (){		return _Route; 	}
	this.calss = function (){	 	return   'JVoucher'	;	}
	this.log = function(str){		console.log(this.voucher().calss()+': '+str);	}
	this.info = function(obj){		console.info(obj);	}
	this.vgrids = function() { return _VGrids; }



	String.format = function(str) {
	var args = arguments, re = new RegExp("%([1-" + args.length + "])", "g");
	return String(str).replace(
		re,
		function($1, $2) {
			return args[$2];
		}
		);
	};



	this.isNull = function(o, def){
			if (o == null || o == undefined || o == '') 
				return def;
			return o;
	}

	 

	this.mainGridView = function (){ 
		if (_VGrids.vMainGrid() == null || _VGrids.vMainGrid().grid() == null) return null;

		return _VGrids.vMainGrid().grid(); 
	} 
	this.queryDlgView = function (){ return $('#'+_QueryDlg); } 
	


	this.parserColumn = function (define, col){
		//do subClass	 		
		var dataopts = 'data-options="field:\'ck\',checkbox:true"';	 
		return dataopts;		
	}


	function ColumnItem(define, tr, col, dataopts){
		var _info = col;
		var _dataopts = dataopts;

		var _column = '';
		if (col == null) 
			_column = $('<th '+dataopts+'> </th>');
		else
		  	_column = $('<th '+dataopts+'>'+col.cCaption+'</th>');
		
 
 		this.info =  function (){	return _info;	}
 		this.column = function (){	return _column;	}
 		this.dataopts = function() {	return _dataopts; }

	    $(tr).append(_column);
	}

	this.parserGridOpts = function (define){
		//do subClass	 
 		var dataopts = 	"data-options=\"fit:true,pageList: [50,80,100,500,1000],pageSize: 50,"+
						"pagination: true,pagePosition: 'bottom',rownumbers: true,"+
						"selectOnCheck: false,checkOnSelect: false,singleSelect: true,"+
						"showFooter: true,method:'get',lasturl: 'NULL',url:'',\"";

		  
		return dataopts;		
	}

	function VGridItem(define, cols){
		//tid, id, cDescription, cView, cTable, iIndex
		//cTabJson={"tabKey":"id", "mainTabKey":"", "foreignKey":""}

		var _TID = define.tid;
		var ID = define.id;
		var _Columns = new Array();
		var _Grid = _createGrid(define, cols);
		var _cTitle = define.cDescription;	
		var _VIndex = define.iIndex;	 
		var _TabJson = _parseTabJson(define.cTabJson);
		
 
		this.vindex = function(index) {	if (index >-1 )  _VIndex = index; 	return _VIndex;}		
		this.tabKey = function(){	return _TabJson['tabKey'];	}
		this.mainTabKey = function(){	return _TabJson['mainTabKey'];	}		
		this.foreignKey = function(){	return _TabJson['foreignKey'];	}		
		this.tid = function (){ return _TID; }
		this.title = function (){ return _cTitle; }
		this.grid = function (){ return _Grid; }
		this.columns = function (){ return _Columns; }
		this.columnCount = function (){ return _Columns.length; }

		function _parseTabJson(json){	
			return JSON.parse(_This.isNull(json, '{"null": null}'));	
		}

		


		function _createGrid(define, cols){			
			var grid = $('<table class="easyui-datagrid"  '+_Voucher.parserGridOpts(define)+'   style="width:100%;height:300px"> </table>');	
			var tr = $('<tr> </tr>');			
			$(grid).append($('<thead></thead>').append(tr));

			var colOpts = _This.parserColumn(define, null);
			var column = new ColumnItem(define, tr, null, colOpts);		 														
			_Columns.push(column);		

			_This.info(define);
			_This.log('cols.length == '+cols.length+', tid=='+define.tid);

			for (var i = 0; i < cols.length; i++) {			
				if (cols[i].tid == define.tid) {	
					colOpts = _Voucher.parserColumn(define, cols[i]);
					column = new ColumnItem(define, tr, cols[i], colOpts);		 														
					_Columns.push(column);		
				}
			}	
			$(grid).attr('id',  _MainGrid+define.tid);	
			$(grid).attr('TID', define.tid);	
			return grid; 					 			 		 			 						
		}

	}



	function VGrids(data){
		var _VGridItems = new Array();

		this.vMainGrid = function (){
			if (_VGridItems.length == 0) return null;

			var item = _VGridItems[0];			 
			return item;
		}
		this.vGridItems = function(iIndex){ 
			if (_VGridItems.length == 0) return null;

			return _VGridItems[iIndex]; 
		}

		this.vGridCount = function(){	return _VGridItems.length; }

		

		for(var i = 0; i < data.defines.length; i++){
			var define = data.defines[i];	
			var gridItem = null;			
			// iType 1=QueryFormDefine;2=TreeQueryFormDefine;3=EditFormDefine;4=TreeEditFormDefine;5=ListEditFormDefine
			//_This.info(define);

			switch(parseInt(define.iType)){
				case 1:  //gridItem = new VGridItem(define, data.cols); break; 
				case 5:  gridItem = new VGridItem(define, data.cols); break;
				case 2:  //if(define.iIndex > 1) { gridItem = new VGridItem(define, data.cols);} break;				
				case 3:  //if(define.iIndex > 1) { gridItem = new VGridItem(define, data.cols);} break;		
				case 4:  if(define.iIndex > 1) { gridItem = new VGridItem(define, data.cols);} break;						
				default:  _Voucher.log('Undefined form type:  '+define.iType);
			}			 

			if (gridItem != null){
				_VGridItems.push(gridItem);
				var VIndex = _VGridItems.length-1;
				gridItem.vindex(VIndex);
				$(gridItem.grid()).attr('VIndex', VIndex);	
			}			
				

		} //for j


		_Voucher.log('VGrids.length='+_VGridItems.length);
	}

	this.parserFormInputOpts = function (define, col){
		//do subClass	 	
		var dataopts = 'data-options="editable:true,"';
		return dataopts;		
	}

	this.formMakeInput = function(col, _class, opts){
		//%4 =data-options
		var t = '<input class="%1"  id="m_%2" name="%3"  %4  style="%5;cursor:pointer">';
	 	var tinput = String.format(t, _class, col.cFieldName, col.cFieldName, opts, isNull(col.iWidth, 100));
	 	return $(tinput);
	}

	function FormInput(define, col, dataopts){
		var _info = col;
		var _dataopts = dataopts;		 
		var _type = 'easyui-textbox';

		switch(col.cDType){			
			case 'combv':
			case 'combu': _type = 'easyui-combobox'; break;
			case 'int':
			case 'float': _type = 'easyui-numberbox'; break;
			case 'dtime': _type = 'easyui-datetimebox'; break;
			case 'date':  _type = 'easyui-datebox'; break;
			case 'checkbox':  _type = 'checkbox'; break;
			case 'textBtn':  
			default: _type = 'easyui-textbox';
		}


	 
		var _input = _Voucher.formMakeInput(col, _type, dataopts);
		var _color = '#000;';
		if (col.required ) color = 'red;';

		var _span = '<span style="color: %1">%2</span>';
		var _div = $('<div style="top:80px;left:10px;width:250px;height:35px; position: absolute;"></div>');	
		//_This.log('title='+col.cTitle);
 
		var _title = $(String.format(_span, _color, col.cTitle));

		$(_div).append(_title);
		$(_div).append(_input);		
		
		this.drag =  function (){	return _div; 	}
 		this.class = function (){	return _type; 	}
 		this.info =  function (){	return _info;	}
 		this.input = function (){	return _input;	}
 		this.dataopts = function() {	return _dataopts; }	    
	}


	function VForms(data){		 
		var _VFormItems = new Array();
		var _VForm = null;
		var _define = null;

		this.VForm = function(){	return _VForm;	}
		this.VFormItemCount = function(){	return _VFormItems.length; }
		this.VFormItems = function(iIndex){ 
			if (_VFormItems.length == 0) return null;
			return _VFormItems[iIndex]; 
		}

		

		for(var i = 0; i < data.defines.length; i++){
			var _define = data.defines[i];	
			var formItem = null;						 
			if (_define.iIndex == 1 && (_define.iType == 3 || _define.iType == 4))
			    _VForm = _fromItems(_define, data.cols);		 					

		} //for i


		function _fromItems(_define, cols){
			var form = $('<form method="post"> </form>');
			$(form).attr('id', 'mainform');
			$(form).attr('name', 'mainform');

			for (var i = 0; i < cols.length; i++) {			
				if (cols[i].tid == _define.tid) {	
					colOpts = _Voucher.parserFormInputOpts(_define, cols[i]);
					_input = new FormInput(_define, cols[i], colOpts);	
					$(form).append(_input.drag());	 														
					_VFormItems.push(_input);		
				}
			}	

			return form;
		}

		_Voucher.log('VFormItems.length='+_VFormItems.length);
	}




	function VLayout(){
		var _Layout = $('<div class="easyui-layout" title="" style="width:100%;height:100px;" data-options="fit:true"> </div>');		
		var _Maintab = $('<div data-options="region:\'center\', noheader: true, cache: true," title=""></div>');	
		var _MainToolbar = $('<div data-options="region:\'north\'" style="height:50px"></div>');	
		  

		this.vmainLayout = function (){	return _Layout;	}
		this.vmianTab = function (){	return _Maintab;	}
		this.vmianToolbar = function (){	return _MainToolbar;	}


		$(document.body).append(_Layout);
		$(_Layout).append(_MainToolbar);  
		$(_Layout).append(_Maintab); 
		$(_Layout).attr('id',_MainLayout);		
		$(_Maintab).attr('id',_MainTab);	
	}


	function ToolBar(layout){
		var _buttons = new Array();
		var _toolBar = $('<div id="'+_MainToolbar+'" style="padding:0px 15px;"> </div>');				 
		var table = $('<table id="'+_MainToolbar_tb+'" border=0 cellpadding="0" cellspacing="0"></table>');	
		var tr = $('<tr></tr>');

		$(layout.vmianToolbar()).append(_toolBar);
		$(_toolBar).append(table);		
		$(table).append(tr);



		this.toolbar = function(){	return _toolBar; }
		this.buttons = function (index){	return _buttons[index];	 	}
		this.buttonCount = function(){	return _buttons.length; }

		this.append = function (id, title, icon, event){
			var button = $('<a class="easyui-linkbutton" id="_btn'+id+'" iconAlign="top" iconCls="icon-'+icon+'" plain="true" >'+title+'</a>');
			var td = $('<td></td>');
			$(tr).append(td).append(button);
			$(tr).append($('<td><div class="btn-separator"></div></td>'));
			$(button).bind('click', event);

			_buttons.push(button);
			return button;
		}	 
	}


	this.gridUrl = function(t){
		return this.route() + '/voucherQuerylist/q?mid='+this.mid();
	}

	this.loadOptions = function (){
		//do subclasss
	}

	this.parserLayout = function (layout, vform, vgrids){
		//do subclass		 
	}
	
	this.parserToolBar = function(toolbar){
		//do subclass	
	}

	this.parserVoucher = function (){
		$.parser.parse(document.body); 
		_Voucher.loadOptions();
	}


	this.run = function(ov, mid, route){
		_Voucher = ov;
		_MID = mid;
		_Route = route;
		  
		$(window).load(function(){    						 
			_This.log('run... mid='+_MID);

		 	_loadModule();  		
		});  

	}

	function _loadModule(){
		_This.log('_loadModule....');
		var url = _Route+'/defines/q?id='+_MID;
	 	$.get(url, 			 	 
	 		function (data) {	 			
	 			if (data.success){	
	 				 _VoucherType = data.iTmpType;
	 				 _VoucherTitle = data.cMTitle;

	 				_createQueryDlg();
	 				 
	 				 
	 				_VForm = new VForms(data);	 		 
					_VGrids = new VGrids(data);

					_VLayout = new VLayout();
					_ToolBar = new ToolBar(_VLayout);


					_Voucher.parserLayout(_VLayout, _VForm, _VGrids);
					_Voucher.parserToolBar(_ToolBar);
	 				_Voucher.parserVoucher();
	 		 			 			 		 			 				 					
	 			} else{	 				
	 				_VLayout = new VLayout();
      				_VLayout.vmianTab().append('<div>'+json2str(data)+'</div>');

      				$.parser.parse(document.body);
	 			}		

      		}, 
      		"json"
      		).error(function (msg) {
      				_VLayout = new VLayout();
      				_VLayout.vmianTab().append('<div>'+json2str(msg)+'</div>');
      				$.parser.parse(document.body);
      			             
      			});  	
	}



	function valueReplace(v){
 	     v=v.toString().replace(new RegExp('(["\"])', 'g'),"\\\"");
 	    return v;
 	}


 	this.json2str = function(o) { 
		var arr = []; 
		var fmt = function(s) { 
			if (typeof s == 'object' && s != null) return json2str(s); 
			return /^(string|number)$/.test(typeof s) ? '"' + valueReplace(s) + '"' : s; 
		} 
		
		for (var i in o) 
			arr.push('"' + i + '":' + fmt(o[i])); 
			
		return '{' + arr.join(',') + '}'; 
	} 



	function _createQueryDlg(){
		var url = _Route+ "/queryDefs/q?mid=-1";

		var queryDlg = $('<div class="easyui-dialog" title="Find" style="width:450px;height:300px;"'+
       		 			 ' data-options="iconCls:\'icon-find\', resizable:true, modal:false,  closed: true, href: \''+url+'\', ">Loading...</div>');

		$(document.body).append(queryDlg);   
		$(queryDlg).attr('id', _QueryDlg);

	}

	this.dbExport = function (){
		alert(this.text);
		 
	}

	this.dbApped =  function (){
		alert(this.text);
	}


	this.dbEdit = function (){
		alert(this.text);
	}

	this.dbDelete = function (){
		alert(this.text);
	}

	this.dbFind = function (){		 
        	var text = this.text;
        	var url = _Route + '/queryDlgDef/q?mid='+_MID;

			$("#"+_QueryDlg).show().dialog({
                  title :  text,
                  fit:false,
                  modal : false,							                    
                  href: url,
          	});
     				                       	
      		$('#'+_QueryDlg).dialog('open');	
	}

	this.dbReload = function (){
		alert(this.text);
	}


	this.dbEColumns = function (){
		alert(this.text);
	}

	this.vdHelp = function (){
		alert(this.text);
	}

	this.vdClosed = function (){
		alert(this.text);
	}

	this.vdClosed = function (){
		alert(this.text);
	}

	
}


