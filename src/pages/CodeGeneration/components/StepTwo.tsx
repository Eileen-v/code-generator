import {
  attributeList,
  fileTree,
} from '@/services/templateManagement/templateManagement';
import type { ProFormInstance } from '@ant-design/pro-components';
import { ProCard, ProForm, ProFormText } from '@ant-design/pro-components';
import { Tree } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

const { DirectoryTree } = Tree;
const StepTwo: React.FC = ({ groupId, onBack }) => {
  const formRef = useRef<ProFormInstance>();
  const [treeData, setTreeData] = useState<API.MenuSmall[] | undefined>(
    undefined,
  );
  const [attributeData, setAttributeData] = useState<string[]>([]);

  useEffect(() => {
    fileTree({ groupId: groupId }).then((res) => {
      setTreeData(res.data);
    });
  }, []);

  useEffect(() => {
    attributeList({ groupId: groupId }).then((res) => {
      setAttributeData(res.data);
      let obj = {};
      res.data.map((item) => {
        obj[item.name] = item.value;
      });
      formRef.current?.setFieldsValue({ ...obj });
    });
  }, []);

  useEffect(() => {
    onBack(formRef);
  }, []);

  return (
    <ProCard split="vertical">
      <ProCard colSpan="35%">
        <DirectoryTree treeData={treeData} />
      </ProCard>
      <ProCard>
        <ProForm title="新建表单" formRef={formRef} submitter={false}>
          {attributeData && attributeData.length
            ? attributeData.map((item) => {
                return (
                  <ProFormText
                    key={item.id}
                    width="xl"
                    name={item.name}
                    label={item.remark}
                    tooltip="最长为 24 位"
                    placeholder={`请输入${item.remark}`}
                    rules={[
                      {
                        required: true,
                        max: 30,
                        whitespace: true,
                      },
                    ]}
                  />
                );
              })
            : ''}
        </ProForm>
      </ProCard>
    </ProCard>
  );
};

export default StepTwo;
