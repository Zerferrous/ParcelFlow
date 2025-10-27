import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { UserEntity } from 'apps/users/src/entities/user.entity';
import { DatabaseType } from 'typeorm';

export const DATABASE_CONFIG: Record<
  string,
  { type: DatabaseType; env: string; entities: EntityClassOrSchema[] }
> = {
  postgres_db: {
    type: 'postgres',
    env: '',
    entities: [UserEntity],
  },
};
