import type {
  EditableFormInstance,
  ProColumns,
} from '@ant-design/pro-components';
import { EditableProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import React, { useRef, useState ,useEffect} from 'react';
import { componentsList } from '@/services/componentsManagement/componentsManagement';

const TableItem: React.FC = ({
  setFlag,
  tableNames,
  tableData,
  rowTableName,
  setTableData,
}) => {
  const editableFormRef = useRef<EditableFormInstance>();
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [componentLabel, setComponentLabel] = useState({});

  useEffect(() => {
    componentsList().then((res) => {
      const obj = {}
      res.data.map((item)=>{              
        obj[item.name] = {text: `${item.componentLabel}`}
      })
      setComponentLabel(obj)
    });
  }, []);

  const columns: ProColumns<DataSourceType>[] = [
    {
      title: '字段名称',
      dataIndex: 'columnName',
      editable: false,
    },
    {
      title: '字段类型',
      dataIndex: 'columnType',
      editable: false,
    },
    {
      title: '字段注释',
      dataIndex: 'columnComment',
      editable: false,
    },
    {
      title: '组件类型',
      dataIndex: 'componentName',
      valueType: 'select',
      initialValue: 'proFormText',
      valueEnum: componentLabel,
    },
    {
      title: '操作',
      valueType: 'option',
      render: (text, record, _, action) => {
        return (
          <Button
            disabled={tableNames.includes(rowTableName) ? false : true}
            type="link"
            key="edit"
            onClick={() => {
              setFlag(false);
              action?.startEditable?.(record.columnName);
            }}
          >
            编辑
          </Button>
        );
      },
    },
  ];

  return (
    <EditableProTable<DataSourceType>
      editableFormRef={editableFormRef}
      columns={columns}
      rowKey="columnName"
      scroll={{
        y: 550,
      }}
      value={
        tableData &&
        tableData.find((item) => item.tableName === rowTableName)
          ?.columnInfoList
      }
      recordCreatorProps={false}
      editable={{
        editableKeys,
        onSave: (key, row) => {
          setFlag(true);
          const arr = tableData.find(
            (item) => item.tableName === rowTableName,
          )?.columnInfoList;
          const obj = arr.find((item) => item.columnName === key);
          if (obj) {
            obj.componentName = row.componentName;
            setTableData([...tableData]);
          }
        },
        onCancel: ()=>{
          setFlag(true);
        },
        onChange: setEditableRowKeys,
        actionRender: (row, config, dom) => [dom.save, dom.cancel],
      }}
      // editable={{
      //   editableKeys,
      //   actionRender: (row, config, defaultDoms) => {
      //     return [defaultDoms.delete];
      //   },
      //   onValuesChange: (record, recordList) => {
      //     // console.log(recordList, 'recordList');
      //     const obj = tableData.find((item) => item.tableName === rowTableName);
      //     if (obj) {
      //       obj.columnInfoList = recordList;
      //       setTableData([...tableData]);
      //     }
      //   },
      //   onChange: (record) => {
      //     setEditableRowKeys(record);
      //   },
      // }}
    />
  );
};
export default TableItem;
