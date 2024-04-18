import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Subject, takeUntil } from 'rxjs';
import { IBlog } from '../../_shared/models/blog.model';
import { BlogService } from '../../_shared/services/blog/blog.service';
import { BlogPreviewCardComponent } from '../../components/blog-preview-card/blog-preview-card.component';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, ButtonModule, CardModule, BlogPreviewCardComponent],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
  providers: [BlogService],
})
export class BlogComponent implements OnInit, OnDestroy {
  blogs: IBlog[] = [];
  readonly unsubscribe$ = new Subject<void>();

  constructor(
    private blogService: BlogService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.blogService
      .getAllBlogs()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (blogs) => (this.blogs = blogs),
        error: (_err) => this.showErrorGettingBlogsMessage(),
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private showErrorGettingBlogsMessage = () => {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'There was an error getting the blogs',
    });
  };
}
