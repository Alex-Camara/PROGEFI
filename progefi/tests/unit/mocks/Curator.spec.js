import Curator from "@/presentation/models/curator.js";

const testCurator1 = new Curator();
testCurator1.setCurator({
    id: 1,
    name: "Luis Gómez Cordero"
});
    const testCurator2 = new Curator();
testCurator2.setCurator({
    id: 2,
    name: "María Salas Pérez"
});

const mockGetAll = jest.fn();
mockGetAll.mockReturnValue([testCurator1, testCurator2]);
Curator.getAll = mockGetAll;

export { testCurator1, testCurator2, Curator };
