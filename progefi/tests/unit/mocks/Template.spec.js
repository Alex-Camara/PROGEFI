import Template from "@/presentation/models/template.js";

const testTemplate1 = new Template();
testTemplate1.setTemplate({
  id: 1,
  name: "Plantilla básica oscura",
  height: 800,
  width: 1250,
  backgroundColor: "#000000",
  fontColor: "#FFFFFF",
  samplePath: "template_samples/sample1.png"
});

const testTemplate2 = new Template();
testTemplate2.setTemplate({
  id: 2,
  name: "Plantilla básica clara",
  height: 800,
  width: 1250,
  backgroundColor: "#FFFFFF",
  fontColor: "#000000",
  samplePath: "template_samples/sample2.png"
});

const mockGetAll = jest.fn();
mockGetAll.mockReturnValue([testTemplate1, testTemplate2]);
Template.getAll = mockGetAll;

export { testTemplate1, testTemplate2, Template };
