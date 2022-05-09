export interface IController<T> {
    readAll(): Promise<any>;

    read(id: string): Promise<any>;

    create(type: T): Promise<any>;

    update(type: T): Promise<any>;

    delete(id: string): Promise<any>;
}