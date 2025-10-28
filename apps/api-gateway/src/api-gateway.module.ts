import { Module } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { AuthController } from './controllers/auth.controller';
import { UsersController } from './controllers/users.controller';
import { OrdersController } from './controllers/orders.controller';
import { RmqModule } from '@app/rmq';
import { AuthService } from './services/auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UsersService } from './services/users.service';
import { OrdersService } from './services/orders.service';

@Module({
  imports: [
    RmqModule.register({
      name: 'AUTH',
    }),
    RmqModule.register({
      name: 'USERS',
    }),
  ],
  controllers: [
    ApiGatewayController,
    AuthController,
    UsersController,
    OrdersController,
  ],
  providers: [
    ApiGatewayService,
    AuthService,
    UsersService,
    OrdersService,
    JwtAuthGuard,
  ],
})
export class ApiGatewayModule {}
