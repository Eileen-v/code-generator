import {
  ModalForm,
  ProFormInstance,
  ProFormText,
} from '@ant-design/pro-components'
import React, { useRef } from 'react'

export type FormProps = {
  type: boolean
  open: boolean
  values: any
  onSubmit: (fields: any) => void
  onCancel: () => void
}

const ComponentsForm: React.FC<FormProps> = (props) => {
  const { type, open, values, onSubmit, onCancel } = props
  const restFormRef = useRef < ProFormInstance > ()

  return (
    <ModalForm
      title={`${type ? '修改' : '新建'}数据源`}
      width="500px"
      formRef={restFormRef}
      open={open}
      initialValues={values}
      onFinish={async (fields) => {
        if (type) {
          fields.id = values?.id as number
        }
        onSubmit(fields)
      }}
      modalProps={{
        onCancel: () => onCancel(),
        destroyOnClose: true,
      }}
    >
      <ProFormText
        name="name"
        label="组件名称"
        placeholder="请输入组件名称"
        rules={[
          {
            required: true,
            max: 30,
            whitespace: true,
          },
        ]}
      />
      <ProFormText
        name="componentLabel"
        label="组件label"
        placeholder="请输入组件label"
        rules={[
          {
            required: true,
            max: 30,
            whitespace: true,
          },
        ]}
      />
    </ModalForm>
  )
}

export default ComponentsForm
