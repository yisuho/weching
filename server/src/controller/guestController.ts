import { guestService } from './../services/guestService';

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

    const user = await guestService.createUser(newUser);
    res.json(user);
  },
};
