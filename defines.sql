CREATE TABLE [jv_define] (
	id	INT	NOT NULL,
	pid	INT	NOT NULL,
	iIndex	INT	NOT NULL,
	iType	TINYINT	NULL,
	cCaption	VARCHAR(60)	NOT NULL,
	bEnabled	BIT	NULL	DEFAULT ((1)),
	dDate	DATETIME	NULL	DEFAULT (getdate()),
	cCustomTpl	VARCHAR(80)	NULL,
	cRightNode	VARCHAR(20)	NULL,
	cMemo	VARCHAR(100)	NULL,
	cJson	VARCHAR(512)	NULL,
	CONSTRAINT [PK_jv_define_vid] PRIMARY KEY  NONCLUSTERED
	(
		[id]
	) ON [PRIMARY],
	CONSTRAINT [UK_jv_define_pid_iIndex] UNIQUE  NONCLUSTERED
	(
	[pid],[iIndex]
	) ON [PRIMARY]
) ON [PRIMARY]





CREATE TABLE [jv_defines] (
	tid	INT	NOT NULL,
	id	INT	NOT NULL,
	cDescription	VARCHAR(60)	NOT NULL,
	cView	VARCHAR(100)	NOT NULL,
	cTable	VARCHAR(100)	NULL,
	iIndex	INT	NULL,
	iWidth	INT	NULL,
	iHeight	INT	NULL,
	iLeft	INT	NULL,
	iTop	INT	NULL,
	bEanbled	INT	NULL,
	cTabJson	VARCHAR(856)	NULL,
	CONSTRAINT [PK_jv_defines_did] PRIMARY KEY  NONCLUSTERED
	(
		[tid]
	) ON [PRIMARY],
	CONSTRAINT [PK_jv_defines_id_cView] UNIQUE  NONCLUSTERED
	(
	[id],[cView]
	) ON [PRIMARY],
	CONSTRAINT [FK_jv_defines_jv_define_id] FOREIGN KEY
	(
		[id]
	)
	REFERENCES [jv_define]
	(
		[id]
	)
) ON [PRIMARY]





CREATE TABLE [jv_defines_cols] (
	AutoID	INT	IDENTITY(1, 1)	NOT NULL,
	tid	INT	NOT NULL,
	cColName	VARCHAR(60)	NOT NULL,
	cCaption	VARCHAR(60)	NULL,
	cUIName	VARCHAR(14)	NULL,
	iIndex	INT	NULL,
	iWidth	INT	NULL,
	iHeight	INT	NULL,
	iLeft	INT	NULL,
	iTop	INT	NULL,
	bVisible	BIT	NULL	DEFAULT ((1)),
	bAuthed	BIT	NULL	DEFAULT ((1)),
	dDate	DATETIME	NULL	DEFAULT (getdate()),
	cColJson	VARCHAR(4096)	NULL,
	CONSTRAINT [PK_jv_defines_cols_AutoID] PRIMARY KEY  NONCLUSTERED
	(
		[AutoID]
	) ON [PRIMARY],
	CONSTRAINT [UK_jv_defines_cols_tid_cColName] UNIQUE  NONCLUSTERED
	(
	[tid],[cColName]
	) ON [PRIMARY],
	CONSTRAINT [FK_jv_defines_cols_jv_defines_tid] FOREIGN KEY
	(
		[tid]
	)
	REFERENCES [jv_defines]
	(
		[tid]
	)
) ON [PRIMARY]





CREATE TABLE [jv_defines_cols_u] (
	AutoID	INT	IDENTITY(1, 1)	NOT NULL,
	cMemberID	VARCHAR(16)	NULL,
	tid	INT	NOT NULL,
	cColName	VARCHAR(60)	NOT NULL,
	cCaption	VARCHAR(60)	NULL,
	cUIName	VARCHAR(14)	NULL,
	iIndex	INT	NULL,
	iWidth	INT	NULL,
	iHeight	INT	NULL,
	iLeft	INT	NULL,
	iTop	INT	NULL,
	bVisible	BIT	NULL	DEFAULT ((1)),
	bAuthed	BIT	NULL	DEFAULT ((1)),
	dDate	DATETIME	NULL	DEFAULT (getdate()),
	cColJson	VARCHAR(4096)	NULL,
	CONSTRAINT [PK_jv_defines_cols_u_AutoID] PRIMARY KEY  NONCLUSTERED
	(
		[AutoID]
	) ON [PRIMARY],
	CONSTRAINT [UK_jv_defines_cols_u_tid_cColName] UNIQUE  NONCLUSTERED
	(
	[tid],[cColName]
	) ON [PRIMARY],
	CONSTRAINT [FK_jv_defines_cols_u_jv_defines_tid] FOREIGN KEY
	(
		[tid]
	)
	REFERENCES [jv_defines]
	(
		[tid]
	)
) ON [PRIMARY]






INSERT jv_define(id, pid, iIndex, iType, cCaption, bEnabled, dDate, cCustomTpl, cRightNode, cMemo, cJson)
  VALUES('10', '1', '1', '', 'setting', 'True', '2011-06-18 15:12:14', '', '', '', '');
INSERT jv_define(id, pid, iIndex, iType, cCaption, bEnabled, dDate, cCustomTpl, cRightNode, cMemo, cJson)
  VALUES('11', '1', '2', '', 'profile', 'True', '2011-06-18 15:12:14', '', '', '', '');
INSERT jv_define(id, pid, iIndex, iType, cCaption, bEnabled, dDate, cCustomTpl, cRightNode, cMemo, cJson)
  VALUES('12', '1', '3', '', 'Purchasing', 'True', '2011-06-18 15:12:14', '', '', '', '');
INSERT jv_define(id, pid, iIndex, iType, cCaption, bEnabled, dDate, cCustomTpl, cRightNode, cMemo, cJson)
  VALUES('13', '1', '4', '', 'Sales', 'True', '2011-06-18 15:12:14', '', '', '', '');
INSERT jv_define(id, pid, iIndex, iType, cCaption, bEnabled, dDate, cCustomTpl, cRightNode, cMemo, cJson)
  VALUES('14', '1', '5', '', 'Inventory', 'True', '2011-06-18 15:12:14', '', '', '', '');
INSERT jv_define(id, pid, iIndex, iType, cCaption, bEnabled, dDate, cCustomTpl, cRightNode, cMemo, cJson)
  VALUES('1001', '10', '1', '1', 'Define forms', 'True', '2017-06-16 15:16:07', '', '', '', '');
INSERT jv_define(id, pid, iIndex, iType, cCaption, bEnabled, dDate, cCustomTpl, cRightNode, cMemo, cJson)
  VALUES('1002', '10', '2', '2', 'Define tables', 'True', '2017-06-16 15:46:27', '', '', '', '');
INSERT jv_define(id, pid, iIndex, iType, cCaption, bEnabled, dDate, cCustomTpl, cRightNode, cMemo, cJson)


INSERT jv_defines(tid, id, cDescription, cView, cTable, iIndex, iWidth, iHeight, iLeft, iTop, bEanbled, cTabJson)
  VALUES('1', '1001', 'Form define', 'v_jv_define', 'jv_define', '1', '', '', '', '', '', '{"tabKey":"id", "mainTabKey":"", "foreignKey":""}');
INSERT jv_defines(tid, id, cDescription, cView, cTable, iIndex, iWidth, iHeight, iLeft, iTop, bEanbled, cTabJson)
  VALUES('2', '1001', 'Form define', 'v_jv_defines', 'jv_defines', '2', '', '', '', '', '', '{"tabKey":"tid", "mainTabKey":"id", "foreignKey":"id"}');
INSERT jv_defines(tid, id, cDescription, cView, cTable, iIndex, iWidth, iHeight, iLeft, iTop, bEanbled, cTabJson)
  VALUES('3', '1001', 'Form cols define', 'v_jv_defines_cols', 'jv_defines_cols', '3', '', '', '', '', '', '{"tabKey":"AutoID", "mainTabKey":"id", "foreignKey":"id"}');




INSERT jv_defines_cols(tid, cColName, cCaption, cUIName, iIndex, iWidth, iHeight, iLeft, iTop, bVisible, bAuthed, dDate, cColJson)
  VALUES('1', 'id', 'id', '', '1', '0', '0', '0', '0', 'True', 'True', '2017-06-16 17:11:31', '');
INSERT jv_defines_cols(tid, cColName, cCaption, cUIName, iIndex, iWidth, iHeight, iLeft, iTop, bVisible, bAuthed, dDate, cColJson)
  VALUES('1', 'iIndex', 'Index', '', '2', '0', '0', '0', '0', 'True', 'True', '2017-06-16 17:11:51', '');
INSERT jv_defines_cols(tid, cColName, cCaption, cUIName, iIndex, iWidth, iHeight, iLeft, iTop, bVisible, bAuthed, dDate, cColJson)
  VALUES('1', 'iType', 'Form type', '', '3', '0', '0', '0', '0', 'True', 'True', '2017-06-16 17:12:02', '');
INSERT jv_defines_cols(tid, cColName, cCaption, cUIName, iIndex, iWidth, iHeight, iLeft, iTop, bVisible, bAuthed, dDate, cColJson)
  VALUES('1', 'cCaption', 'Form Title', '', '4', '0', '0', '0', '0', 'True', 'True', '2017-06-16 17:12:19', '');
INSERT jv_defines_cols(tid, cColName, cCaption, cUIName, iIndex, iWidth, iHeight, iLeft, iTop, bVisible, bAuthed, dDate, cColJson)
  VALUES('1', 'bEnabled', 'Enabled', '', '5', '0', '0', '0', '0', 'True', 'True', '2017-06-16 17:12:31', '');
INSERT jv_defines_cols(tid, cColName, cCaption, cUIName, iIndex, iWidth, iHeight, iLeft, iTop, bVisible, bAuthed, dDate, cColJson)
  VALUES('1', 'dDate', 'Date', '', '6', '0', '0', '0', '0', 'True', 'True', '2017-06-16 17:12:44', '');
INSERT jv_defines_cols(tid, cColName, cCaption, cUIName, iIndex, iWidth, iHeight, iLeft, iTop, bVisible, bAuthed, dDate, cColJson)
  VALUES('1', 'cCustomTpl', 'Template', '', '7', '0', '0', '0', '0', 'True', 'True', '2017-06-16 17:12:58', '');
INSERT jv_defines_cols(tid, cColName, cCaption, cUIName, iIndex, iWidth, iHeight, iLeft, iTop, bVisible, bAuthed, dDate, cColJson)
  VALUES('1', 'cRightNode', 'Right', '', '8', '0', '0', '0', '0', 'True', 'True', '2017-06-16 17:13:12', '');
INSERT jv_defines_cols(tid, cColName, cCaption, cUIName, iIndex, iWidth, iHeight, iLeft, iTop, bVisible, bAuthed, dDate, cColJson)
  VALUES('1', 'cMemo', 'Memo', '', '9', '0', '0', '0', '0', 'True', 'True', '2017-06-16 17:13:22', '');
INSERT jv_defines_cols(tid, cColName, cCaption, cUIName, iIndex, iWidth, iHeight, iLeft, iTop, bVisible, bAuthed, dDate, cColJson)
  VALUES('2', 'id', 'id', '', '1', '0', '0', '0', '0', 'True', 'True', '2017-06-16 17:11:40', '');
INSERT jv_defines_cols(tid, cColName, cCaption, cUIName, iIndex, iWidth, iHeight, iLeft, iTop, bVisible, bAuthed, dDate, cColJson)
  VALUES('2', 'tid', 'tid', '', '2', '0', '0', '0', '0', 'True', 'True', '2017-06-16 17:14:03', '');
INSERT jv_defines_cols(tid, cColName, cCaption, cUIName, iIndex, iWidth, iHeight, iLeft, iTop, bVisible, bAuthed, dDate, cColJson)
  VALUES('2', 'cDescription', 'Description', '', '3', '0', '0', '0', '0', 'True', 'True', '2017-06-16 17:14:13', '');
INSERT jv_defines_cols(tid, cColName, cCaption, cUIName, iIndex, iWidth, iHeight, iLeft, iTop, bVisible, bAuthed, dDate, cColJson)
  VALUES('2', 'cView', 'Table view', '', '4', '0', '0', '0', '0', 'True', 'True', '2017-06-16 17:14:28', '');
INSERT jv_defines_cols(tid, cColName, cCaption, cUIName, iIndex, iWidth, iHeight, iLeft, iTop, bVisible, bAuthed, dDate, cColJson)
  VALUES('2', 'cTable', 'table name', '', '5', '0', '0', '0', '0', 'True', 'True', '2017-06-16 17:14:42', '');
INSERT jv_defines_cols(tid, cColName, cCaption, cUIName, iIndex, iWidth, iHeight, iLeft, iTop, bVisible, bAuthed, dDate, cColJson)
  VALUES('2', 'iIndex', 'Visible', '', '6', '0', '0', '0', '0', 'True', 'True', '2017-06-16 17:14:47', '');
INSERT jv_defines_cols(tid, cColName, cCaption, cUIName, iIndex, iWidth, iHeight, iLeft, iTop, bVisible, bAuthed, dDate, cColJson)
  VALUES('2', 'cTabJson', 'Json', '', '7', '0', '0', '0', '0', 'True', 'True', '2017-06-16 17:15:02', '');
INSERT jv_defines_cols(tid, cColName, cCaption, cUIName, iIndex, iWidth, iHeight, iLeft, iTop, bVisible, bAuthed, dDate, cColJson)
  VALUES('3', 'AutoID', 'AutoID', '', '1', '0', '0', '0', '0', 'True', 'True', '2017-06-16 17:15:21', '');
INSERT jv_defines_cols(tid, cColName, cCaption, cUIName, iIndex, iWidth, iHeight, iLeft, iTop, bVisible, bAuthed, dDate, cColJson)
  VALUES('3', 'tid', 'tid', '', '2', '0', '0', '0', '0', 'True', 'True', '2017-06-16 17:15:37', '');
INSERT jv_defines_cols(tid, cColName, cCaption, cUIName, iIndex, iWidth, iHeight, iLeft, iTop, bVisible, bAuthed, dDate, cColJson)
  VALUES('3', 'cColName', 'Column', '', '3', '0', '0', '0', '0', 'True', 'True', '2017-06-16 17:15:45', '');
INSERT jv_defines_cols(tid, cColName, cCaption, cUIName, iIndex, iWidth, iHeight, iLeft, iTop, bVisible, bAuthed, dDate, cColJson)
  VALUES('3', 'cCaption', 'Caption', '', '4', '0', '0', '0', '0', 'True', 'True', '2017-06-17 11:16:31', '');
INSERT jv_defines_cols(tid, cColName, cCaption, cUIName, iIndex, iWidth, iHeight, iLeft, iTop, bVisible, bAuthed, dDate, cColJson)
  VALUES('3', 'cUIName', 'UI type', '', '5', '0', '0', '0', '0', 'True', 'True', '2017-06-17 11:16:49', '');
INSERT jv_defines_cols(tid, cColName, cCaption, cUIName, iIndex, iWidth, iHeight, iLeft, iTop, bVisible, bAuthed, dDate, cColJson)
  VALUES('3', 'iIndex', 'Index', '', '6', '0', '0', '0', '0', 'True', 'True', '2017-06-17 11:16:57', '');
INSERT jv_defines_cols(tid, cColName, cCaption, cUIName, iIndex, iWidth, iHeight, iLeft, iTop, bVisible, bAuthed, dDate, cColJson)
  VALUES('3', 'iWidth', 'Width', '', '7', '0', '0', '0', '0', 'True', 'True', '2017-06-17 11:17:05', '');
INSERT jv_defines_cols(tid, cColName, cCaption, cUIName, iIndex, iWidth, iHeight, iLeft, iTop, bVisible, bAuthed, dDate, cColJson)
  VALUES('3', 'iHeight', 'Height', '', '8', '0', '0', '0', '0', 'True', 'True', '2017-06-17 11:17:11', '');
INSERT jv_defines_cols(tid, cColName, cCaption, cUIName, iIndex, iWidth, iHeight, iLeft, iTop, bVisible, bAuthed, dDate, cColJson)
  VALUES('3', 'iLeft', 'Left', '', '9', '0', '0', '0', '0', 'True', 'True', '2017-06-17 11:17:21', '');
INSERT jv_defines_cols(tid, cColName, cCaption, cUIName, iIndex, iWidth, iHeight, iLeft, iTop, bVisible, bAuthed, dDate, cColJson)
  VALUES('3', 'iTop', 'Top', '', '10', '0', '0', '0', '0', 'True', 'True', '2017-06-17 11:17:29', '');
INSERT jv_defines_cols(tid, cColName, cCaption, cUIName, iIndex, iWidth, iHeight, iLeft, iTop, bVisible, bAuthed, dDate, cColJson)
  VALUES('3', 'bVisible', 'Visible', '', '11', '0', '0', '0', '0', 'True', 'True', '2017-06-17 11:17:38', '');
INSERT jv_defines_cols(tid, cColName, cCaption, cUIName, iIndex, iWidth, iHeight, iLeft, iTop, bVisible, bAuthed, dDate, cColJson)
  VALUES('3', 'bAuthed', 'Authed', '', '12', '0', '0', '0', '0', 'True', 'True', '2017-06-17 11:17:45', '');
INSERT jv_defines_cols(tid, cColName, cCaption, cUIName, iIndex, iWidth, iHeight, iLeft, iTop, bVisible, bAuthed, dDate, cColJson)
  VALUES('3', 'dDate', 'Date', '', '13', '0', '0', '0', '0', 'True', 'True', '2017-06-17 11:17:52', '');
INSERT jv_defines_cols(tid, cColName, cCaption, cUIName, iIndex, iWidth, iHeight, iLeft, iTop, bVisible, bAuthed, dDate, cColJson)
  VALUES('3', 'cColJson', 'ColJson', '', '14', '0', '0', '0', '0', 'True', 'True', '2017-06-17 11:17:54', '');
  
  
  
