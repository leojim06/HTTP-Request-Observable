import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { CommentBoxComponent } from './comment-box.component';
import { Comment } from '../model/comment';
import { CommentService } from '../services/comment.service';
import { EmitterService } from '../../emitter.service';

@Component({
    selector: 'comment-list',
    template: `
        <comment-box [editId]="editId" [listId]="listId"
            *ngFor="let comment of comments" [comment]="comment">
        </comment-box>
    `,
    directives: [CommentBoxComponent],
    providers: [CommentService]
})

export class CommentListComponent implements OnInit, OnChanges {

    // Local properties
    comments: Comment[];

    // Input properties
    @Input() editId: string;
    @Input() listID: string;

    // Constructor with injected service
    constructor( private commentService: CommentService ) { }

    ngOnInit() {
        // Load comments
        this.loadComments();
    }

    loadComments() {
        // Get all comments
        this.commentService.getComments().subscribe(comments =>
            this.comments = comments, // Bind to view
            err => {
                // Log errors if any
                console.log(err);
            });
    }

    ngOnChanges(changes: any) {
        // Listen to the 'list emitted event so as populate the model
        // with the event payload
        EmitterService.get(this.listID).subscribe((comments: Comment[]) => {
            this.loadComments()
        });
    }
}