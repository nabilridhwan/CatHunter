import {Module} from '@nestjs/common';

import {RouterModule} from "@nestjs/core";
import {UserModule} from "../user/user.module";
import {PostModule} from "../post/post.module";
import {CommentModule} from "../comment/comment.module";

@Module({
  imports: [
    UserModule,
    PostModule,
    CommentModule,
    RouterModule.register([
      {
        path: "user",
        module: UserModule
      },
      {
        path: "post",
        module: PostModule,
        children: [
          {
            path: "comment",
            module: CommentModule
          }
        ]
      }
    ])
  ],
})

export class AppModule {
}
