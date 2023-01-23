import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Permission } from 'entities/permission.entity'
import { Product } from 'entities/product.entity'
import { ProductsController } from './products.controller'
import { ProductsService } from './products.service'

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
