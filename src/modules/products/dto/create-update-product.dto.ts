import { IsNotEmpty, IsOptional } from 'class-validator'
import { Column, Entity } from 'typeorm'

@Entity()
export class CreateUpdateProductDto {
  @IsNotEmpty()
  title: string

  @IsNotEmpty()
  description: string

  @IsOptional()
  price: number

  @IsNotEmpty()
  image?: string
}
