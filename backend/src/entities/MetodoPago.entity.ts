import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Pedido } from './Pedidos.entity';

@Entity('Metodos_Pago')
export class MetodoPago {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, unique: true })
  nombre: string; // Ej: "Tarjeta", "PayPal", "Transferencia"

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  comision: number | null; // porcentaje comisión si aplica

  @Column({ type: 'text', nullable: true })
  descripcion: string | null;

  @CreateDateColumn({ name: 'creado_en' })
  creadoEn: Date;

  @UpdateDateColumn({ name: 'actualizado_en' })
  actualizadoEn: Date;

  @OneToMany(() => Pedido, pedido => pedido.metodoPago)
  pedidos: Pedido[];
}
