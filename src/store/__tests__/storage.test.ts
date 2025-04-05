import { createStorage } from "../storage";

describe('[Storage] Тесты хранилища ключ-значение', () => {
    let storage: ReturnType<typeof createStorage>;

    storage = createStorage();

    beforeEach(() => {
        storage.init();
    });

    afterEach(() => {
        storage.clear();
    });

    test('добавление элемента', () => {
        storage.add('0', 'Kevin');
        const storageLength = storage.getStorageLength();
        expect(storageLength).toBe(1);
    });

    test('удаление элемента', () => {
        storage.add('1', 'Jim');
        storage.add('2', 'Pam');

        storage.remove('2');

        const storageLength = storage.getStorageLength();
        expect(storageLength).toBe(1);
    });
});
