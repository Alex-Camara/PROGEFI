import Device from "@/presentation/models/device.js";
const testDevice1 = new Device();
const testDevice2 = new Device();

async function loadDeviceValues() {
  await testDevice1.setDevice({
    id: 1,
    name: "Motorola"
  });

  await testDevice2.setDevice({
    id: 2,
    name: "Apple"
  });
}

const mockGetAll = jest.fn();
mockGetAll.mockReturnValue([testDevice1, testDevice2]);
Device.getAll = mockGetAll;

const mockGetExisting = jest.fn();
mockGetExisting.mockReturnValue(false);
Device.getExisting = mockGetExisting;

export { loadDeviceValues, Device, testDevice2, testDevice1 };
