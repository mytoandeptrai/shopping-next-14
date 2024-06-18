import bcrypt from 'bcryptjs';

const verifyHashPassword = async (password: string, hashPassword: string) => {
  try {
    return await bcrypt.compare(password, hashPassword);
  } catch (error) {
    return false;
  }
};

export default verifyHashPassword;
