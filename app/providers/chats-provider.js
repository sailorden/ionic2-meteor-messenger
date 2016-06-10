import {Injectable} from '@angular/core';
import {Provider} from './provider';
import {UsersProvider} from './users-provider';

@Injectable()
export class ChatsProvider extends Provider {
  static parameters = [[UsersProvider]]

  constructor(users) {
    super();
    this.users = users;
  }

  add(recipientId) {
    const chat = this.currentUser.addChat(recipientId);
    return this.get(chat._id);
  }

  get(chatId) {
    const chat = super.get(chatId);
    const recipientId = chat.memberIds.find(memberId => memberId != this.currentUser._id);
    const recipient = this.users.get(recipientId);

    chat.addressee = this.currentUser;
    chat.recipient = recipient;
    chat.title = recipient.name;
    chat.picture = recipient.picture;

    return chat;
  }

  get currentUser() {
    return this.users.current;
  }

  get collection() {
    return this.currentUser.chats;
  }
}
