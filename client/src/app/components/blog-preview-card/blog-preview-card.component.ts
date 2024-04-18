import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { IBlog } from '../../_shared/models/blog.model';

@Component({
  selector: 'app-blog-preview-card',
  standalone: true,
  imports: [ButtonModule, CardModule],
  templateUrl: './blog-preview-card.component.html',
  styleUrl: './blog-preview-card.component.scss',
})
export class BlogPreviewCardComponent {
  @Input() blog!: IBlog;

  onReadMoreClick = (blogId: number) => {
    console.log('blogId', blogId);
    throw new Error('Method not implemented.');
  };
}
