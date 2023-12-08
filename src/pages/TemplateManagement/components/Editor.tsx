import {
  fileCreate,
  fileDelete,
  fileTree,
  fileUpdate,
} from '@/services/templateManagement/templateManagement';
import { DownOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { useParams } from '@umijs/max';
import { Col, Menu, Row, Tree, message } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import MyCodeMirror from '../../../components/CodeMirror';
import EditorForm from './EditorForm';

const { DirectoryTree } = Tree;

const Editor: React.FC = () => {
  const { id } = useParams() as undefined & { id: number };
  const treeRef = useRef(null);
  const [menuVisible, handleMenuVisible] = useState<boolean>(false);
  const [editorFormOpen, handleEditorFormOpen] = useState<boolean>(false);
  const [editorFormValue, handleEditorFormValue] = useState<String>('');
  const [treeId, setTreeId] = useState<String>('');
  const [menuPosition, setMenuPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  // 一整颗树
  const [treeData, setTreeData] = useState<any>();
  // 树节点
  const [treeNodeValue, setTreeNodeValue] = useState<{
    id: number;
    pid: number;
    file: string;
  }>({});

  const handleFileTree = async () => {
    try {
      const res = await fileTree({ groupId: id });
      setTreeData(res.data);
      return true;
    } catch (error) {
      message.error(`网络错误！`);
      return false;
    }
  };

  useEffect(() => {
    handleFileTree();
  }, [editorFormOpen]);

  const onChange = (value) => {
    const updatedNodeValue = { ...treeNodeValue, file: value };
    setTreeNodeValue(updatedNodeValue);
  };

  const onRightClickTreeNode = (event: React.MouseEvent) => {
    setTreeId(event.node.id);
    setTreeNodeValue(event.node);
    setMenuPosition({ x: event.event.clientX, y: event.event.clientY });
    handleMenuVisible(true);
    document.addEventListener('click', closeMenu);
  };

  const closeMenu = () => {
    handleMenuVisible(false);
    document.removeEventListener('click', closeMenu);
  };

  const menuSelect = (selectedKeys) => {
    handleEditorFormOpen(true);
    handleEditorFormValue(selectedKeys);
  };

  // 新建/修改文件
  const handleSubmit = async (fields: any) => {
    if (editorFormValue.key === 'delete') {
      try {
        await fileDelete(treeId);
        message.success(`删除文件成功`);
        handleEditorFormOpen(false);
        return true;
      } catch (error) {
        message.error(`删除文件出错！`);
        return false;
      }
    } else {
      const save = editorFormValue.key === 'edit' ? fileUpdate : fileCreate;
      const template = editorFormValue.key === 'edit' ? '修改' : '新建';
      try {
        await save({
          ...fields,
          groupId: id,
          type: editorFormValue.key === 'createFiles' ? '2' : '1',
        });
        message.success(`${template}文件成功`);
        handleEditorFormOpen(false);
        return true;
      } catch (error) {
        message.error(`${template}文件出错！`);
        return false;
      }
    }
  };

  const menuClass = useEmotionCss(() => {
    return {
      padding: '2px 0 8px 0',
      position: 'fixed',
      top: menuPosition.y,
      left: menuPosition.x,
      zIndex: 999,
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.12), 0 0 2px rgba(0, 0, 0, 0.04)',
      borderRadius: '5px',
      border: '1px solid #eee',
    };
  });

  return (
    <PageContainer>
      <Row>
        <Col span={6}>
          <DirectoryTree
            style={{ minHeight: '700px' }}
            ref={treeRef}
            showIcon
            blockNode
            defaultExpandAll
            switcherIcon={<DownOutlined />}
            treeData={treeData} 
            onRightClick={(event, node) => onRightClickTreeNode(event, node)}
            onSelect={(selectedKeys, e) => {
              setTreeNodeValue(e.node);
            }}
          />
        </Col>
        <MyCodeMirror
          setValue={setTreeNodeValue}
          codeValue={treeNodeValue}
          type={0}
          handleBack={() => {
            handleFileTree();
          }}
        />
        {menuVisible && (
          <Menu
            className={menuClass}
            mode="inline"
            style={{ width: 256 }}
            onSelect={menuSelect}
            items={[
              {
                label: '编辑',
                key: 'edit',
              },
              {
                label: '删除',
                key: 'delete',
              },
              {
                label: '新建文件夹',
                key: 'createFile',
              },
              {
                label: '新建模板文件',
                key: 'createFiles',
              },
            ]}
          />
        )}
        <EditorForm
          treeNodeValue={treeNodeValue}
          open={editorFormOpen}
          value={editorFormValue}
          onSubmit={handleSubmit}
          onCancel={() => {
            handleEditorFormOpen(false);
          }}
        />
      </Row>
    </PageContainer>
  );
};
export default Editor;
