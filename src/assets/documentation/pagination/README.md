## Documentation: Implementing Pagination in Comments Section for Blog

### Overview

This documentation provides a detailed explanation of how the pagination system for comments was implemented in the Blog by ID page of an Angular application. The goal is to allow users to view and interact with comments efficiently, even when the number of comments is large. The implementation includes fetching, displaying, and navigating through paginated comments using Angular services and RxJS operators.

### Key Components and Services

1. **BlogByIdComponent**: This is the Angular component responsible for displaying a blog post along with its associated comments. It handles fetching the blog details and comments, displaying them, and providing pagination controls.
2. **CommentsService**: This service is responsible for interacting with the backend to fetch comments. It provides the `getCommentsOfBlogPublic` method, which is used to retrieve a paginated list of comments based on the `blogId`, `limit`, and `offset`.
3. **HTML Template**: The HTML template for `BlogByIdComponent` is responsible for displaying the blog details, the comments list, and the pagination controls.

### Service: `getCommentsOfBlogPublic`

This method in `CommentsService` is designed to fetch a paginated list of comments for a given blog post. It takes three parameters:

- **blogId**: The ID of the blog post.
- **limit**: The number of comments to retrieve per request. Defaults to `PAGINATION.commentLimit`.
- **offset**: The starting index for the comments to retrieve. Defaults to `0`.

```typescript
getCommentsOfBlogPublic(blogId: string, limit: number = PAGINATION.commentLImit, offset: number = 0): Observable < {total_count: number, comments: Comment[]} > {
  return this._http.get<{ total_count: number, comments: Comment[] }>(`${environment.commentUrl.public}/${blogId}`, {
    params: {
      limit: limit.toString(),
      offset: offset.toString(),
    },
  })
}
```

The method returns an observable that emits an object containing:

- `total_count`: The total number of comments available for the blog post.
- `comments`: The array of comments retrieved for the current page.

### Component: `BlogByIdComponent`

The `BlogByIdComponent` is the core of this implementation. It handles the following tasks:

1. **Initialization:**
  - On initialization (`ngOnInit`), the component retrieves the `blogId` from the route parameters.
  - It initializes the comment form and fetches both the blog details and the first page of comments using the `getBlogById` and `getCommentOfBlog` methods, respectively.

2. **Fetching Blog Details:**
  - The `getBlogById` method retrieves the blog details using `BlogService`. If an error occurs, it is handled gracefully, and the error message is displayed.

3. **Fetching Comments with Pagination:**
  - The `getCommentOfBlog` method fetches the comments for the given blog post using `CommentsService`. It updates the component’s properties (`commentId`$, `commentLength`, and `totalComments`) based on the response.

4. **Adding a Comment:**
  - The `addComment` method submits a new comment using `CommentsService`. After successfully adding a comment, the comments list is refreshed to reflect the new comment.

5. **Pagination Controls:**
  - The `loadNextComments` and `loadPreviousComments` methods are used to navigate through the comments. These methods update the `currentOffset` and call `getCommentOfBlog` to fetch the next or previous set of comments.

```typescript
loadNextComments() {
  if (this.currentOffset + this.limit < this.totalComments) {
    this.currentOffset += this.limit
    this.getCommentOfBlog(this._activatedRouter.snapshot.paramMap.get('id') || '')
  }
}

loadPreviousComments() {
  if (this.currentOffset > 0) {
    this.currentOffset = Math.max(0, this.currentOffset - this.limit)
    this.getCommentOfBlog(this._activatedRouter.snapshot.paramMap.get('id') || '')
  }
}
```

### HTML Template

The HTML template is structured to display the blog details and comments asynchronously, using Angular’s async pipe. Key features include:

- **Blog Details**: Displayed with title, date, author, category, and content.
- **Comment Form**: Allows users to add new comments.
- **Comments List**: Displays the list of comments. Conditional styling is applied to differentiate between odd and even comments.
- **Pagination Controls**: Buttons to load the next or previous set of comments, dynamically enabled or disabled based on the current state.

#### Why This Approach?

- **Efficiency**: Paginating comments reduces the amount of data loaded at once, improving performance and user experience.
- **Scalability**: The implementation can handle a large number of comments without overwhelming the client or server.
- **User Experience**: Users can easily navigate through comments, and the interface dynamically updates to reflect the current state.

### Conclusion

This implementation provides a robust solution for handling comments on a blog post, with a focus on performance and user experience. The use of Angular services, observables, and RxJS operators ensures a smooth and reactive experience for users interacting with the comments section.
