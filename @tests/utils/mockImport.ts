export default function mockImport(path:string, mocks: Record<string, unknown>) {
    jest.mock(path, () => {
    const originalModule = jest.requireActual(path);

    return {
        __esModule: true,
        ...originalModule,
        ...mocks,
    };
    });
}