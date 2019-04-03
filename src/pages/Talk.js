import React, { Component } from 'react';

class Talk extends Component {
  render() {
    return (
      <div className="chat-page">
        <input type="text"/>
      </div>
    );
  }
}

export default Talk;

// <div id="comments">
//       {{#if isAlreadyIn}}
//       <h3>Chat</h3><hr>
//       {{#each event.comments}}
//         <form class="center" action="/events/{{../event._id}}/delete-comment" method="POST">
//           <div class="paragraph">
//             <div class="flex-row titular">
//               <img id="chat-image" src="{{this.creator.imageUrl}}" alt="{{this.creator.imageUrl}} image">
//               <p>{{this.creator.username}} :</p>
//             </div>
//             <p>{{this.comment}}</p>
//             <input type="hidden" name="commentId" value="{{this._id}}">
//           </div>
//           {{#ifCond ../currentUser._id "==" this.creator._id}}
//             <button id="default-img" class="ancor-button"><i class="far fa-trash-alt"></i></button>
//           {{/ifCond}}
//         </form>
//       {{/each}}
//       <form class="comment" action="/events/{{event._id}}/comment" method="POST">
//         <textarea name="comment" placeholder="Write your text here..." tabindex="5" required></textarea>
//         <button class="join">COMMENT</button>
//       </form>
//       {{/if}}
//     </div>