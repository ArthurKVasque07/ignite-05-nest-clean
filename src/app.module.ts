import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { envSchema } from "./env";
import { AuthModule } from "./auth/auth.module";
import { CreateAccoutnController } from "./controllers/create-account.controller";
import { PrismaService } from "./prisma/prisma.service";
import { AuthenticateController } from "./controllers/authenticate.controller";
import { JwtService } from "@nestjs/jwt";
import { FetchRecentQuestionsController } from "./controllers/fetch-recent-questions.controller";

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
  ],
  controllers: [
    CreateAccoutnController,
    AuthenticateController,
    FetchRecentQuestionsController,
  ],
  providers: [PrismaService, JwtService],
})
export class AppModule {}
