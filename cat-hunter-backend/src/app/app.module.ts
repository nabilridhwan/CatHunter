import {Module} from '@nestjs/common';

import {RouterModule} from "@nestjs/core";
import {UserModule} from "../user/user.module";
import {PostModule} from "../post/post.module";

@Module({
  imports: [
    UserModule,
    PostModule,
    RouterModule.register([
      {
        path: "user",
        module: UserModule
      },
      {
        path: "post",
        module: PostModule
      }
    ])
  ],
})

export class AppModule {
}
