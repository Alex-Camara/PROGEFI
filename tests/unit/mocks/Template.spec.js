import Template from "@/presentation/models/template.js";

let tags = [
  {
    tagName: "altitude",
    tagBefore: null,
    tagAfter: "msnm",
    model: "collect",
    modelAttribute: "altitude",
    style: '{ "background-color": "rgb(30, 136, 229,0.8)", "font-size": "20px" }',
    templateId: 1
  },
  {
    tagName: "instituteLogo",
    tagBefore: null,
    tagAfter: null,
    model: null,
    modelAttribute: null,
    style: '{ "background-color": "rgb(255, 183, 77,0.8)" , "font-size": "20px" }',
    templateId: 1
  },
  {
    tagName: "photocollect",
    tagBefore: null,
    tagAfter: null,
    model: null,
    modelAttribute: null,
    style: '{ "background-color": "rgb(255, 183, 77,0.8)", "font-size": "20px" }',
    templateId: 1
  }
];

const testTemplate1 = new Template();
testTemplate1.setTemplate({
  id: 1,
  name: "Plantilla básica oscura",
  height: 800,
  width: 1250,
  backgroundColor: "#000000",
  fontColor: "#FFFFFF",
  samplePath: "template_samples/sample1.png",
  tags
});


const testTemplate2 = new Template();
testTemplate2.setTemplate({
  id: 2,
  name: "Plantilla básica clara",
  height: 800,
  width: 1250,
  backgroundColor: "#FFFFFF",
  fontColor: "#000000",
  samplePath: "template_samples/sample2.png",
  tags
});

const mockGetAll = jest.fn();
mockGetAll.mockReturnValue([testTemplate1, testTemplate2]);
Template.getAll = mockGetAll;

const mockSetFontSize = jest.fn();
mockSetFontSize.mockReturnValue(Promise.resolve());
Template.setFontSize = mockSetFontSize;

const mockSetTagColors = jest.fn();
mockSetTagColors.mockReturnValue(Promise.resolve());
Template.setTagColors = mockSetTagColors;

export { testTemplate1, testTemplate2, Template };
