import {
  importTemplate,
  templateCreate,
  templateDelete,
  templateList,
  templateUpdate,
  exportTemplate
} from '@/services/templateManagement/templateManagement';
import {
  ActionType,
  PageContainer,
  ProDescriptionsItemProps,
  ProTable,
} from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { Button, Popconfirm, Upload, message } from 'antd';
import React, { useRef, useState } from 'react';
import AttributeConfiguration from './components/AttributeConfiguration';
import TemplateManagementForm from './components/TemplateManagementForm';

const TemplateManagement: React.FC = () => {
  const [type, setType] = useState<boolean>(false);
  const [modalOpen, handleModalOpen] = useState<boolean>(false);
  const [attributeOpen, handleAttributeOpen] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState(undefined);

  /**  新建/修改  */
  const handleSubmit = async (fields) => {
    const save = type ? templateUpdate : templateCreate;
    const template = type ? '修改' : '新建';
    const hide = message.loading(`正在${template}模板管理`);
    try {
      await save({
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

  const handleAttributeCancel = () => {
    handleAttributeOpen(false);
  };

  const handleRemove = async (selectedRows: number) => {
    const hide = message.loading('正在删除');
    console.log(selectedRows, 'selectedRows');
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
      hideInSearch:true,
    },
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '备注',
      dataIndex: 'remark',
      hideInSearch:true,
    },
    {
      title: '模板组操作',
      with: 200,
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
          <Button
            type="link"
            key="edit"
            onClick={() => {
              history.push(`/templateManagement/editor/${record.id}`);
            }}
          >
            模板编辑
          </Button>
        </>
      ),
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      with:200,
      render: (_, record) => (
        <div style={{display:'flex'}}>
          <Button
            type="link"
            key="attribute"
            onClick={() => {
              setCurrentRow(record);
              handleAttributeOpen(true);
            }}
          >
            属性配置
          </Button>
          <Upload
            accept="application/zip, application/x-zip-compressed,"
            beforeUpload={async (file) => {
              try {
                const res = await importTemplate({
                  groupId: record.id,
                  file: file,
                });
                message.success(res.data);
                return true;
              } catch (error) {
                return false;
              }
            }}
          >
            <Button type="link">上传模板</Button>
          </Upload>
          <Button
            type="link"
            key="export"
            onClick={async () => {
                const download = await exportTemplate(record.id);
                const blob = new Blob([download]);
                const blobUrl = window.URL.createObjectURL(blob);
                const tmpLink = document.createElement('a');
                tmpLink.style.display = 'none';
                tmpLink.href = blobUrl;
                tmpLink.setAttribute('download', '模板文件.zip');
                document.body.appendChild(tmpLink);
                tmpLink.click();
                document.body.removeChild(tmpLink);
                window.URL.revokeObjectURL(blobUrl);
            }}
          >
            导出模板
          </Button>
        </div>
      ),
    },
  ];

  return (
    <PageContainer
      header={{
        title: '模板管理',
      }}
    >
      <ProTable<API.UserInfo>
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
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
        request={templateList}
        columns={columns}
      />
      <TemplateManagementForm
        type={type}
        open={modalOpen}
        values={currentRow}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
      <AttributeConfiguration
        open={attributeOpen}
        onCancel={handleAttributeCancel}
        values={currentRow}
      />
    </PageContainer>
  );
};

export default TemplateManagement;
