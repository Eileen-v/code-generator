import { attributeList,attributeCreate,attributeUpdate,attributeDelete } from '@/services/templateManagement/templateManagement';
import {
  ActionType,
  ModalForm,
  ProDescriptionsItemProps,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Popconfirm, message } from 'antd';
import React, { useRef, useState } from 'react';
import AttributeForm from './AttributeForm';

const AttributeConfiguration: React.FC = ({ open, onCancel, values }) => {
  const restFormRef = useRef<ProFormInstance>();
  const [type, setType] = useState<boolean>(false);
  const [modalOpen, handleModalOpen] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState(undefined);

  /**  新建/修改  */
  const handleSubmit = async (fields) => {
    console.log(fields, 'fields');
    const save = type ? attributeUpdate : attributeCreate;
    const template = type ? '修改' : '新建';
    const hide = message.loading(`正在${template}模板管理`);
    try {
      await save({
        groupId:values.id,
        ...fields,
      });
      hide();
      message.success(`${template}模板管理成功！`);
      // 刷新表格
      if (actionRef.current) {
        actionRef.current.reload();
      }
      handleCancel();
      return true;
    } catch (error) {
      hide();
      message.error(`${template}模板管理出错，请重试！`);
      return false;
    }
  };

  const handleCancel = () => {
    setType(false);
    handleModalOpen(false);
    setCurrentRow({});
  };

  const handleRemove = async (selectedRows: number) => {
    const hide = message.loading('正在删除');
    try {
      await templateDelete(selectedRows.map((row) => row.id));
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

  const columns: ProDescriptionsItemProps<API.UserInfo>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      hideInTable: true,
    },
    {
      title: '属性键',
      dataIndex: 'name',
    },
    {
      title: '默认值',
      dataIndex: 'value',
    },
    {
      title: '备注信息',
      dataIndex: 'remark',
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
    <ModalForm
      width="800px"
      formRef={restFormRef}
      open={open}
      modalProps={{
        onCancel: () => onCancel(),
        destroyOnClose: true,
      }}
      submitter={false}
    >
      <ProTable<API.UserInfo>
        request={async () => {
          console.log('values.id', values);
          return await attributeList({ groupId: values.id as number });
        }}
        headerTitle="属性配置"
        actionRef={actionRef}
        rowKey="id"
        search={false}
        toolBarRender={() => [
          <Button
            key="1"
            type="primary"
            onClick={() => {
              handleModalOpen(true);
              setType(false);
              setCurrentRow({});
            }}
          >
            新建
          </Button>,
        ]}
        columns={columns}
      />
      <AttributeForm
        type={type}
        open={modalOpen}
        values={currentRow}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </ModalForm>
  );
};

export default AttributeConfiguration;
