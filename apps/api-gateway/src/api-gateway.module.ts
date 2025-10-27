import { Module } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { AuthController } from './controllers/auth.controller';
import { UsersController } from './controllers/users.controller';
import { OrdersController } from './controllers/orders.controller';
import { RmqModule } from '@app/rmq';

@Module({
  imports: [
    RmqModule.register({
      name: 'AUTH',
    }),
  ],
  controllers: [
    ApiGatewayController,
    AuthController,
    UsersController,
    OrdersController,
  ],
  providers: [ApiGatewayService],
})
export class ApiGatewayModule {}
