import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Usuario } from './Usuario.entity';

@Entity('Metodos_Pago')
export class MetodoPago {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Usuario, usuario => usuario.metodosPago, { onDelete: 'CASCADE' })
  usuario: Usuario;

  @Column()
  metodo: string;

  @Column({ type: 'text', nullable: true })
  detalles: string;

  @CreateDateColumn({ name: 'creado_en' })
  creadoEn: Date;
}
