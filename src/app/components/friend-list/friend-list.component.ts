import { Component } from '@angular/core';

interface Friend {
  avatar: string;
  username: string;
  message: string;
  unseenMessage: number;
  time: number;
}

@Component({
  selector: 'app-friend-list',
  standalone: true,
  imports: [],
  templateUrl: './friend-list.component.html',
  styleUrl: './friend-list.component.scss',
})
export class FriendListComponent {
  friendList: Friend[] = [
    {
      avatar:
        'https://i.pinimg.com/564x/90/57/0a/90570addee2645866a597530721f37fd.jpg',
      username: 'gao red',
      message: 'xin chao ban, cho minh lam quen nhe!',
      unseenMessage: 0,
      time: 5,
    },
    {
      avatar:
        'https://i.pinimg.com/564x/90/57/0a/90570addee2645866a597530721f37fd.jpg',
      username: 'gao red',
      message: 'xin chao ban, cho minh lam quen nhe!',
      unseenMessage: 0,
      time: 5,
    },
    {
      avatar:
        'https://i.pinimg.com/564x/90/57/0a/90570addee2645866a597530721f37fd.jpg',
      username: 'gao red',
      message: 'xin chao ban, cho minh lam quen nhe!',
      unseenMessage: 0,
      time: 5,
    },
    {
      avatar:
        'https://i.pinimg.com/564x/90/57/0a/90570addee2645866a597530721f37fd.jpg',
      username: 'gao red',
      message: 'xin chao ban, cho minh lam quen nhe!',
      unseenMessage: 0,
      time: 5,
    },
    {
      avatar:
        'https://i.pinimg.com/564x/90/57/0a/90570addee2645866a597530721f37fd.jpg',
      username: 'gao red',
      message: 'xin chao ban, cho minh lam quen nhe!',
      unseenMessage: 0,
      time: 5,
    },
    {
      avatar:
        'https://i.pinimg.com/564x/90/57/0a/90570addee2645866a597530721f37fd.jpg',
      username: 'gao red',
      message: 'xin chao ban, cho minh lam quen nhe!',
      unseenMessage: 0,
      time: 5,
    },

    {
      avatar:
        'https://i.pinimg.com/564x/90/57/0a/90570addee2645866a597530721f37fd.jpg',
      username: 'gao red',
      message: 'xin chao ban, cho minh lam quen nhe!',
      unseenMessage: 0,
      time: 5,
    },
    {
      avatar:
        'https://i.pinimg.com/564x/90/57/0a/90570addee2645866a597530721f37fd.jpg',
      username: 'gao red',
      message: 'xin chao ban, cho minh lam quen nhe!',
      unseenMessage: 0,
      time: 5,
    },
    {
      avatar:
        'https://i.pinimg.com/564x/90/57/0a/90570addee2645866a597530721f37fd.jpg',
      username: 'gao red',
      message: 'xin chao ban, cho minh lam quen nhe!',
      unseenMessage: 0,
      time: 5,
    },
  ];
}
