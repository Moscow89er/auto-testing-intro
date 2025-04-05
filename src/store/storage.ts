export const createStorage = () => {
    let kvStorage: Record<string, string> | null = null;

    return {
        // инициализация хранилища
        init: (): void => {
            kvStorage = {};
        },
        // очищение хранилища
        clear: (): void => {
            kvStorage = null;
        },
        // добавление элемента
        add: (key: string, value: string): void => {
            if (kvStorage !== null) {
                kvStorage[key] = value;
            }
        },
        // удаление элемента
        remove: (key: string): void => {
            if (kvStorage !== null) {
                delete kvStorage[key];
            }
        },
        // получаем количество элементов в хранилище
        getStorageLength: (): number | null => {
            return kvStorage !== null ? Object.keys(kvStorage).length : null;
        }
    };
};
