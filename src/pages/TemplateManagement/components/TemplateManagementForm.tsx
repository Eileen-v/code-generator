import {
  ModalForm,
  ProFormInstance,
  ProFormText,
} from '@ant-design/pro-components';
import React, { useRef } from 'react';

export type FormProps = {
  type: boolean;
  open: boolean;
  values: any;
  onSubmit: (fields: any) => void;
  onCancel: () => void;
};

const TemplateManagementForm: React.FC<FormProps> = (props) => {
  const { type, open, values, onSubmit, onCancel } = props;
  const restFormRef = useRef<ProFormInstance>();

  return (
    <ModalForm
      title={`${type ? '修改' : '新建'}模板`}
      width="500px"
      formRef={restFormRef}
      open={open}
      initialValues={values}
      onFinish={async (fields) => {
        if (type) {
          fields.id = values?.id as number;
        }
        onSubmit(fields);
      }}
      modalProps={{
        onCancel: () => onCancel(),
        destroyOnClose: true,
      }}
    >
      <ProFormText
        name="name"
        label="模板名称"
        placeholder="请输入模板名称"
        rules={[
          {
            required: true,
            max: 30,
            whitespace: true,
          },
        ]}
      />
      <ProFormText
        name="root"
        label="根文件夹名称"
        placeholder="请输入模板名称"
        rules={[
          {
            required: true,
            max: 30,
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
            required: true,
            max: 30,
            whitespace: true,
          },
        ]}
      />
    </ModalForm>
  );
};

export default TemplateManagementForm;
