import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Empleado } from './Empleados.entity';

@Entity('Roles')
export class Rol {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @OneToMany(() => Empleado, empleado => empleado.rol)
  empleados: Empleado[];
}
