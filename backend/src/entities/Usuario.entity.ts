import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Estado } from "./Estado.entity";
import { Empleado } from "./Empleados.entity";
import { Pedido } from "./Pedidos.entity";
import { MetodoPago } from "./MetodoPago.entity";
import { Reporte } from "./Reportes.entity";

@Entity("Usuarios")
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, unique: true })
  email: string;

  @Column({ length: 255 })
  password: string;

  @Column({ length: 255 })
  nombre: string;

  @Column("text", { nullable: true })
  direccion: string;

  @ManyToOne(() => Estado, estado => estado.usuarios)
  estado: Estado;

  @CreateDateColumn({ name: "creado_en" })
  creadoEn: Date;

  @UpdateDateColumn({ name: "actualizado_en" })
  actualizadoEn: Date;

  @OneToMany(() => Empleado, empleado => empleado.usuario)
  empleados: Empleado[];

  @OneToMany(() => Pedido, pedido => pedido.usuario)
  pedidos: Pedido[];

  @OneToMany(() => MetodoPago, metodoPago => metodoPago.usuario)
  metodosPago: MetodoPago[];

  @OneToMany(() => Reporte, reporte => reporte.usuario)
  reportes: Reporte[];
}
