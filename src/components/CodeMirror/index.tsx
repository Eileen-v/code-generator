import { componentsUpdate } from '@/services/componentsManagement/componentsManagement';
import { fileUpdate } from '@/services/templateManagement/templateManagement';
import { javascript } from '@codemirror/lang-javascript';
import CodeMirror from '@uiw/react-codemirror';
import { message } from 'antd';

const MyCodeMirror: React.FC = ({ codeValue, setValue, type,handleBack }) => {

  const onChange = (value) => {
    const updatedNodeValue = { ...codeValue, file: value };
    setValue(updatedNodeValue);
  };

  const handleSave = async () => {
    const update = type ? componentsUpdate : fileUpdate;
    try {
      await update({
        id: codeValue.id,
        file: codeValue.file,
      });
      message.success(`保存成功`);
      handleBack()
      return true;
    } catch (error) {
      message.error(`保存出错！`);
      return false;
    }
  };

  const handleKeyDown = (event) => {
    if (event && event.ctrlKey && event.keyCode === 83 && type !== 2) {
      event.preventDefault();
      handleSave();
    }
  };

  return (
    <CodeMirror
      width="1100px"
      value={codeValue.file === null ? '' : codeValue.file}
      height="700px"
      extensions={[javascript({ jsx: true })]}
      onChange={onChange}
      onKeyDown={handleKeyDown}
      editable={codeValue.id ? true :false}
    />
  );
};

export default MyCodeMirror;
