'use server';
import { instance } from "../instance";

export const signUp = async ({email, name, password, birthday, licenseId, gender, roleName}) => {
    return await instance(`sign-up?role=${roleName}`, {
      body: JSON.stringify({ name, username: email, password, birthday, licenseId, gender }),
      method: 'POST',
      credentials: 'include',
    });
};