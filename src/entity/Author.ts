import {
    Entity,
    Column,
  } from "typeorm";
  
import { User } from "./User";
  
  @Entity()
  export class Author extends User {
  
    @Column()
    tags: string;
  
    @Column()
    surname: string;

    @Column()
    completeName: string;

  }
  