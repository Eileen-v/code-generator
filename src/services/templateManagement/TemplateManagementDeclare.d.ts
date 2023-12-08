declare namespace TEMPLATE_MANAGEMENT {
  type Params = {
    current: number;
    pageSize: number;
    name: string;
    remark: string;
    root: string;
  };

  type TemplateList = {
    current: number;
    data: TemplateListItem[];
    pageSize: number;
    success: boolean;
    total: number;
  };

  type TemplateListItem = {
    id:number;
    name: string;
    remark: string;
    root: string;
  };

  type Attribute = {
    name: string;
    value: string;
    remark: string;
  }
}