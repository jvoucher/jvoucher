

function JVoucherQuery()
{
	var _This = this;
	var _parserLayout = this.parserLayout;	
	var _loadOptions = this.loadOptions;


	this.parent_JVoucherQuery = function (){	return _This;	}
	this.calss = function (){	 	return  'JVoucherQuery'	;	}


	this.parserToolBar = function(toolbar){
		// (id, title, icon, event)
		toolbar.append('export', 'Export', 'export', _This.dbExport);
		toolbar.append('add', 'Add', 'add', _This.dbApped);
		toolbar.append('edit', 'Edit', 'edit', _This.dbEdit);
		toolbar.append('find', 'Find', 'find', _This.dbFind);
		toolbar.append('reload', 'Reload', 'reload', _This.dbReload);
		toolbar.append('eColumn', 'Columns', 'addline', _This.dbEColumns);
		toolbar.append('help', 'Help', 'help', _This.vdHelp);
		toolbar.append('closed', 'Close', 'back', _This.vdClosed); 
	}


	this.loadOptions = function (){
		this.super(_loadOptions, this, arguments);

		if (this.mainGridView() != null){
			this.mainGridView().datagrid('options').onDblClickRow = _This.OnMainGridDblClickRow;
	 		this.mainGridView().datagrid('options').onClickRow = _This.OnMainGridClickRow; 	
			this.mainGridView().datagrid('options').url = this.gridUrl(this.mainGridView());	 	 	
	 		this.mainGridView().datagrid('reload');
		} else{
			this.log('this.mainGridView()==null');
		}
	}


		

	this.parserLayout = function (layout, vform, vgrids){
		this.super(_parserLayout, this, arguments);

		if (vgrids.vGridCount() < 2 ){ 
			if (vgrids.vMainGrid() == null || vgrids.vMainGrid().grid() == null) 
				$(layout.vmianTab()).append($('<p>1.Not define main table imtem.</p>'));
			else
				$(layout.vmianTab()).append(vgrids.vMainGrid().grid()); //only one main table
		} else 
		{
			//muti-table layout
			var mainTab_Layout = $('<div id="_mainTab_Layout" class="easyui-layout" title=""  style="width:100%;height:100px;" data-options="fit:true"> </div>');
			$(layout.vmianTab()).append(mainTab_Layout);

			var vMainGrid_Panel = $('<div id="_vMainGrid_Panel" data-options="region:\'center\', noheader: true, border: false,"> </div>');
			$(mainTab_Layout).append(vMainGrid_Panel);  

			if (vgrids.vMainGrid() == null || vgrids.vMainGrid().grid() == null) 
				$(vMainGrid_Panel).append($('<p>2.Not define main table imtem..</p>'));
			else
				$(vMainGrid_Panel).append(vgrids.vMainGrid().grid());//only one main table

			var subTabs_Panel = $('<div id="_subTabs_Panel" data-options="region:\'south\', split:true,	noheader: true, border: false," title="子明细列表"> </div>');
			var subTabs = $('<div id="_subTabs" class="easyui-tabs" style="width:300px;height:250px"  data-options="noheader: false, fit: true,"> </div>');
			
			$(mainTab_Layout).append(subTabs_Panel);
			$(subTabs_Panel).append(subTabs);

			for (var i = 1; i < vgrids.vGridCount(); i++){				
				var gridItem = vgrids.vGridItems(i);
				var subTab = $('<div title="'+gridItem.title()+'"  style="padding:5px"  data-options="closable:false, border: false,">') ;

				$(subTab).append(gridItem.grid()); 
				$(subTabs).append(subTab);
			}
				
		}
	}




	this.parserColumn = function (vouch, col){ 
		var  cColJson = JSON.parse(this.isNull(col.cColJson, '{"null": null}'));	 
		var  cDisplyFormat = this.isNull(cColJson['formatter'], 'defaultFormat'); 

		var  editable = this.isNull(cColJson['editable'], 'false');   
		var  required = this.isNull(cColJson['required'], 'false');    
		var  cColName = col.cColName;
		var  iWidth =  this.isNull(col.iWidth, 100);

		switch(col.cUIName){			
			case 'combv':
			case 'combu': cDisplyFormat = 'defaultFormat'; break;
			case 'int':
			case 'numbox':
			case 'float': cDisplyFormat = this.isNull(col.cDisplyFormat, 'defaultFormat');  break;
			case 'dtime':  cDisplyFormat = this.isNull(col.cDisplyFormat, 'defaultFormat');  break;
			case 'date':   cDisplyFormat = this.isNull(col.cDisplyFormat, 'defaultFormat');  break;
			case 'checkbox':  cDisplyFormat = this.isNull(col.cDisplyFormat, 'defaultFormat');  break;
			case 'textBtn':  
			default: cDisplyFormat = 'defaultFormat';
		}

		var format = '';
		if (cDisplyFormat != 'defaultFormat')
		 format = 'formatter: '+cDisplyFormat;


	 	//_This.log( 'col.cColName='+cColName+', col.cUIName='+col.cUIName+', cDisplyFormat='+cDisplyFormat);

		var dataopt_fmt = "data-options=\"field:'%1', width:%2, sortable:true, %3\"";
		var dataopts = String.format(dataopt_fmt, cColName, iWidth, format);
		  
		return dataopts;		
	}


 	this.OnMainGridDblClickRow = function (index,row){
		
		_This.log('OnMainGridDblClickRow')    		
	}

	this.OnMainGridClickRow = function (index,row){
		//_This.log('_OnMainGridClickRow');  
		
		var VID = $(this).attr('VID');
		var VIndex = $(this).attr('VIndex'); 
		_This.log($(this).attr('id')+'=VID:'+VID+'=VIndex:'+VIndex);

		//_This.log('vGridCount=='+_This.vgrids().vGridCount() );

		for (var i = 0; i < _This.vgrids().vGridCount(); i++){				
				var gridItem = _This.vgrids().vGridItems(i);
				if (VIndex == 0 && gridItem.vindex(-1) > 0) {
					var pKey = gridItem.mainTabKey();	
					//_This.log('pkey='+pKey+', item.VIndex='+gridItem.vindex(-1));				
					var pfv = row[pKey];
					//var ForeignField = gridItem.ForeignField();					
					var url  = _This.route()+'/getSubVoucherData/q?tid='+gridItem.tid()+'&id='+_This.isNull(pfv, "-1");
				
				 	$(gridItem.grid()).datagrid('options').url = url;	 				
				 	$(gridItem.grid()).datagrid('reload'); 
					
				}
			 
		}	 //for i

	}





}


JVoucherQuery.prototype = new JVoucher();



function JVoucherTreeQuery()
{
	var _This = this;	
	var _TreeTab = '_treeTab';
	var _parserLayout = this.parserLayout;	
	var _loadOptions = this.loadOptions;


	this.calss = function (){ 	return  'JVoucherTreeQuery'	;	}

	this.gridUrl = function(t){
		var tid = $(t).attr('TID');
		return this.route() + '/voucherQuerylist/q?tid='+tid+'&mid='+this.mid();
	}



	function _onTreeLoadSuccess(node, data){
		//_This.log('_onTreeLoadSuccess....');

		$('#'+_TreeTab).tree('collapseAll', node);
		var children = $('#'+_TreeTab).tree('getChildren', node); 
		if (children){	
    		//displayProp(children);
    		$('#'+_TreeTab).tree('expand', children[0].target);
    	}    
	}


	function _onTreeClick(node){
		
		var key = node.id;
		var qr = '{"id": "'+key+'"}';		 
		var json = JSON.parse(qr);

		if (_This.mainGridView() != null){
			_This.mainGridView().datagrid({queryParams: json});   
		}else {
			_This.log('_This.mainGridView()==null');
		}
		
		var children = $('#'+_TreeTab).tree('getChildren', node.target); 
		if (children.length > 0) {
			if (node.state=='closed')
				$('#'+_TreeTab).tree('expandAll', node.target);	
			else 
				$('#'+_TreeTab).tree('collapseAll', node.target);
		}
	}


	this.loadOptions = function (){
		this.super(_loadOptions, this, arguments);
		
		$('#'+_TreeTab).tree('options').onLoadSuccess = _onTreeLoadSuccess;
		$('#'+_TreeTab).tree('options').onClick = _onTreeClick;
	}


	this.parserLayout = function (layout, vform, vgrids){
		this.super(_parserLayout, this, arguments);
		 
		var url = this.route() + '/defineTreeQuery/q?mid='+this.mid();
	
		var treeTab = $("<div data-options=\"region:'west',split:true,cache: true,border: true,headerCls:'panel-title_1',\""+
						" title=\"All Category\"  style=\"width:250px;\"><div style=\"margin:10px 0;\"></div>" +    	
	    				" <div class=\"easyui-panel\" style=\"padding:5px\"  data-options=\"cache: true, \" >"+	    	 					 
						 "<ul class=\"easyui-tree\" id=\"_treeTab\""+
			        	" data-options=\"animate:true, border: false, lines:true, method:'get', url: '"+url+"', \">"+
			        	"</ul></div></div>");

		$(layout.vmainLayout()).append(treeTab);
		
	}	 
	

}


JVoucherTreeQuery.prototype = new JVoucherQuery();




function JVoucherListEdit()
{

	this.calss = function (){
	 	return  'JVoucherListEdit'	;
	}


	this.dbExport = function (){
		alert('JVoucherListEdit:'+this.text);		 
	}


}


JVoucherListEdit.prototype = new JVoucherQuery();





