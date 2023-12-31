import { useState } from 'react';
import styled from 'styled-components';
import { instace } from 'api/axios';
import { unPaidList } from 'pages/AdminPage';
interface PwAdminInputProps {
  setIsCorrectPw: React.Dispatch<React.SetStateAction<boolean>>;
  setUnpaidList: React.Dispatch<React.SetStateAction<unPaidList>>;
}
function PwAdminInput({ setIsCorrectPw, setUnpaidList }: PwAdminInputProps) {
  //비밀번호 input
  const [userInput, setUserInput] = useState<string>('');

  const onSubmitButtonClick = async () => {
    // userInput과 비밀번호가 같은지 확인, 다르면 다르다고 알림
    try {
      const response = await instace.get('/admins', {
        params: {
          password: userInput,
        },
      });
      setUnpaidList(response.data);
      setIsCorrectPw(true);
    } catch (error) {
      alert('비밀번호가 틀렸습니다.');
      setIsCorrectPw(false);
    }
  };

  const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };
  return (
    <PWAdminInputForm>
      <FormTitle>암호 입력</FormTitle>
      <Flex>
        <PasswordField value={userInput} onChange={onTextChange} />
        <SubmitButton onClick={onSubmitButtonClick}>확인</SubmitButton>
      </Flex>
    </PWAdminInputForm>
  );
}

const PWAdminInputForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormTitle = styled.div`
  font-size: 1.6rem;
  font-weight: 700;
`;

const Flex = styled.div`
  display: flex;
  gap: 0.7rem;
  align-items: center;
`;

const PasswordField = styled.input`
  border-radius: 1rem;
  padding: 0.6rem 1rem;
  background: #e2e7e0;
  width: 12rem;
`;

export const SubmitButton = styled.button`
  border-radius: 0.5rem;
  width: 4rem;
  height: 2.4rem;
  font-size: 1.2rem;
  background: #117de0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;

export default PwAdminInput;
