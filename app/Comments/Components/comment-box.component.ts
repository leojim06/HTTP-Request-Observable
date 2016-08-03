import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Comment } from '../model/comment';
import { EmitterService } from '../../emitter.service';
import { CommentService } from '../services/comment.service';

@Component({
    selector: 'comment-box',
    templateUrl: 'app/Comments/Views/comment-box.component.html'
    // No providers here becaus they are passed down from parent component
})

export class CommentBoxComponent {
    // Constructor
    constructor( private commentService: CommentService ) { }

    // Define input properties
    @Input() comment: Comment;
    @Input() listId: string;
    @Input() editId: string;

    editComment() {
        // Emmit edit event
        EmitterService.get(this.editId).emit(this.comment);
    }

    deleteComment(id: string) {
        // Call removeComment() from CommentService to delete comment
        this.commentService.removeComment(id).subscribe(comments => {
            // Emit list event
            EmitterService.get(this.listId).emit(comments);
        }, err => {
            // Log error if any
            console.log(err);            
        });
    }
}