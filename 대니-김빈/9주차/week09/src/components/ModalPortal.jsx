import ReactDOM from 'react-dom';

const ModalPortal = ({ children }) => {
  const portalNode = document.getElementById('portal');
  if (!portalNode) {
    console.error('Portal 노드를 찾을 수 없습니다.');
    return null;
  }
  return ReactDOM.createPortal(children, portalNode);
};

export default ModalPortal;