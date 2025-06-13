import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { Usuario } from "./Usuario.entity";
import { Rol } from "./Rol.entity";

@Entity("Empleados")
export class Empleado {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Usuario, usuario => usuario.empleados)
  usuario: Usuario;

  @ManyToOne(() => Rol, rol => rol.empleados)
  rol: Rol;

  @CreateDateColumn({ name: "fecha_ingreso" })
  fechaIngreso: Date;

  @Column("decimal", { precision: 10, scale: 2, nullable: true })
  salario: number;
}
