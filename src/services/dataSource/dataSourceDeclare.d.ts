declare namespace DATA_SOURCE {
  type Params = {
    current: number;
    pageSize: number;
    tableName: string;
  };

  type DataSourceList = {
    current: number;
    data: DataSourceListItem[];
    pageSize: number;
    success: boolean;
    total: number;
  };

  type DataSourceListItem = {
    address: string;
    database: string;
    port:string;
    name: string;
    username: string;
    password: string;
  };
}