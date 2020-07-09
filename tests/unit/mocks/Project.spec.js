import Project from "@/presentation/models/project.js";

const testProject1 = new Project();
testProject1.setProject({
    id: 1,
    name: "Proyecto de aves en Belice"
});

const mockGetAll = jest.fn();
mockGetAll.mockReturnValue([testProject1]);
Project.getAll = mockGetAll;

export { testProject1, Project };
