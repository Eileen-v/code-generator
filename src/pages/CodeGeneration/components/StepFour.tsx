import { DownOutlined } from '@ant-design/icons';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { javascript } from '@codemirror/lang-javascript';
// import CodeMirror from '@uiw/react-codemirror';
import { Col, Row, Tree } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import MyCodeMirror from '../../../components/CodeMirror';
import { type } from './../../DataSource/components/DataSourceForm';

const { DirectoryTree } = Tree;

const StepFour: React.FC = ({treeData}) => {
  const treeRef = useRef(null);
  const [codeValue, setCodeValue] = useState<string>('');


  const onChange = React.useCallback((value, viewUpdate) => {
    console.log('value:', value);
  }, []);

  // const treeClass = useEmotionCss(() => {
  //   return {
  //     height: '900px',
  //   };
  // });

  return (
    <Row>
      <Col span={6}>
        <DirectoryTree
          // className={treeClass}
          ref={treeRef}
          showIcon
          defaultExpandAll
          switcherIcon={<DownOutlined />}
          treeData={treeData}
          onSelect={(selectedKeys, e) => {
            console.log(e.node.file,'codeValue');
            setCodeValue(e.node);
          }}
        />
      </Col>
      <MyCodeMirror setValue={setCodeValue}  codeValue={codeValue} type={2}/>
    </Row>
  );
};
export default StepFour;
