// src/entities/Estado.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Usuario } from "./Usuario.entity";
import { Producto } from "./Producto.entity";

@Entity("Estados")
export class Estado {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ type: "text", nullable: true })
  descripcion: string;

  @OneToMany(() => Usuario, (usuario) => usuario.estado)
  usuarios: Usuario[];
  
   @OneToMany(() => Producto, producto => producto.estado)
  productos: Producto[];
}
