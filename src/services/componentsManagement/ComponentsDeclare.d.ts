declare namespace COMPONENT_MANAGEMENT {
  type Params = {
    current: number;
    pageSize: number;
    tableName: string;
  };

  type ComponentList = {
    current: number;
    data: ComponentListItem[];
    pageSize: number;
    success: boolean;
    total: number;
  };

  type ComponentListItem = {
    address: string;
    database: string;
    port: string;
    name: string;
    username: string;
    password: string;
  };
}
