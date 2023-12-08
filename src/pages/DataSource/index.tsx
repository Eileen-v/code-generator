import { databaseList,databaseUpdate,databaseCreate,databaseDelete } from '@/services/dataSource/dataSource';
import {
  ActionType,
  PageContainer,
  ProDescriptionsItemProps,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Popconfirm,message } from 'antd';
import React, { useRef, useState } from 'react';
import DataSourceForm from './components/DataSourceForm';

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [modalOpen, handleModalOpen] = useState<boolean>(false);
  const [type, setType] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState(undefined);

  /**  新建/修改 数据源 */
  const handleSubmit = async (fields) => {
    const save = type ? databaseUpdate : databaseCreate;
    const template = type ? '修改' : '新建';
    const hide = message.loading(`正在${template}数据源`);
    try {
      await save({
        ...fields,
      });
      hide();
      message.success(`${template}数据源成功！`);
      // 刷新表格
      if (actionRef.current) {
        actionRef.current.reload();
      }
      handleCancel();
      return true;
    } catch (error) {
      hide();
      message.error(`${template}数据源出错，请重试！`);
      return false;
    }
  };

  const handleCancel = () => {
    setType(false);
    handleModalOpen(false);
    setCurrentRow({});
  };

  const handleRemove = async (selectedRows: any) => {
    const hide = message.loading('正在删除');
    console.log(selectedRows, 'selectedRows');
    try {
      await databaseDelete(selectedRows.map((row) => row.id));
      hide();
      message.success('删除成功');
      // 刷新表格
      if (actionRef.current) {
        actionRef.current.reload();
      }
      return true;
    } catch (error) {
      hide();
      message.error('删除失败，请重试');
      return false;
    }
  };

  const columns: ProColumns<DATA_SOURCE.DataSourceListItem>[] = [
    {
      title: '唯一标识',
      dataIndex: 'name',
    },
    {
      title: '数据库名称',
      dataIndex: 'database',
      hideInSearch:true,
    },
    {
      title: '地址',
      dataIndex: 'address',
      hideInSearch:true,
    },
    {
      title: '端口号',
      dataIndex: 'port',
      hideInSearch:true,
    },
    {
      title: '用户名',
      dataIndex: 'username',
      hideInSearch:true,
    },
    {
      title: '密码',
      dataIndex: 'password',
      hideInForm: true,
      hideInSearch:true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <Button
            type="link"
            key="update"
            onClick={() => {
              handleModalOpen(true);
              setCurrentRow(record);
              setType(true);
            }}
          >
            修改
          </Button>
          <Popconfirm
            key="remove"
            title={`确认要删除 ${record.name} 吗?`}
            okText="是"
            cancelText="否"
            onConfirm={() => {
              handleRemove([record]);
            }}
          >
            <Button type="link" danger>
              删除
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <PageContainer
      header={false}
    >
      <ProTable
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            key="1"
            type="primary"
            onClick={() => handleModalOpen(true)}
          >
            新建
          </Button>,
        ]}
        request={databaseList}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        }}
      />
      <DataSourceForm
        type={type}
        open={modalOpen}
        values={currentRow}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </PageContainer>
  );
};

export default TableList;
