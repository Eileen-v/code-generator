/**
 * @name 新建，修改,删除文件 组件
 * @description 可以新建，修改，删除文件。
 */

import type { ProFormInstance } from '@ant-design/pro-components';
import { ModalForm, ProFormText } from '@ant-design/pro-components';
import React, { useRef } from 'react';

export type FormProps = {
  treeNodeValue: any;
  open: boolean;
  value: any;
  onSubmit: (fields: any) => void;
  onCancel: () => void;
};

const EditorForm: React.FC<FormProps> = (props) => {
  const { treeNodeValue, value, open, onSubmit, onCancel } = props;
  const restFormRef = useRef<ProFormInstance>();

  return (
    <ModalForm
      width="487px"
      layout="vertical"
      initialValues={value.key === 'edit' ? treeNodeValue : ''}
      labelCol={{ span: 5, offset: 0 }}
      formRef={restFormRef}
      open={open}
      onFinish={async (fields) => {
        if (value.key === 'edit') {
          fields.id = treeNodeValue.id;
        } else if (value.key === 'createFile' || 'createFiles') {
          fields.pid = treeNodeValue.id;
        }
        onSubmit(fields);
      }}
      modalProps={{
        onCancel: () => onCancel(),
        destroyOnClose: true,
      }}
    >
      {value.key !== 'delete' && (
        <>
          <ProFormText
            name="title"
            label="文件名"
            placeholder="请输入文件名"
            rules={[
              {
                required: true,
                max: 200,
                whitespace: true,
              },
            ]}
          />
          <ProFormText
            name="remark"
            label="备注"
            placeholder="备注"
            rules={[
              {
                max: 30,
                whitespace: true,
              },
            ]}
          />
        </>
      )}

      {value.key === 'delete' && <p>是否删除本身及子节点</p>}
    </ModalForm>
  );
};

export default EditorForm;
