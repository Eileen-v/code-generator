import {
  componentsCreate,
  componentsDelete,
  componentsList,
  componentsUpdate,
} from '@/services/componentsManagement/componentsManagement';
import type { ActionType } from '@ant-design/pro-components';
import { PageContainer, ProList } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Button, Col, Popconfirm, Row, message } from 'antd';
import React, { useRef, useState } from 'react';
import MyCodeMirror from '../../components/CodeMirror';
import ComponentsForm from './components/ComponentsForm';

const ComponentManagement: React.FC = () => {
  const [type, setType] = useState<boolean>(false);
  const [modalOpen, handleModalOpen] = useState<boolean>(false);
  const action = useRef<ActionType>();
  const [row, setCurrentRow] = useState<
    Partial<COMPONENT_MANAGEMENT.ComponentListItem> | undefined
  >(undefined);
  const [codeValue, setCodeValue] = useState<string>('');

  /**  新建/修改 数据源 */
  const handleSubmit = async (fields) => {
    const save = type ? componentsUpdate : componentsCreate;
    const template = type ? '修改' : '新建';
    const hide = message.loading(`正在${template}组件`);
    try {
      await save({
        ...fields,
      });
      hide();
      message.success(`${template}组件成功！`);
      // 刷新表格
      if (action.current) {
        action.current.reload();
      }
      handleCancel();
      return true;
    } catch (error) {
      hide();
      message.error(`${template}组件出错，请重试！`);
      return false;
    }
  };

  const handleCancel = () => {
    setType(false);
    handleModalOpen(false);
    setCurrentRow({});
  };

  const handleRemove = async (id: number) => {
    const hide = message.loading('正在删除组件');

    try {
      await componentsDelete(id);
      hide();
      message.success('删除组件成功！');
      setCurrentRow({});
      // 刷新表格
      if (action.current) {
        action.current.reload();
      }
      return true;
    } catch (error) {
      console.log(error, 'error');
      hide();
      message.error('删除组件失败，请重试！');
      return false;
    }
  };

  const pageStyle = useEmotionCss(() => {
    return {
      '.ant-pro-card-body': {
        minHeight: 700,
      },
    };
  });

  return (
    <PageContainer className={pageStyle}>
      <Row gutter={8}>
        <Col span={8}>
          <ProList
            request={componentsList}
            rowKey="id"
            actionRef={action}
            editable={{}}
            onRow={(record) => {
              return {
                onClick: () => setCodeValue(record),
              };
            }}
            toolBarRender={() => {
              return [
                <Button
                  key="add"
                  type="primary"
                  onClick={() => {
                    handleModalOpen(true);
                  }}
                >
                  新建
                </Button>,
              ];
            }}
            metas={{
              title: {
                dataIndex: 'name',
                valueType: 'text',
                fieldProps: {
                  showSearch: true,
                  placement: 'bottomRight',
                },
              },
              actions: {
                render: (text, row) => {
                  return (
                    <>
                      <Button
                        type="link"
                        key="update"
                        onClick={() => {
                          handleModalOpen(true);
                          setCurrentRow(row);
                          setType(true);
                        }}
                      >
                        修改
                      </Button>
                      <Popconfirm
                        key="remove"
                        title={`确认要删除 ${row.name} 吗?`}
                        okText="是"
                        cancelText="否"
                        onConfirm={() => {
                          handleRemove(row.id);
                        }}
                      >
                        <Button type="link" danger>
                          删除
                        </Button>
                      </Popconfirm>
                    </>
                  );
                },
              },
            }}
          />
          <ComponentsForm
            type={type}
            open={modalOpen}
            values={row}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </Col>
        <Col span={16}>
          <MyCodeMirror
            setValue={setCodeValue}
            codeValue={codeValue}
            type={1}
            handleBack={() => {
              if (action.current) {
                action.current.reload();
              }
            }}
          />
        </Col>
      </Row>
    </PageContainer>
  );
};

export default ComponentManagement;
