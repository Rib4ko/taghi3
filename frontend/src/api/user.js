import jwt_decode from 'jwt-decode';
import Cookies from 'js-cookie';

const getUser = () => {
  const token = Cookies.get('token');
  if (!token) {
    return null;
  }
  try {
    const decoded = jwt_decode(token);
    return decoded;
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
};

export default getUser;