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

const DataSourceForm: React.FC<FormProps> = (props) => {
  const { type, open, values, onSubmit, onCancel } = props;
  const restFormRef = useRef<ProFormInstance>();

  return (
    <ModalForm
      title={`${type ? '修改' : '新建'}数据源`}
      width="700px"
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
        label="唯一标识"
        placeholder="请输入唯一标识"
        rules={[
          {
            required: true,
            max: 30,
            whitespace: true,
          },
        ]}
      />
      <ProFormText
        name="database"
        label="数据库名"
        placeholder="请输入数据库名"
        rules={[
          {
            required: true,
            max: 30,
            whitespace: true,
          },
        ]}
      />
      <ProFormText
        name="address"
        label="地址"
        placeholder="请输入地址"
        rules={[
          {
            required: true,
            max: 30,
            whitespace: true,
          },
        ]}
      />
      <ProFormText
        name="port"
        label="端口"
        placeholder="请输入端口"
        rules={[
          {
            required: true,
            max: 30,
            whitespace: true,
          },
        ]}
      />
      <ProFormText
        name="username"
        label="用户名"
        placeholder="请输入用户名"
        rules={[
          {
            required: true,
            max: 30,
            whitespace: true,
          },
        ]}
      />
      <ProFormText
        name="password"
        label="密码"
        placeholder="请输入密码"
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

export default DataSourceForm;
