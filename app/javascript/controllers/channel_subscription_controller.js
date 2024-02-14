import { Controller } from "@hotwired/stimulus"
import { createConsumer } from "@rails/actioncable"


// Connects to data-controller="channel-subscription"
export default class extends Controller {
  static targets = ["messages"];
  static values = {
    chatroomId: Number
  }
  connect() {
    const consumer = createConsumer();
    console.log(`Connecting with action cable with the id ${this.chatroomIdValue}`);
    consumer.subscriptions.create(
      { channel: "ChatroomChannel", id: this.chatroomIdValue },
      { received: data =>  {
        this.messagesTarget.insertAdjacentHTML("beforeend",data)
      }
    }
      );
  }
}
