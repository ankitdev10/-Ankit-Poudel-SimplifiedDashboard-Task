import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { JwtService } from "@nestjs/jwt";
import { Context } from "vm";
import { ConfigService } from "@nestjs/config";
import { IS_PUBLIC_KEY } from "./decorators/public.decorator";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private configService: ConfigService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    // do not have authorization if in dev mode for easiertesting

    if (this.configService.get<string>("APP_ENV") === "dev") return true;

    const ctx = GqlExecutionContext.create(context).getContext();
    const token = this.extractTokenFromHeader(ctx);
    if (!token) throw new UnauthorizedException();
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>("JWT_SECRET") ?? "test",
      });

      if (!payload) throw new UnauthorizedException();
    } catch (err) {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(ctx: Context): string | undefined {
    const token = ctx.req.get("Authorization")?.split(" ");
    if (!token) return undefined;
    return token[1] ?? undefined;
  }
}
