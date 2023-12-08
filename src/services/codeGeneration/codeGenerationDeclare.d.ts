declare namespace CODE_GENERATION {
  type Params = {
    current: number;
    pageSize: number;
    tableName: string;
  };

  type CodeTable = {
    current: number;
    data: CodeTableListItem[];
    pageSize: number;
    success: boolean;
    total: number;
  };

  type CodeTableListItem = {
    tableName: string;
    engine: string;
    tableComment: string;
  };

  type FilePreviewParams = {
    databaseId: number;
    groupId: number;
    tableInfos: string[];
  };
}
