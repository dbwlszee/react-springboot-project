import {useNavigate} from 'react-router-dom';
// react-router-dom v6에서 class component의 history지원 중단의 사유로 필요한 파일
 
export const withRouter = (Component) => {
    const Wrapper = (props) => {
      const navigate = useNavigate();
      
      return (
        <Component
          navigate={navigate}
          {...props}
          />
      );
    };
    
    return Wrapper;
  };