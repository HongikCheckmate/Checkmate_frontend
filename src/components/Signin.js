const Signin = () => {
  const login = async (id, password) => {
    console.log("Mock data", id, password);

    if (id === 'dlxodud1129' && password === '1129') {
      return { nickname: 'test user' };
    } else {
      throw new Error('아이디 또는 비밀번호가 틀렸습니다.');
    }
  };

  return { login };
};

export default Signin;