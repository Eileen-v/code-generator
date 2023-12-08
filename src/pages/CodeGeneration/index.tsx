import {
  downloadFile,
  filePreview,
  tableList,
} from '@/services/codeGeneration/codeGeneration';
import {
  templateList,
  updateByGroup,
} from '@/services/templateManagement/templateManagement';
import { download } from '@/utils/common';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Button, Divider, Steps, message } from 'antd';
import React, { useEffect, useState } from 'react';
import StepFour from './components/StepFour';
import StepOne from './components/StepOne';
import StepThree from './components/StepThree';
import StepTwo from './components/StepTwo';

const CodeGeneration: React.FC = () => {
  const [current, setCurrent] = useState<number>(0);
  const [databaseId, setDatabaseId] = useState<number>(0);
  const [tableNames, setTableNames] = useState<string[]>([]);
  const [templateData, handleTemplateData] = useState();
  const [groupId, setGroupId] = useState<number>(1);
  const [formRef, setFormRef] = useState();
  // 第三步
  const [treeData, setTreeData] = useState<API.MenuSmall[] | undefined>(
    undefined,
  );
  const [tableData, setTableData] = useState<string[]>([]);

  const pageContainer = useEmotionCss(() => {
    return {
      '.ant-pro-page-container-children-container': {
        paddingBlock: 0,
        paddingInline: '15px',
        backgroundColor: '#f5f5f5',
      },
      '.ant-space': {
        alignItems: 'end',
      },
      '.ant-pro-card-body':{
        paddingInline:'10px'
      }
    };
  });

  //第三步，点击菜单请求方法
  const handleTablesData = async (id: number) => {
    const res = await tableList({ databaseId: id });
    setTableData(res.data);
    setDatabaseId(id);
  };

  // 获取模板信息
  useEffect(() => {
    templateList().then((res) => {
      handleTemplateData(res.data);
      setGroupId(res.data[0].id);
    });
  }, []);

  // 下一步
  const next = () => {
    if (current === 1) {
      const arr = [];
      const fields = formRef.current.getFieldsValue();
      Object.entries(fields).map(([key, value]) => {
        arr.push({ name: key, value, groupId });
      });
      updateByGroup(arr);
      setCurrent(current + 1);
    } else if (current === 2) {
      if (tableNames.length === 0) {
        message.error('请至少选择一张表');
      } else {
        filePreview({
          groupId,
          databaseId,
          tableInfos: tableData.filter((item) =>
            tableNames.includes(item.tableName),
          ),
        }).then((res) => {
          setTreeData(res.data);
        });
        setCurrent(current + 1);
      }
    } else {
      setCurrent(current + 1);
    }
  };

  // 上一步
  const prev = () => {
    setCurrent(current - 1);
  };

  // 下载压缩包
  const downloadZip = () => {
    downloadFile({
      groupId,
      databaseId,
      tableInfos: tableData.filter((item) =>
        tableNames.includes(item.tableName),
      ),
    }).then((res) => {
      download(res, '下载压缩包');
    });
  };

  const submitTwo = (formRef) => {
    setFormRef(formRef);
  };

  return (
    <PageContainer className={pageContainer}>
      <ProCard direction="column" >
        <ProCard gutter={8}>
          <Steps
            current={current}
            items={[
              { title: '模板选择' },
              { title: '模板配置' },
              { title: '数据源选择' },
              { title: '代码生成' },
            ]}
            // onChange={handleSteps}
          />
        </ProCard>
        <ProCard style={{maxHeight:'800px',minHeight:'650px'}}>
          {current === 0 && (
            <StepOne
              setGroupId={setGroupId}
              templateData={templateData}
              groupId={groupId}
            />
          )}
          {current === 1 && <StepTwo groupId={groupId} onBack={submitTwo} />}
          {current === 2 && (
            <StepThree
            tableNames={tableNames}
              setTableNames={setTableNames}
              handleTablesData={handleTablesData}
              tableData={tableData}
              setTableData={setTableData}
            />
          )}
          {current === 3 && <StepFour treeData={treeData} />}
        </ProCard>
        <Divider style={{margin:'0'}}/>
        <ProCard style={{textAlign:'center'}}>
          <Button type="primary" onClick={() => prev()} style={{marginRight:'10px'}}>
            上一步
          </Button>
          <Button type="primary" onClick={() => next()} style={{marginRight:'10px'}}>
            下一步
          </Button>
          {current === 3 && (
            <Button type="primary" onClick={() => downloadZip()}>
              打包下载
            </Button>
          )}
        </ProCard>
      </ProCard>
     </PageContainer>
  );
};

export default CodeGeneration;
