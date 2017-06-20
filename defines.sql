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



