import { prisma } from "../database/prisma";

export const categoryRepository = {
    create(data:{name: string}){
        return prisma.category.create({data});
    },

    update(id: string, data: {name: string}){
        return prisma.category.update({where: { id }, data});
    },

    delete(id: string){
        return prisma.category.delete({where: {id}});
    },

    findById(id: string) {
        return prisma.category.findUnique({ where: { id } });
    },

    findByName(name: string) {
        return prisma.category.findUnique({ where: { name } });
    },

    findAll() {
        return prisma.category.findMany({orderBy: { name: 'asc' }});
    }
}   