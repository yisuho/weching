import { userService } from '../services';

import { AsyncRequestHandler } from '../types';
import { user } from '../services/interfaces/interface';

interface guestControllerInterface {
  register: AsyncRequestHandler;
}

export const guestController: guestControllerInterface = {
  async register(req: any, res: any): Promise<any> {
    const newUser: user = {
      email: req.body.email,
      birthday: new Date(req.body.birthday),
      nickName: req.body.nickName,
    };

    const user = await userService.createUser(newUser);
    res.json(user);
  },
};